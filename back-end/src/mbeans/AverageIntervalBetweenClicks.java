package mbeans;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.Local;
import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.management.MBeanServer;
import javax.management.ObjectName;
import java.lang.management.ManagementFactory;
import java.util.Date;

@Singleton
@LocalBean
@Startup
public class AverageIntervalBetweenClicks implements AverageIntervalBetweenClicksMBean {

    private int sum = 0;
    private int count = 0;
    private long initTime = new Date().getTime();
    private double averageInterval;

    private MBeanServer platformMBeanServer;
    private ObjectName objectName = null;

    @PostConstruct
    public void registerInJMX() {
        try {
            objectName = new ObjectName("mbeans:type=" + this.getClass().getName());
            platformMBeanServer = ManagementFactory.getPlatformMBeanServer();
            platformMBeanServer.registerMBean(this, objectName);
        } catch (Exception e) {
            throw new IllegalStateException("Problem during registration of Monitoring into JMX:" + e);
        }
    }

    @Override
    public double getAverageInterval ( ) {
        return averageInterval;
    }

    public void calculateAverageInterval() {
        long currentTime = new Date().getTime();
        long diff = currentTime - initTime;
        sum+=diff;
        count++;
        averageInterval=sum/count;
        averageInterval/=1000;
        initTime = currentTime;
    }

    @PreDestroy
    public void unregisterFromJMX() {
        try {
            platformMBeanServer.unregisterMBean(this.objectName);
        } catch (Exception e) {
            throw new IllegalStateException("Problem during unregistration of Monitoring into JMX:" + e);
        }
    }
}
