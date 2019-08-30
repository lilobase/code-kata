package ddd.infrastructure;

import ddd.domain.*;

import java.util.*;

public interface RepositoryWithUUID<TENTITY extends AggregateRootWithUUID> extends Repository<UUID, TENTITY> {}
