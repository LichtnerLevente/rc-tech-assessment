export class RecordKeyInvalid extends Error {
  constructor(key: string) {
    super(`Record key is invalid: ${key}`);
  }
}
