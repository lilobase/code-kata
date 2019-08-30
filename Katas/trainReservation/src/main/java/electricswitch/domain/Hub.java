package electricswitch.domain;

import ddd.domain.*;
import io.vavr.collection.List;

import java.time.*;
import java.util.*;

public class Hub implements AggregateRootWithUUID {

    static public Hub create(String productReference, UUID locationId) {
        final Hub instance = new Hub(UUID.randomUUID());
        instance.locationId = locationId;
        instance.productReference = productReference;
        return instance;
    }

    private Hub(UUID id){
        this.id = id;
    }

    @Override
    public UUID id() {
        return id;
    }

    public void addMaintenanceOperation(String description, MaintenanceOperation.Type type) {
        maintenanceOperations = maintenanceOperations.append(new MaintenanceOperation(description, type, LocalDateTime.now()));
    }

    public List<MaintenanceOperation> findMaintenanceOperationsByType(MaintenanceOperation.Type type) {
        return maintenanceOperations.filter(operation -> operation.type().equals(type));
    }

    private UUID locationId;
    private String productReference;
    private List<MaintenanceOperation> maintenanceOperations = List.empty();
    private final UUID id;
}