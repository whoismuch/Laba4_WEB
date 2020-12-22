import javax.persistence.*;

@Entity
@Table(name= "points")
public class Point {

    public Point ( ) {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "generatorPoint")
    @SequenceGenerator(name = "generatorPoint", sequenceName = "points_id_seq", initialValue = 1, allocationSize=1)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "x", nullable = false)
    private Integer x;
    @Column(name = "y", nullable = false)
    private Double y;
    @Column(name = "r", nullable = false)
    private Integer r;
    @Column(name = "result", nullable = false)
    private Boolean result;

    public Point (Integer x, Double y, Integer r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public Point (Integer x, Double y, Integer r, Boolean result) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
    }

    public Boolean getResult ( ) {
        return result;
    }

    public void setResult (Boolean result) {
        this.result = result;
    }

    public Integer getX ( ) {
        return x;
    }

    public void setX (Integer x) {
        this.x = x;
    }

    public Double getY ( ) {
        return y;
    }

    public void setY (Double y) {
        this.y = y;
    }

    public Integer getR ( ) {
        return r;
    }

    public void setR (Integer r) {
        this.r = r;
    }
}
