import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.JSONObject;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.Stateful;
import javax.json.JsonArray;
import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.ws.rs.core.Response;


@Singleton
@Path("/point")
public class PointManager {

    @EJB
    DataBaseService dataBaseService;


    @POST
    @Path("/check")
    @Consumes("multipart/form-data")
    public List<Point> checkPoint (Map<String, Double> params, @Context HttpServletRequest request, @Context HttpServletResponse response, @Context HttpHeaders headers) throws IOException, ServletException {
        try {

            double x = params.get("x");
            double y = params.get("y");
            double dr = params.get("r");

            String login = request.getHeader("Authorization");

            int r = (int) dr;
            if (x < -6 || x > 6 || y < -6 || y > 6 || r < 1 || r > 4) throw new NumberFormatException( );
            Point point = new Point(x, y, r, login);
            if (x >= 0 && x <= r && y >= -1 * r && y <= 0 || x <= 0 && y >= 0 && x * x + y * y <= r * r / 4d || y <= 0 && x <= 0 && y >= -0.5 * x - (r / 2d))
                point.setResult(true);
            else point.setResult(false);
            dataBaseService.savePoint(point);
            List<Point> pointList = dataBaseService.getPoints(login);
            pointList.add(point);
            return pointList;
        } catch (NumberFormatException ex) {
            return null;
        } catch (Exception e) {
            e.printStackTrace( );
        }
        return null;
    }


    @POST
    @Path("/getPoints")
    public List<Point> getPoints (@Context HttpServletRequest request, @Context HttpServletResponse response) {
        String login = request.getHeader("Authorization");

        return dataBaseService.getPoints(login);
    }

}
