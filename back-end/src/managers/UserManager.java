package managers;

import database.DataBaseService;
import entities.User;
import handlers.RequestHandler;

import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import java.io.IOException;
import java.util.Map;

@Singleton
@Path("/user-manager")
public class UserManager {

    @EJB
    DataBaseService dataBaseService;

    @POST
    @Path("/sign-up/{username}")
    @Consumes("multipart/form-data")
    public boolean addUser (@PathParam("username") String username, Map<String, String> params, @Context HttpServletRequest request, @Context HttpServletResponse response) throws Exception {
        String login = params.get("login");
        String password = params.get("password");
        if (login.equals(username)) {
            User user = new User(login, password);
            if (!dataBaseService.doesUserExist(login)) {
                dataBaseService.saveUser(user);
                return true;
            }
        }
        return false;

    }

    @POST
    @Path("/sign-in/{username}")
    public boolean checkUser (@PathParam("username") String username, @Context HttpServletRequest request, @Context HttpServletResponse response) throws IOException {
        String[] userValues = RequestHandler.authHeaderHandler(request.getHeader("Authorization"));
        if (userValues != null && username.equals(userValues[0])) return dataBaseService.doesCurUserExist(userValues[0], userValues[1]);

        return false;
    }
}
