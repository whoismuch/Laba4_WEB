package filters;

import database.DataBaseService;
import handlers.RequestHandler;
import handlers.Validator;
import sun.security.provider.certpath.OCSPResponse;

import javax.ejb.EJB;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.Response;
import java.io.IOException;

public class AuthenticationFilter implements Filter {


    @EJB
    DataBaseService dataBaseService;


    @Override
    public void init (FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter (ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {


        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        try {
            String[] userValues = RequestHandler.authHeaderHandler(request.getHeader("Authorization"));

            String pathInfo = request.getPathInfo( );
            String[] parts = pathInfo.split("/");
            String username = parts[parts.length - 1];

            if (userValues == null
                    || !Validator.validateUser(userValues[0], userValues[1])
                    || !dataBaseService.doesCurUserExist(userValues[0], userValues[1]) || !username.equals(userValues[0])) {

                response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            } else filterChain.doFilter(servletRequest, servletResponse);

        } catch (NullPointerException ex) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    @Override
    public void destroy ( ) {

    }
}
