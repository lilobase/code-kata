package locations.domain;

import io.vavr.collection.*;

public class Location {


    public Location(Location location, String path) {
        parent = location;
        this.name = path;
    }

    public String path() {
        return parent().path().concat(".").concat(name);
    }

    public String name() {
        return name;
    }

    public Location parent() {
        return parent;
    }

    public Location addChildren(String name) {
        final Location instance = new Location(this, name);
        children = children.append(instance);
        return instance;
    }

    private final Location parent;
    private final String name;
    private List<Location> children = List.empty();
}
