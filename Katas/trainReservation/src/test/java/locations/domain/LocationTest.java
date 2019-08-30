package locations.domain;

import org.junit.jupiter.api.*;

import static org.assertj.core.api.Assertions.assertThat;

class LocationTest {

    @Test
    void it_can_be_created() {
        final RootLocation location = RootLocation.create("root");
        assertThat(location.path()).isEqualTo("root");
    }

    @Test
    void it_can_have_children() {
        final RootLocation location = RootLocation.create("root");
        final Location child = location.addChildren("building");

        assertThat(child.path()).isEqualTo("root.building");
    }
}