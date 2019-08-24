import { Room, RoomId } from '../../domain/model/room/room';
import { RoomRepository } from '../../domain/model/room/repository';

export class EditRoomUsecase {
  constructor(private readonly roomRepo: RoomRepository) {
    this.roomRepo = roomRepo;
  }
  execute(input: EditRoomInput, output: EditRoomOutput) {
    const roomId = new RoomId(input.id);
    const room = this.roomRepo.findById(roomId);
    if (room === undefined) {
      return;
    }
    room.edit({
      roomNo: room.roomNo,
      name: room.name,
      description: room.description,
      numberOfOccupants: room.numberOfOccupants,
      facilities: room.facilities,
      size: room.size,
      price: room.price,
      coverImage: room.coverImage,
      images: room.images,
      active: room.active
    });
    this.roomRepo.save(room);
    output.success = true;
  }
}

export type EditRoomInput = {
  id: string;
  roomNo: string;
  name: string;
  description: string;
  numberOfOccupants: number;
  facilities: string[];
  size: number;
  price: number;
  coverImage: string | null;
  images: string[];
  active: boolean;
}

export type EditRoomOutput = {
  success?: boolean;
}