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
    public void checkPoint (Map<String, Double> params, @Context HttpServletRequest request, @Context HttpServletResponse response) throws IOException, ServletException {

        Double x = params.get("x");
        Double y = params.get("y");
        Double dr = params.get("r");


        try {
            Integer r = Integer.parseInt(dr.toString( ));
            if (x < -4 || x > 4 || y < -3 || y > 5 || r < 1 || r > 4) throw new NumberFormatException();
            Point point = new Point(x, y, r);
            if (x >= 0 && x <= r && y >= -1 * r && y <= 0 || x <= 0 && y >= 0 && x * x + y * y <= r * r / 4 || y <= 0 && x <= 0 && y >= -0.5 * x - r / 2)
                point.setResult(true);
            else point.setResult(false);
            ArrayList<Point> pointList = (ArrayList<Point>) request.getSession( ).getAttribute("points");
            pointList.add(point);
            dataBaseService.savePoint(point);
            response.sendRedirect("http://localhost:3030/#/main");
        } catch (NumberFormatException ex) {
            // Сказать клиенту, что он нас обманул.
        } catch (Exception e) {
            e.printStackTrace( );
        }
    }


    @POST
    @Path("/getPoints")
    public ArrayList<Point> getPoints (@Context HttpServletRequest request, @Context HttpServletResponse response) {
        return (ArrayList<Point>) request.getSession( ).getAttribute("points");
    }

}
