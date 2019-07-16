/**
 * @file
 * documents: https://www.npmjs.com/package/uuid
 */
import IUuid from '../../usecase/infrastructure/i-uuid';
import uuidV4 from 'uuid/v4';

const Uuid: IUuid = { generateV4: uuidV4 };

export default Uuid;
