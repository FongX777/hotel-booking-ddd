import {
    // GetRoomUseCase,
    // GetRoomInput,
    // GetRoomOutput,
    CreateRoomUsecase,
    CreateRoomInput,
    CreateRoomOutput
} from '../index';

import {MemoryRoomRepository } from '../../../adapter/repository/room/memory-repository';

describe ('Create a Room',function(){
    let id: string;
    const roomNo = '103A';
    const name  = '至尊大屌套房';
    const description = '房間內部寬敞、臭臭的，適合一般家庭居住。';
    const numberOfOccupants = 6;
    const facilities : string[] =['浴缸','電視','雙人床','雙人床','單人床','單人床'];
    const size = 15;
    const price = 6940;
    const coverImage = 'https://xvideos.com?page=10000&picture=22';
    const images : string[] = [];
    

    const repo = new MemoryRoomRepository();
    it('create a room',async function(){
        const usecase =new CreateRoomUsecase(repo);
        const input : CreateRoomInput ={roomNo, name, description, numberOfOccupants,facilities,size,price, coverImage,images};
        const output: CreateRoomOutput={};
        await usecase.execute(input,output);
        id = output.id as string;
        expect(output.success).toBeTruthy();
    });

    
    // it('get a room by id',async function(){
    //     const usecase =new GetRoomUseCase(repo);
    //     const input : GetRoomInput ={id};
    //     const output: GetRoomOutput = {};
    //     await usecase.execute(input,output);
    //     expect(output.id).toBe(id);
    //     expect(output.roomNo).toBe(roomNo);
    //     expect(output.size).toBe(size);
    //     expect(output.coverImage).toBe(coverImage);
    //     expect(output.description).toBe(description);
    //     expect(output.facilities).toBe(facilities);
    //     expect(output.images).toBe(images);
    //     expect(output.name).toBe(name);
    //     expect(output.numberOfOccupants).toBe(numberOfOccupants);
    //     expect(output.price).toBe(price);
    // });
});