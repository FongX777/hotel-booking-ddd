export default interface IBcrypt {
  encrypt: (data: string) => string;
  compare: (data: string, encrypted: string) => boolean;
}
