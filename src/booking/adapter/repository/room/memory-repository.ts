//import {RoomRepository} from '../../../usecase/room';
import {Room,RoomId} from '../../../domain/model/room/room';
import { generateV4 } from '../__utils/uuid';
import { RoomRepository } from '../../../usecase/room/repository';

export class MemoryRoomRepository implements RoomRepository{
    private rooms: Room[];
    constructor(){
        this.rooms = [];
    }

    nextId(): RoomId{
        const date: Date = new Date();
        const dateStr: string = [
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        ].join('');
        const newUuid: string = generateV4().substr(0, 20);
        const id: string = `create-room-${dateStr}-${newUuid}`;
        return new RoomId(id);
    }
    findById(id: RoomId) : Room | undefined{
        return this.rooms.find(room => room.id.equals(id));
    }

    save(room: Room) : void{
        const existingRoom =this.findById(room.id);
        if(existingRoom === undefined){
            this.rooms.push(room);
        }
        else{
            const index = this.rooms.findIndex(room =>room.id.equals(room.id));
            this.rooms.splice(index,1);
            this.rooms.push(room);
        }
    }
    // activate(id: RoomId) : void{
    //     const existingRoom =this.activate(id);
    //     if(existingRoom === undefined){
    //         throw new Error("try to activate room that doesn't exist.");
    //     }
    //     else{
    //         const index = this.rooms.findIndex(room =>room.id.equals(room.id));
    //         this.rooms.splice(index,1);
    //         this.rooms.push(existingRoom);
    //     }
    // };
}