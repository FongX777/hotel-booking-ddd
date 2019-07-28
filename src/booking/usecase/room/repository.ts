import {Room,RoomId} from '../../domain/model/room/room';

export interface RoomRepository{
    nextId:() => RoomId;
    findById:(id:RoomId) => Room|undefined;
    save:(room:Room) => void;
    activate:(id:RoomId) => void;
}