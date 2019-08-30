package locations.domain;

import ddd.domain.*;

import java.util.*;

public class RootLocation extends Location implements AggregateRoot<UUID> {
    public RootLocation(String path) {
        super(null, path);
        id = UUID.randomUUID();
    }

    @Override
    public UUID id() {
        return id;
    }

    public String path() {
        return name();
    }

    public static RootLocation create(String name) {
        return new RootLocation(name);
    }

    private final UUID id;
}
