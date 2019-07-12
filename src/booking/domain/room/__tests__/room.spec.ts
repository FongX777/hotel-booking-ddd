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
    expect(result.props).toEqual(params);
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
      images: []
    });
  });
});
