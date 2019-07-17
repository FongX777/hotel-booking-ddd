/**
 * @file
 * documents: https://www.npmjs.com/package/bcrypt
 */
import bcrypt from 'bcrypt';

export function encrypt(data: string): string {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(data, salt);
}

export function compare(data: string, encrypted: string): boolean {
  return bcrypt.compareSync(data, encrypted);
}
