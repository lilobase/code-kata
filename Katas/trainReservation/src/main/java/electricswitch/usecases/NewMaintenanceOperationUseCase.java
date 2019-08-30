package electricswitch.usecases;

import ddd.usecases.*;

public class NewMaintenanceOperationUseCase implements UseCase<Void> {

    public NewMaintenanceOperationUseCase(String switchId, String description, String type) {
        this.switchId = switchId;
        this.description = description;
        this.type = type;
    }

    public String switchId;
    public String description;
    public String type;
}
