export interface ValueObjectProps {
  [index: string]: any;
}

/**
 * Value object definition.
 * props is readonly by design.
 */
export class ValueObject<Props extends ValueObjectProps> {
  props: Readonly<Props>;

  constructor(props: Props) {
    this.props = Object.freeze(props);
  }

  /**
   * Check equality by shallow equals of properties.
   * It can be override.
   */
  equals(object?: ValueObject<Props>): boolean {
    if (object === null || object === undefined) {
      return false;
    }
    if (object.props === undefined) {
      return false;
    }

    const objectKeys = Object.keys(object.props);
    const thisKeys = Object.keys(this.props);

    if (objectKeys.length !== thisKeys.length) {
      return false;
    }

    for (let i = 0; i < objectKeys.length; i++) {
      const key = objectKeys[i];
      if (
        !object.props.hasOwnProperty(key) ||
        object.props[key] !== this.props[key]
      ) {
        return false;
      }
    }
    return true;
  }
}
