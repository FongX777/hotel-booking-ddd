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
  active: boolean;
}

export class Room extends Entity<RoomProps> {
  private constructor(props: RoomProps) {
    super(props);
    if (this.props.numberOfOccupants <= 0) {
      throw new Error('');
    }
    if (this.props.size <= 0) {
      throw new Error('');
    }
    if (this.props.price <= 0) {
      throw new Error('');
    }
  }

  updateName(name: string) {
    this.props.name = name;
  }

  updateRoomNo(roomNo: string) {
    this.props.roomNo = roomNo;
  }

  updateDescription(description: string) {
    this.props.description = description;
  }

  updateNumberOfOccupants(numberOfOccupants: number) {
    this.props.numberOfOccupants = numberOfOccupants;
  }

  updateSize(size: number) {
    this.props.size = size;
  }

  updatePrice(price: number) {
    this.props.price = price;
  }

  updateCoverImage(image: string) {
    this.props.coverImage = image;
  }

  activate() {
    this.props.active = true;
  }

  deactivate() {
    this.props.active = false;
  }

  addFacilities(facilities: string[]) {
    this.props.facilities.push(...facilities);
  }

  removeFacilities(facilities: string[]) {
    const newFacilities: string[] = [];
    this.props.facilities.forEach(facility => {
      if (!facilities.includes(facility)) {
        newFacilities.push(facility);
      }
    });
    this.props.facilities = newFacilities;
  }

  addImages(images: string[]) {
    this.props.images.push(...images);
  }
  removeImages(images: string[]) {
    const newImages: string[] = [];
    this.props.images.forEach(image => {
      if (!images.includes(image)) {
        newImages.push(image);
      }
    });
    this.props.images = newImages;
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
      images: params.images || [],
      active: false
    };
    return new Room(props);
  }
}
