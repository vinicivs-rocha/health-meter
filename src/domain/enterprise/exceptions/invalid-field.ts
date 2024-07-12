export class InvalidField extends Error {
  constructor(field: string, value: any) {
    super(`Invalid ${field}: ${value}`);
  }
}
