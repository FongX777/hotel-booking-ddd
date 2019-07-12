import { Entity, Identifier } from '../shared';

export class RoomId extends Identifier<string> {}

export interface RoomProps {
  id: RoomId;
  roomNo: string;
  name: string;
  description?: string;
  numberOfOccupants: number;
  facilities: string[];
  size: number;
  price: number;
  coverImage: string | null;
  images: string[];
}

export class Room extends Entity<RoomProps> {
  private constructor(props: RoomProps) {
    super(props);
  }

  static create(params: {
    id: RoomId;
    roomNo: string;
    name: string;
    description?: string;
    numberOfOccupants: number;
    facilities?: string[];
    size: number;
    price: number;
    coverImage?: string | null;
    images?: string[];
  }): Room {
    const props: RoomProps = {
      id: params.id,
      roomNo: params.roomNo,
      name: params.name,
      description: params.description || '',
      numberOfOccupants: params.numberOfOccupants,
      facilities: params.facilities || [],
      size: params.size,
      price: params.price,
      coverImage: params.coverImage || null,
      images: params.images || []
    };
    return new Room(props);
  }
}
