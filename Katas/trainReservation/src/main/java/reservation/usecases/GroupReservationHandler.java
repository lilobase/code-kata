package reservation.usecases;

import io.vavr.collection.*;
import io.vavr.control.*;
import reservation.domain.*;
import reservation.domain.Train.*;

public class GroupReservationHandler {
    public GroupReservationHandler(TrainService trainService) {
        this.trainService = trainService;
    }

    public Try<List<Seat>> handle(GroupReservation reservation) {
        final List<Seat> seats = trainService.getById(reservation.trainId).findAvailableSeat(reservation.passengers);

        return trainService.reserveSeats(seats).map(v -> seats);
    }

    private final TrainService trainService;
}