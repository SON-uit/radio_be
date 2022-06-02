class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "Failed" : "Error";
    this.isOperational = true; // kiem tra day la loi he thong(loi nguoi dung) thi in ra client , con loi progamming thi k in ra
    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
