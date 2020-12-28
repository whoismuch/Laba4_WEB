package entities;

import handlers.PasswordHandler;

import javax.persistence.*;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "generatorU")
    @SequenceGenerator(name = "generatorU", sequenceName = "users_id_seq", initialValue = 1, allocationSize=1)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "login", nullable = false)
    private String login;
    @Column(name = "password", nullable = false)
    private String password;

    public User () {

    }

    public User(String login, String password) throws NoSuchAlgorithmException {
        this.login = login;
        this.password = PasswordHandler.getHashedPassword(password);
    }

    public Integer getId ( ) {
        return id;
    }

    public void setId (Integer id) {
        this.id = id;
    }

    public String getLogin ( ) {
        return login;
    }

    public void setLogin (String login) {
        this.login = login;
    }

    public String getPassword ( ) {
        return password;
    }

    public void setPassword (String password) {
        this.password = password;
    }


}
