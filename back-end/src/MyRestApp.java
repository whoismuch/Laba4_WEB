import database.DataBaseService;
import managers.PointManager;
import managers.UserManager;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/api")
public class MyRestApp extends Application {

    @Override
    public Set<Class<?>> getClasses ( ) {
        return new HashSet<Class<?>>(Arrays.asList(PointManager.class, UserManager.class, DataBaseService.class));
    }
}