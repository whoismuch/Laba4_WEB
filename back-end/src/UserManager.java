import javax.ejb.EJB;
import javax.ejb.Local;
import javax.ejb.Remote;
import javax.ejb.Singleton;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.xml.crypto.Data;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

@Singleton
@Path("/user")
public class UserManager {

    @EJB
    DataBaseService dataBaseService;

    @POST
    @Path("/signUp")
    @Consumes("multipart/form-data")
    public boolean addUser(Map<String, String> params, @Context HttpServletRequest request, @Context HttpServletResponse response) throws Exception {
        String login = params.get("login");
        String password = params.get("password");
        User user = new User(login, password);
        if (!dataBaseService.doesUserExist(login)) {
            dataBaseService.saveUser(user);
//            request.getSession().setAttribute("points", new ArrayList<Point>());
            return true;
        }
        else return false;

        // How to send message back to client? msg: user: <login> успешно зарегистрирован
    }

    @POST
    @Path("/signIn")
    public boolean checkUser(Map<String, String> params, @Context HttpServletRequest request, @Context HttpServletResponse response) throws IOException {
        String login = params.get("login");
        String password = params.get("password");
        if (dataBaseService.doesCurUserExist(login, password)) {
//            request.getSession().setAttribute("login", login);
//            request.getSession().setAttribute("points", new ArrayList<Point>());
            return true;
        }
        return false;
    }
}
