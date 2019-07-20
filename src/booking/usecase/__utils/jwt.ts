/**
 * @file
 * documents: https://www.npmjs.com/package/bcrypt
 */
import jwt from 'jsonwebtoken';

export function sign(secret: string, id: string, email: string): string {
  const token = jwt.sign({ id, email }, secret).toString();
  return token;
}

export function verify(secret: string, token: string) {
  const decoded = jwt.verify(token, secret);
  return decoded;
}
