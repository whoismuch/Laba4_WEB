import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class RequestHandler {

    public static String[] authHeaderHandler (String header) {

        if (header != null && header.toLowerCase( ).startsWith("basic")) {
            // Authorization: Basic base64credentials
            String base64Credentials = header.substring("Basic".length( )).trim( );
            byte[] credDecoded = Base64.getDecoder( ).decode(base64Credentials);
            String credentials = new String(credDecoded, StandardCharsets.UTF_8);
            // credentials = username:password
            return credentials.split(":", 2);
        }

        return null;
    }
}
