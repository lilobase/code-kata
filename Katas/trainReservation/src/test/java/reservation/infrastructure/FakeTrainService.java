package reservation.infrastructure;

import io.vavr.collection.*;
import io.vavr.control.*;
import reservation.domain.*;
import reservation.domain.Train.*;

public class FakeTrainService implements TrainService {
    public FakeTrainService(Train train) {
        this.train = train;
    }

    @Override
    public Train getById(String trainId) {
        if(train.id().equals(trainId)) return train;

        throw new IllegalArgumentException();
    }

    @Override
    public Try<Void> reserveSeats(List<Seat> seats) {
        reservedSeats = seats;
        return Try.success(null);
    }

    public List<Seat> reservedSeats() {
        return reservedSeats;
    }

    private final Train train;
    private List<Seat> reservedSeats = List.empty();
}
