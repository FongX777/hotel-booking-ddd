import { HotelierRepository } from '../../../domain/model/hotelier/repository';
import { Hotelier, HotelierId } from '../../../domain/model/hotelier/hotelier';
import { generateV4 } from '../__utils/uuid';

export class MemeryHotelierRepository implements HotelierRepository {
  public hoteliers: Hotelier[];
  constructor() {
    this.hoteliers = [];
  }

  nextId(): HotelierId {
    const date: Date = new Date();
    const dateStr: string = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ].join('');
    const newUuid: string = generateV4().substr(0, 20);
    const id: string = `booking-hotelier-${dateStr}-${newUuid}`;
    return new HotelierId(id);
  }

  findById(id: HotelierId): Hotelier | undefined {
    // todo
    return this.hoteliers.find(hotelier => hotelier.id.equals(id));
  }

  findByEmail(email: String) {
    return this.hoteliers.find(hotelier => hotelier.email === email);
  }

  deleteById(id: HotelierId): void {
    return;
  }

  save(hotelier: Hotelier): void {
    const existingHotelier = this.findById(hotelier.id);
    if (existingHotelier === undefined) {
      this.hoteliers.push(hotelier);
    } else {
      const index = this.hoteliers.findIndex(hotelier =>
        hotelier.id.equals(hotelier.id)
      );
      this.hoteliers.splice(index, 1);
      this.hoteliers.push(hotelier);
    }
  }
}
