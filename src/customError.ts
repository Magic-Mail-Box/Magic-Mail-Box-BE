export class CustomError {
  message!: string;
  status!: number;

  constructor(message: string, status: number , additionalInfo: any = {}) {
    this.message = message;
    this.status = status;
  }
}