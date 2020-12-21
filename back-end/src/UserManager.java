import javax.ejb.EJB;
import javax.ejb.Local;
import javax.ejb.Remote;
import javax.ejb.Singleton;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.xml.crypto.Data;
import java.io.IOException;
import java.util.ArrayList;

@Singleton
@Path("/user")
public class UserManager {

    @EJB
    DataBaseService dataBaseService;

    @POST
    @Path("/signUp")
    public void addUser(@FormParam("login") String login, @FormParam("password") String password, @Context HttpServletRequest request, @Context HttpServletResponse response) throws Exception {
        System.out.println(login + " " + password);
        User user = new User(login, password);
        dataBaseService.saveUser(user);
        request.getSession().setAttribute("login", login);
        request.getSession().setAttribute("points", new ArrayList<Point>());
        // How to send message back to client? msg: user: <login> успешно зарегистрирован
        response.sendRedirect("http://localhost:3030/#/main");
    }

    @POST
    @Path("/signin")
    public void checkUser(@FormParam("login") String login, @FormParam("password") String password, @Context HttpServletRequest request, @Context HttpServletResponse response) throws IOException {
        if (dataBaseService.doesUserExist(login, password)) {
            request.getSession().setAttribute("login", login);
            request.getSession().setAttribute("points", new ArrayList<Point>());
            // How to send message back to client? user: <login> успешно авторизован
            response.sendRedirect("http://localhost:3030/#/main");
        }
        // How to send message back to client? user: <login> вход не выполнен
    }
}
