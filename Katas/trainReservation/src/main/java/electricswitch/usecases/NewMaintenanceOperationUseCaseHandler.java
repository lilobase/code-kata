package electricswitch.usecases;

import ddd.usecases.*;
import electricswitch.domain.*;

import java.util.*;

public class NewMaintenanceOperationUseCaseHandler implements UseCaseHandler<Void, NewMaintenanceOperationUseCase> {

    public NewMaintenanceOperationUseCaseHandler(SwitchRepository repository) {
        this.repository = repository;
    }

    @Override
    public Void handle(NewMaintenanceOperationUseCase command) {
        final Hub aSwitch = repository.get(UUID.fromString(command.switchId));
        final MaintenanceOperation.Type maintenanceOperationType = MaintenanceOperation.Type.valueOf(command.type);

        aSwitch.addMaintenanceOperation(command.description, maintenanceOperationType);
        repository.add(aSwitch);

        return null;
    }

    private final SwitchRepository repository;
}
