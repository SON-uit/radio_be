"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${this.statusCode}`.startsWith("4") ? "Failed" : "Error";
        this.isOperational = true; // kiem tra day la loi he thong(loi nguoi dung) thi in ra client , con loi progamming thi k in ra
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
//# sourceMappingURL=appError.js.map