package reservation.domain.Train;

import io.vavr.collection.*;
import io.vavr.control.*;
import reservation.domain.*;

public interface TrainService {

    Train getById(String trainId);

    Try<Void> reserveSeats(List<Seat> seats);

}
