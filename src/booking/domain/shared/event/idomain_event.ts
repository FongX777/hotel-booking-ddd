import { Identifier } from '../identifier';

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId<T>(): Identifier<T>;
}
