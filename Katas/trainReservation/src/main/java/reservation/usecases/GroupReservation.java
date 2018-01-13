package reservation.usecases;

import io.vavr.collection.List;

import java.util.*;

public class GroupReservation {
    public GroupReservation(List<UUID> passengers, String trainId) {
        this.passengers = passengers;
        this.trainId = trainId;
    }

    public final List<UUID> passengers;
    public final String trainId;
}
