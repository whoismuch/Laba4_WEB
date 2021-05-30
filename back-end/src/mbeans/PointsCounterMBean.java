package mbeans;

import javax.ejb.Local;

@Local
public interface PointsCounterMBean {

    int getAllPointsCounter();

    int getOutOfAreaPointsCounter();
}
