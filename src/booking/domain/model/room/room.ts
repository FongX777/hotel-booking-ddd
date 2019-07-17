import { Entity, Identifier } from '../__shared';

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

  get id(): RoomId {
    return this.props.id;
  }
  get roomNo() {
    return this.props.roomNo;
  }
  get name() {
    return this.props.name;
  }
  get description() {
    return this.props.description;
  }
  get numberOfOccupants() {
    return this.props.numberOfOccupants;
  }
  get facilities() {
    return this.props.facilities;
  }
  get size() {
    return this.props.size;
  }
  get price() {
    return this.props.price;
  }
  get coverImage() {
    return this.props.coverImage;
  }
  get images() {
    return this.props.images;
  }
  get active() {
    return this.props.active;
  }

  activate() {
    this.props.active = true;
  }

  deactivate() {
    this.props.active = false;
  }

  addFacilities(facilities: string[]) {
    const newFacilities = new Set(this.props.facilities.concat(facilities));
    this.props.facilities = [...newFacilities];
  }

  removeFacilities(facilities: string[]) {
    const newFacilities: string[] = [];
    facilities.forEach(facility => {
      const idx = this.props.facilities.findIndex(f => f === facility);
      if (idx !== -1) {
        this.props.facilities.splice(idx, 1);
      }
    });
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

  static build(params: RoomProps) {
    return new Room(params);
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
