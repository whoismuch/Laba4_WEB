import javax.ejb.CreateException;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.Response;
import java.io.IOException;

public class MyServlet extends HttpServlet {

    public void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("kek");

    }

    public void please() throws NamingException, CreateException {
        InitialContext ic = new InitialContext();
        HelloLocalHome hlh = (HelloLocalHome)ic.lookup
                ("java:comp/env/ejb/UserManager");

        // Step 5: Create the EJB local interface object.
        HelloLocal hl = (HelloLocal)hlh.create();
        hl.addUser("whoismuch", "i'll try");
    }
}
