package ddd.infrastructure;

import ddd.domain.*;

public interface Repository<TID, TENTITY extends AggregateRoot<TID>> {
    TENTITY get(TID id);
    void add(TENTITY entity);
    void delete(TID id);
}
