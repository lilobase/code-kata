package ddd.usecases;

public interface UseCaseHandler<TRESPONSE, TCOMMAND> {
    TRESPONSE handle(TCOMMAND command);
}
