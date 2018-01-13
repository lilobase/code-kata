package reservation.domain;

import java.util.*;

public class Seat {
    public Seat(UUID passengerId, String train, String wagonClass, int wagonNumber, int seatNumber) {
        this.passengerId = passengerId;
        this.train = train;
        this.wagonClass = wagonClass;
        this.wagonNumber = wagonNumber;
        this.seatNumber = seatNumber;
    }

    @Deprecated
    public static Seat forPassenger(UUID passengerId) {
        final Seat instance = new Seat(passengerId, null, null, 0, 0);

        return instance;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Seat seat = (Seat) o;
        return wagonNumber == seat.wagonNumber &&
                seatNumber == seat.seatNumber &&
                Objects.equals(passengerId, seat.passengerId) &&
                Objects.equals(train, seat.train) &&
                Objects.equals(wagonClass, seat.wagonClass);
    }

    @Override
    public int hashCode() {

        return Objects.hash(passengerId, train, wagonClass, wagonNumber, seatNumber);
    }

    public final UUID passengerId;
    public final String train;
    public final String wagonClass;
    public final int wagonNumber;
    public final int seatNumber;
}
