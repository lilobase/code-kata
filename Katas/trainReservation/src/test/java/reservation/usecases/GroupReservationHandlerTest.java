package reservation.usecases;

import io.vavr.collection.List;
import org.junit.jupiter.api.*;
import reservation.domain.*;
import reservation.domain.Train.*;
import reservation.infrastructure.*;

import java.util.*;

import static org.assertj.core.api.Assertions.*;

class GroupReservationHandlerTest {

    public GroupReservationHandlerTest() {
        final Train train = TrainFixtures.aTrainWithTwoAvailableSeatsInTheSameWagon();
        trainService = new FakeTrainService(train);
        handler = new GroupReservationHandler(trainService);
    }

    @Test
    void IcanReserveASeat() {

        final UUID passengerId = UUID.randomUUID();
        final String trainId = "TGV85632";

        final List<Seat> seats = handler.handle(new GroupReservation(List.of(passengerId), trainId)).get();

        assertThat(seats).contains(new Seat(passengerId, trainId, "SECOND", 1, 1));
    }

    @Test
    void IcanReserveSeats() {
        final UUID passenger1 = UUID.randomUUID();
        final UUID passenger2 = UUID.randomUUID();
        final String trainId = "TGV85632";

        final List<Seat> seats = handler.handle(new GroupReservation(List.of(passenger1, passenger2), trainId)).get();

        assertThat(seats).contains(
                new Seat(passenger1, trainId, "SECOND", 1, 1),
                new Seat(passenger2, trainId, "SECOND", 1, 2)
        );

        assertThat(trainService.reservedSeats()).hasSize(2);
    }

    private final GroupReservationHandler handler;
    private final FakeTrainService trainService;
}