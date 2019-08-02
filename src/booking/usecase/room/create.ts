import {RoomId,Room} from '../../domain/model/room/room';
import {RoomRepository} from './repository';

export class CreateRoomUsecase{
    private roomRepo : RoomRepository;
    
    constructor(roomRepo: RoomRepository){
        this.roomRepo =roomRepo;
    }

    execute(input: CreateRoomInput, output: CreateRoomOutput):void{
        const id : RoomId  =  this.roomRepo.nextId();
        const {roomNo,name,description,numberOfOccupants,facilities,size,price,coverImage,images}  = input;
        const room :Room =Room.create({
            id,
            roomNo,
            name,
            description,
            numberOfOccupants,
            facilities,
            size,
            price,
            coverImage,
            images
        });
        this.roomRepo.save(room);
        output.success =true;
        output.id = id.toValue();
    }
}

export type CreateRoomInput ={
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

export type CreateRoomOutput = {
    id?: string,
    success?: boolean
}

