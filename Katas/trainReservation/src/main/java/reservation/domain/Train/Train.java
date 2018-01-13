package reservation.domain.Train;

import io.vavr.collection.List;
import io.vavr.control.*;
import reservation.domain.*;

import java.util.*;

public class Train {
    private Train() {
    }

    public static TrainFactory withId(String tgvId) {
        return new TrainFactory(tgvId);
    }

    public List<Seat> findAvailableSeat(List<UUID> passengerIds) {
        return Try.of(() -> findAvailableSeatThrowable(passengerIds)).getOrElse(List.empty());
    }

    private List<Seat> findAvailableSeatThrowable(List<UUID> passengerIds) {
        return passengerIds.map(passenger -> {
            final Wagon wagon = nextAvailableWagon().getOrElseThrow(IllegalStateException::new);
            return new Seat(passenger, id, wagon.wagonClass().toString(), wagon.number(), wagon.reserveNextAvailableSeat());
        });
    }

    private Option<Wagon> nextAvailableWagon() {
        return wagons.find(w -> w.availableSeatNumber() > 0);
    }

    public String id() {
        return id;
    }

    public int wagonCount() {
        return wagons.size();
    }

    public enum Class {SECOND}

    public static class TrainFactory {
        private TrainFactory(String tgvId) {
            instance = new Train();
            instance.id = tgvId;
        }

        public Wagon.WagonFactory createWagon(int wagonNumber, Class wagonClass) {
            return new Wagon.WagonFactory(this, wagonNumber, wagonClass);
        }

        public Train create() {
            instance.wagons = factoryWagons;
            return instance;
        }

        public void addWagon(Wagon instance) {
            factoryWagons = factoryWagons.append(instance);
        }

        private final Train instance;
        private List<Wagon> factoryWagons = List.empty();
    }

    private String id;
    private List<Wagon> wagons = List.empty();
}
