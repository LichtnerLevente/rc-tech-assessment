export class BoardKey {
  private readonly value: string;
  constructor(value: string) {
    if (value?.length === 4 && value === value.toUpperCase()) {
      this.value = value;
    } else {
      console.log(value)
      throw new Error("Board key must be 4 character long string with only uppercase letters")
    }
  }
  getValue(): string {
    return this.value;
  }
}