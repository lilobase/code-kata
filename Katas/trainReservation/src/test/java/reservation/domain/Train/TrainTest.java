package reservation.domain.Train;

import io.vavr.collection.List;
import org.junit.jupiter.api.*;
import reservation.domain.*;

import java.util.*;

import static org.assertj.core.api.AssertionsForInterfaceTypes.*;

class TrainTest {

    @Test
    void ItcanCreateATrainWithWagons() {
        final String tgvId = "TGV85632";
        final Train train = TrainFixtures.aTrainWithTwoAvailableSeatsInTheSameWagon();

        assertThat(train.id()).isEqualTo(tgvId);
        assertThat(train.wagonCount()).isEqualTo(1);
    }

    @Test
    void ItGivesMeAnAvailableSeat() {
        final Train train = TrainFixtures.aTrainWithTwoAvailableSeatsInTheSameWagon();

        final UUID passengerId = UUID.randomUUID();

        List<Seat> seats = train.findAvailableSeat(List.of(passengerId));

        assertThat(seats).contains(new Seat(passengerId, "TGV85632", "SECOND", 1, 1));
    }

    @Test
    void ItGivesMeTwoAvailableSeats() {
        final Train train = TrainFixtures.aTrainWithTwoAvailableSeatsInTheSameWagon();

        final UUID passenger1 = UUID.randomUUID();
        final UUID passenger2 = UUID.randomUUID();

        List<Seat> seats = train.findAvailableSeat(List.of(passenger1, passenger2));

        assertThat(seats).contains(new Seat(passenger1, "TGV85632", "SECOND", 1, 1));
        assertThat(seats).contains(new Seat(passenger2, "TGV85632", "SECOND", 1, 2));
    }

    @Test
    void itReturnsAnEmptyListIfNoSeatAvailable() {
        final Train train = TrainFixtures.aTrainWithTwoSeatsInTheSameWagon(false);

        final List<Seat> seat = train.findAvailableSeat(List.of(UUID.randomUUID()));

        assertThat(seat).isEmpty();
    }

    @Test
    void ItGivesMeTwoAvailableSeatsInDifferentWagon() {
        final Train train = TrainFixtures.aTrainWithTwoAvailableSeatsInDifferentWagons();

        final UUID passenger1 = UUID.randomUUID();
        final UUID passenger2 = UUID.randomUUID();

        List<Seat> seats = train.findAvailableSeat(List.of(passenger1, passenger2));

        assertThat(seats).contains(new Seat(passenger1, "TGV85632", "SECOND", 1, 1));
        assertThat(seats).contains(new Seat(passenger2, "TGV85632", "SECOND", 2, 1));
    }

}