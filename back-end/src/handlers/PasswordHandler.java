package handlers;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class PasswordHandler {

    public static String getHashedPassword (String password) throws NoSuchAlgorithmException {

        MessageDigest sha = MessageDigest.getInstance("SHA-384");

        byte[] messageDigest = sha.digest(password.getBytes( ));
        BigInteger no = new BigInteger(1, messageDigest);

        return no.toString(16);

    }
}
