import { Entity, Identifier } from '../__shared';

export class HotelierId extends Identifier<string> {}

interface HotelierProps {
  id: HotelierId;
  email: string;
  password: string;
}

export class Hotelier extends Entity<HotelierProps> {
  constructor(props: HotelierProps) {
    super(props);
  }

  get id() {
    return this.props.id;
  }
  get email() {
    return this.props.email;
  }
  get password() {
    return this.props.password;
  }

  set email(email: string) {
    this.props.email = email;
  }
  set password(password: string) {
    this.props.password = password;
  }
}
