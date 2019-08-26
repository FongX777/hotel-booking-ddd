import { MemeryHotelierRepository } from '../../../adapter/repository/hotelier/memory-repository';
const awilix = require('awilix');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.Proxy
})

container.register({
  memoryHotelierRepository: awilix.asClass(MemeryHotelierRepository)
})

export { container };

