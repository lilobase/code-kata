package electricswitch.domain;

import io.vavr.collection.List;
import org.junit.jupiter.api.*;

import java.util.*;

import static org.assertj.core.api.Assertions.*;

class SwitchTest {

    @Test
    void it_can_be_created() {
        final Hub aSwitch = Hub.create("XD04C", UUID.randomUUID());
        assertThat(aSwitch).hasFieldOrPropertyWithValue("productReference", "XD04C");
    }

    @Test
    void it_can_be_maintained() {
        final Hub aSwitch = Hub.create("XD04C", UUID.randomUUID());
        aSwitch.addMaintenanceOperation("a new maintenance operation", MaintenanceOperation.Type.HARDWARE_CHANGE);

        final List<MaintenanceOperation> operations = aSwitch.findMaintenanceOperationsByType(MaintenanceOperation.Type.HARDWARE_CHANGE);

        assertThat(operations).hasSize(1);
    }
}