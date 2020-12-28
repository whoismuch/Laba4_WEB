package handlers;

import entities.Point;

public class Validator {

    public static boolean validatePoint (double x, double y, double dr) throws NumberFormatException {
        int r = (int) dr;
        if (x < -6 || x > 6 || y < -6 || y > 6 || r < 1 || r > 4) throw new NumberFormatException( );
        return true;
    }

    public static boolean isThePointIn (double x, double y, int r) {
        if (x >= 0 && x <= r && y >= -1 * r && y <= 0 || x <= 0 && y >= 0 && x * x + y * y <= r * r / 4d || y <= 0 && x <= 0 && y >= -0.5 * x - (r / 2d))
            return true;
        else return false;
    }

    public static boolean validateUser (String login, String password) {
        String regex = "[a-zA-Z0-9]+$";
        if (login.contains(" ") || password.contains(" ")) return false;
        if (!login.matches(regex) || !password.matches(regex)) return false;
        if (login.length( ) < 6 || password.length( ) < 6) return false;
        return true;
    }
}
