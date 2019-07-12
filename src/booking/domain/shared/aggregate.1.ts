import { Entity } from './entity';
import { EntityLikeProps } from './entity_like';
import { Identifier } from './identifier';

export class AggregateRoot<
  Prop extends EntityLikeProps<Identifier<any>>
> extends Entity<Prop> {
  get id(): Identifier<string> {
    return this.id;
  }
}
