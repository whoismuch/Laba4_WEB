package mbeans;

import javax.ejb.Local;

@Local
public interface AverageIntervalBetweenClicksMBean {

    double getAverageInterval();
}
