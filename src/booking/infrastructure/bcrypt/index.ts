/**
 * @file
 * documents: https://www.npmjs.com/package/bcrypt
 */
import bcrypt from 'bcrypt';
import IBcrypt from '../../usecase/infrastructure/i-bcrypt';

const Bcrypt: IBcrypt = {
  encrypt: (data: string): string => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(data, salt);
  },
  compare: (data: string, encrypted: string): boolean => {
    return bcrypt.compareSync(data, encrypted);
  }
};

export default Bcrypt;
