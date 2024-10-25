export class ResponseEntity<T> {
  data: T;
  code: number;
  message: string | null;

  constructor(data: T, code: number, message: string | null);
  constructor(data: T, code: number);
  constructor(data: T);

  constructor(data: T, code?: number, message?: string | null) {
    this.data = data;
    this.code = code !== undefined ? code : 200;
    this.message = message !== undefined ? message : null;
  }

  toJSON() {
    return {
      data: this.data,
      code: this.code,
      message: this.message,
    };
  }
}
