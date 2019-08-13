import { Hotelier, HotelierId } from './hotelier';
export interface HotelierRepository {
  nextId: () => HotelierId;
  findById: (id: HotelierId) => Hotelier | undefined;
  findByEmail: (email: String) => Hotelier | undefined;
  deleteById: (id: HotelierId) => void;
  save: (hotelier: Hotelier) => void;
}
