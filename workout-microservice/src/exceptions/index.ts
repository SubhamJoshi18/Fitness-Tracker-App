class HttpException extends Error {
    public statusNumber: number;
    public message: string;
  
    constructor(message: string | Array<any>, statusNumber: number) {
      super(message as any);
      this.statusNumber = statusNumber;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  
    getStatusNumber(): number {
      return this.statusNumber;
    }
  
    getMessage(): string {
      return this.message;
    }
  }
  
  class UnAuthorizedException extends HttpException {
    constructor(message: string, statusNumber: number) {
      super(message, statusNumber);
      this.name = 'UnAuthorizedExceptions';
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  
  class ValidationException extends HttpException {
    constructor(statusNumber: number, message: string | Array<any>) {
      super(message, statusNumber);
      this.name = 'ValidationException';
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  
  class DatabaseException extends HttpException {
    constructor(statusNumber: number, message: string | Array<any>) {
      super(message, statusNumber);
      this.name = 'DatabaseException';
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  
  export { UnAuthorizedException, ValidationException, DatabaseException };
  