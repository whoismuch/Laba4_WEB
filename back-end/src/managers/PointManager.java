package managers;

import database.DataBaseService;
import entities.Point;
import handlers.RequestHandler;
import handlers.Validator;

import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.Null;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Singleton
@Path("/points/{username}")
public class PointManager {

    @EJB
    DataBaseService dataBaseService;


    @POST
    @Consumes("multipart/form-data")
    public Response addPoint (@PathParam("username") String username, Map<String, Double> params, @Context HttpServletRequest request, @Context HttpServletResponse response) {
        Response.Status status = Response.Status.OK;
        List<Point> message = new ArrayList<>( );
        try {

            double x = params.get("x");
            double y = params.get("y");
            double dr = params.get("r");

            String[] userValues = RequestHandler.authHeaderHandler(request.getHeader("Authorization"));

            if (!Validator.validatePoint(x, y, dr)) throw new NumberFormatException( );
            Point point = new Point(x, y, (int) dr, userValues[0]);
            point.setResult(Validator.isThePointIn(x, y, (int) dr));

            List<Point> pointList = dataBaseService.getPoints(userValues[0]);
            dataBaseService.savePoint(point);
            pointList.add(point);
            message = pointList;

        } catch (NumberFormatException ex) {
            status = Response.Status.BAD_REQUEST;
        } catch (NullPointerException ex) {
            status = Response.Status.BAD_REQUEST;
        } catch (Exception ex) {
            status = Response.Status.INTERNAL_SERVER_ERROR;
        }

        return Response
                .status(status)
                .entity(message)
                .build( );
    }


    @GET
    public Response getPoints (@PathParam("username") String username, @Context HttpServletRequest request, @Context HttpServletResponse response) {


        String[] userValues = RequestHandler.authHeaderHandler(request.getHeader("Authorization"));

        List<Point> message = dataBaseService.getPoints(userValues[0]);

        return Response
                .status(Response.Status.OK)
                .entity(message)
                .build( );
    }

}
