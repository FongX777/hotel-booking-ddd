import { RoomId, Room } from '../../domain/model/room/room';
import { RoomRepository } from './repository';

export class SearchRoomUseCase {
  private readonly roomRepo: RoomRepository;
  constructor(roomRepo: RoomRepository) {
    this.roomRepo = roomRepo;
  }

  execute(input: SearchRoomInput, output: SearchRoomOutput) {
    const { id } = input;
    const roomid = new RoomId(id);
    const room = this.roomRepo.findById(roomid);

    if (room === undefined) {
      return;
    } else {
      output.id = room.id.toValue();
      output.roomNo = room.roomNo;
      output.name = room.name;
      output.description = room.description;
      output.numberOfOccupants = room.numberOfOccupants;
      output.facilities = room.facilities;
      output.size = room.size;
      output.price = room.price;
      output.coverImage = room.coverImage;
      output.images = room.images;
      output.active = room.active;
    }
  }
}
export type SearchRoomInput = {
  id: string;
};

export type SearchRoomOutput = {
  id?: string;
  roomNo?: string;
  name?: string;
  description?: string;
  numberOfOccupants?: number;
  facilities?: string[];
  size?: number;
  price?: number;
  coverImage?: string | null;
  images?: string[];
  active?: boolean;
};