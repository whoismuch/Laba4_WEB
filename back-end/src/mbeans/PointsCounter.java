package mbeans;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.Local;
import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.management.MBeanServer;
import javax.management.Notification;
import javax.management.NotificationBroadcasterSupport;
import javax.management.ObjectName;
import java.lang.management.ManagementFactory;


@Singleton
@LocalBean
@Startup
public class PointsCounter extends NotificationBroadcasterSupport implements PointsCounterMBean {

    private int allPointsCounter = 0;
    private int outOfAreaPointsCounter = 0;
    private int sequenceNumber = 0;

    private MBeanServer platformMBeanServer;
    private ObjectName objectName = null;

    @PostConstruct
    public void registerInJMX() {
        System.out.println("pointsCounter init");

        try {
            objectName = new ObjectName("mbeans:type=" + this.getClass().getName());
            platformMBeanServer = ManagementFactory.getPlatformMBeanServer();
            platformMBeanServer.registerMBean(this, objectName);
        } catch (Exception e) {
            throw new IllegalStateException("Problem during registration of Monitoring into JMX:" + e);
        }
    }

    @Override
    public int getAllPointsCounter ( ) {
        return allPointsCounter;
    }

    @Override
    public int getOutOfAreaPointsCounter ( ) {
        return outOfAreaPointsCounter;
    }

    public void changeCounters(boolean result, double x, double y, double r) {
        allPointsCounter++;
        if (!result) outOfAreaPointsCounter++;
        double rate = 100/r;
        double xRate = x*rate;
        double yRate = y*rate;
        if (Math.abs(xRate)>150 || Math.abs(yRate) > 150) {
            sendNotification(new Notification("out_of_coordinate_plane", this, sequenceNumber++, System.currentTimeMillis(), "You hit an area outside the coordinate plane" ));
        }
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
