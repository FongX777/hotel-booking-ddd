import { Room, RoomId } from '../room';

describe('Room.create', function() {
  it('success - normal case', function() {
    const params = {
      id: new RoomId('111'),
      roomNo: '701',
      name: 'Castle Room',
      description: 'very pretty',
      numberOfOccupants: 4,
      facilities: ['Wifi', 'Bath'],
      size: 30,
      price: 1000,
      coverImage:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      images: [
        'https://images.unsplash.com/photo-1502921451607-29fa99d270d4',
        'https://images.unsplash.com/photo-1506664453913-f326aa81f54d'
      ]
    };
    const result = Room.create(params);
    expect(result.props).toEqual({
      ...params,
      active: false
    });
  });

  it('success - test default', function() {
    const params = {
      id: new RoomId('111'),
      roomNo: '701',
      name: 'Castle Room',
      numberOfOccupants: 4,
      size: 30,
      price: 1000
    };
    const result = Room.create(params);
    expect(result.props).toEqual({
      ...params,
      description: '',
      facilities: [],
      coverImage: null,
      active: false,
      images: []
    });
  });
});

describe('Room create then update', function() {
  it('update data', function() {
    const params = {
      id: new RoomId('111'),
      roomNo: '701',
      name: 'Castle Room',
      description: 'very pretty',
      numberOfOccupants: 4,
      facilities: ['Wifi', 'Bath'],
      size: 30,
      price: 1000,
      coverImage:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      images: []
    };
    const result = Room.create(params);

    const newRoomNo = '702';
    const newName = 'New Name';
    const newDescription = 'new description';
    const newNumberOfOccupants = 4;
    const newSize = 40;
    const newPrice = 1500;
    const newCoverImage = 'https://image.png';
    const imagesToBeAdded = ['https://aaa.jpg', 'https://bbb.jpg'];
    const facilitiesToBeAdded = ['Bath', 'KTV', 'Parking'];

    result.updateRoomNo(newRoomNo);
    expect(result.roomNo).toBe(newRoomNo);
    result.updateName(newName);
    expect(result.name).toBe(newName);
    result.updateDescription(newDescription);
    expect(result.description).toBe(newDescription);
    result.updateNumberOfOccupants(newNumberOfOccupants);
    expect(result.numberOfOccupants).toBe(newNumberOfOccupants);
    result.updateSize(newSize);
    expect(result.size).toBe(newSize);
    result.updatePrice(newPrice);
    expect(result.price).toBe(newPrice);
    result.updateCoverImage(newCoverImage);
    expect(result.coverImage).toBe(newCoverImage);

    result.addImages(imagesToBeAdded);
    expect(result.images).toEqual(imagesToBeAdded);
    result.removeImages(imagesToBeAdded);
    expect(result.images).toEqual([]);

    result.addFacilities(facilitiesToBeAdded);
    expect(result.facilities).toEqual(['Wifi', 'Bath', 'KTV', 'Parking']);
    console.log(facilitiesToBeAdded);
    result.removeFacilities(facilitiesToBeAdded);
    expect(result.facilities).toEqual(['Wifi']);
  });
});
