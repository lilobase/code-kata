package electricswitch.domain;

import java.time.*;

public class MaintenanceOperation {

    MaintenanceOperation(String description, Type operationType, LocalDateTime dateTime) {
        this.description = description;
        this.operationType = operationType;
        this.dateTime = dateTime;
    }

    public LocalDateTime moment() {
        return dateTime;
    }

    public Type type() {
        return operationType;
    }

    public String description() {
        return description;
    }

    private String description;
    private final Type operationType;
    private final LocalDateTime dateTime;

    public enum Type {
        HARDWARE_CHANGE
    }
}
