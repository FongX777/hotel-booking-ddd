import { Identifier } from './Identifier';

export interface EntityLikeProps<Id extends Identifier<unknown>> {
  id: Id;
  [index: string]: any;
}

export interface EntityLike<
  Props extends EntityLikeProps<Identifier<unknown>>
> {
  props: Props;

  equals(object?: EntityLike<Props>): boolean;
}
