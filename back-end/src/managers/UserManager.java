package managers;

import database.DataBaseService;
import entities.User;
import handlers.RequestHandler;
import handlers.Validator;

import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.Map;

@Singleton
@Path("/users")
public class UserManager {

    @EJB
    DataBaseService dataBaseService;

    @POST
    @Path("/registration/{username}")
    @Consumes("multipart/form-data")
    public Response addUser (@PathParam("username") String username, Map<String, String> params, @Context HttpServletRequest request, @Context HttpServletResponse response) throws Exception {
        Response.Status status = Response.Status.OK;
        boolean message = true;
        try {
            String login = params.get("login");
            String password = params.get("password");
            if (!login.equals(username) || !Validator.validateUser(login, password))
                status = Response.Status.UNAUTHORIZED;
            else {
                User user = new User(login, password);
                if (!dataBaseService.doesUserExist(login)) {
                    dataBaseService.saveUser(user);
                    message = true;
                } else message = false;
            }
        } catch (NullPointerException ex) {
            status = Response.Status.BAD_REQUEST;
        }

        return Response
                .status(status)
                .entity(message)
                .build( );
    }

    @POST
    @Path("/login/{username}")
    public Response checkUser (@PathParam("username") String username, @Context HttpServletRequest request, @Context HttpServletResponse response) throws IOException {

        return Response
                .status(Response.Status.OK)
                .entity(true)
                .build( );
    }
}
