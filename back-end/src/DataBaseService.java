import javax.annotation.Resource;
import javax.ejb.Singleton;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.transaction.*;
import java.util.ArrayList;
import java.util.List;

@Singleton
public class DataBaseService {

    @PersistenceContext(unitName = "postgres")
    private EntityManager em;


    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void saveUser (User user) throws Exception {
        em.persist(user);
    }

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void savePoint (Point point) throws Exception {
        em.persist(point);
    }

    public boolean doesUserExist (String login) throws NoResultException {
        try {
            User user = (User) em.createQuery("SELECT c FROM User c WHERE c.login LIKE :castLogin").setParameter("castLogin", login).getSingleResult( );
            if (user == null) return false;
            return true;
        } catch (NoResultException e) {
            return false;
        }
    }

    public boolean doesCurUserExist (String login, String password) throws NoResultException {
        try {
            User user = (User) em.createQuery("SELECT c FROM User c WHERE c.login LIKE :castLogin").setParameter("castLogin", login).getSingleResult( );
            if (!(user == null)) {
                if (password.hashCode() == user.getPassword()) return true;
            }
            return false;
        } catch (NoResultException e) {
            return false;
        }
    }

    public List<Point> getPoints(String login) {
        try {
            List<Point> points = em.createQuery("SELECT p FROM Point p WHERE p.login LIKE :castLogin", Point.class).setParameter("castLogin", login).getResultList();
            return points;

        } catch (NoResultException e) {
            System.out.println("fuck");
            return null;
        }
    }


}
