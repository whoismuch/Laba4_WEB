import javax.persistence.*;

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
    private int password;

    public User () {

    }

    public User(String login, String password) {
        this.login = login;
        this.password = password.hashCode();
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

    public int getPassword ( ) {
        return password;
    }

    public void setPassword (int password) {
        this.password = password;
    }


}
