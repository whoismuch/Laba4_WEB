package managers;

import database.DataBaseService;
import entities.Point;
import handlers.RequestHandler;

import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.io.IOException;
import java.util.List;
import java.util.Map;


@Singleton
@Path("/point-manager")
public class PointManager {

    @EJB
    DataBaseService dataBaseService;


    @POST
    @Path("/new-point")
    @Consumes("multipart/form-data")
    public List<Point> addPoint (Map<String, Double> params, @Context HttpServletRequest request, @Context HttpServletResponse response) throws IOException, ServletException {
        try {

            double x = params.get("x");
            double y = params.get("y");
            double dr = params.get("r");

            String[] userValues =  RequestHandler.authHeaderHandler(request.getHeader("Authorization"));
            if (userValues != null && dataBaseService.doesCurUserExist(userValues[0], userValues[1])) {
                int r = (int) dr;
                if (x < -6 || x > 6 || y < -6 || y > 6 || r < 1 || r > 4) throw new NumberFormatException( );
                Point point = new Point(x, y, r, userValues[0]);
                if (x >= 0 && x <= r && y >= -1 * r && y <= 0 || x <= 0 && y >= 0 && x * x + y * y <= r * r / 4d || y <= 0 && x <= 0 && y >= -0.5 * x - (r / 2d))
                    point.setResult(true);
                else point.setResult(false);
                List<Point> pointList = dataBaseService.getPoints(userValues[0]);
                dataBaseService.savePoint(point);
                pointList.add(point);
                return pointList;
            }
        } catch (NumberFormatException ex) {
            return null;
        } catch (Exception e) {
            e.printStackTrace( );
        }
        return null;
    }


    @GET
    @Path("/points-list/{username}")
    public List<Point> getPoints (@PathParam("username") String username, @Context HttpServletRequest request, @Context HttpServletResponse response) {

        String[] userValues =  RequestHandler.authHeaderHandler(request.getHeader("Authorization"));
        if (userValues != null
                && username.equals(userValues[0])
                && dataBaseService.doesCurUserExist(userValues[0], userValues[1]))
            return dataBaseService.getPoints(userValues[0]);


        return null;
    }

}
