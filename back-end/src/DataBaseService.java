import javax.annotation.Resource;
import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.transaction.*;

@Singleton
public class DataBaseService {

    @PersistenceContext(unitName = "postgres")
    private EntityManager em;

    @Resource
    private UserTransaction userTransaction;

    public void saveUser(User user) throws Exception {
        userTransaction.begin();
        em.persist(user);
        userTransaction.commit();
    }

    public void savePoint(Point point) throws Exception {
        userTransaction.begin();
        em.persist(point);
        userTransaction.commit();
    }

    public boolean doesUserExist(String login, String password) throws NoResultException {
        try {
            User user = (User) em.createQuery("from User where login = :login").setParameter("login", login).getSingleResult();
            if (!(user == null)) {
                if (password.hashCode() == user.getPassword()) return true;
            }
            return false;
        }catch (NoResultException e){return false;}
    }



}
