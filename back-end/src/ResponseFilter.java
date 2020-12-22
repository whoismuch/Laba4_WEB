import java.io.IOException;
import java.util.logging.Logger;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;

public class ResponseFilter implements Filter {

    private final static Logger log = Logger.getLogger(ResponseFilter.class.getName( ));

    @Override
    public void init (FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter (ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (response instanceof HttpServletResponse) {
            log.info("Adding headers");
            HttpServletResponse http = (HttpServletResponse) response;
            http.addHeader("Access-Control-Allow-Origin", "*");
            http.addHeader("Access-Control-Allow-Credentials", "true");
            http.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
            http.addHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

        }
        chain.doFilter(request, response);
    }

    @Override
    public void destroy ( ) {

    }
}