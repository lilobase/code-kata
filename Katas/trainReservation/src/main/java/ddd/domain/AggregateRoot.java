package ddd.domain;

public interface AggregateRoot<TID> {
    public TID id();
}
