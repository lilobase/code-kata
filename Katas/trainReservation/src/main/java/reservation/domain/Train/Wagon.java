package reservation.domain.Train;

import io.vavr.collection.*;

class Wagon {

    Wagon(int wagonNumber, Train.Class wagonClass) {
        this.wagonNumber = wagonNumber;
        this.wagonClass = wagonClass;
    }

    Train.Class wagonClass() {
        return wagonClass;
    }

    int number() {
        return wagonNumber;
    }

    int reserveNextAvailableSeat() {
        final Seat seat = seats.filter(s -> s.availability).head();
        seat.markAsReserved();
        return seat.seatNumber;
    }

    public int availableSeatNumber() {
        return seats.filter(s -> s.availability).length();
    }

    static class WagonFactory {
        WagonFactory(Train.TrainFactory train, int wagonNumber, Train.Class wagonClass) {
            this.train = train;
            instance = new Wagon(wagonNumber, wagonClass);
        }

        public WagonFactory withSeat(int seatNumber, boolean availability) {
            instance.seats = instance.seats.append(new Wagon.Seat(seatNumber, availability));
            return this;
        }

        public Train.TrainFactory add() {
            train.addWagon(instance);
            return train;
        }

        private final Wagon instance;
        private final Train.TrainFactory train;
    }

    private static class Seat {
        Seat(int seatNumber, boolean availability) {
            this.seatNumber = seatNumber;
            this.availability = availability;
        }

        private void markAsReserved() {
            this.availability = false;
        }

        private final int seatNumber;
        private boolean availability;
    }

    private final int wagonNumber;
    private final Train.Class wagonClass;
    private List<Seat> seats = List.empty();
}
