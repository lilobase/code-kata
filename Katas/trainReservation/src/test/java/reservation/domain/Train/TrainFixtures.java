package reservation.domain.Train;

public class TrainFixtures {
    public TrainFixtures() {
    }

    public static Train aTrainWithTwoAvailableSeatsInDifferentWagons() {
        return Train.withId("TGV85632")
                .createWagon(1, Train.Class.SECOND)
                .withSeat(1, true)
                .add()
                .createWagon(2, Train.Class.SECOND)
                .withSeat(1, true)
                .add()
                .create();
    }

    public static Train aTrainWithTwoAvailableSeatsInTheSameWagon() {
        return aTrainWithTwoSeatsInTheSameWagon(true);
    }

    public static Train aTrainWithTwoSeatsInTheSameWagon(boolean availability) {
        return Train.withId("TGV85632")
                .createWagon(1, Train.Class.SECOND)
                .withSeat(1, availability)
                .withSeat(2, availability)
                .add()
                .create();
    }
}