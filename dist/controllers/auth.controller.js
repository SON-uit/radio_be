"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_mode_1 = __importDefault(require("../models/users.mode"));
const catchAsync_1 = __importDefault(require("../helpers/catchAsync"));
const appError_1 = __importDefault(require("../helpers/appError"));
class AuthController {
    constructor() {
        this.signToken = (id) => {
            if (process.env.JWT_SECRET_KEY && process.env.JWT_EXPIRATION) {
                return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_SECRET_KEY, {
                    expiresIn: process.env.JWT_EXPIRATION
                });
            }
        };
        this.register = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { username, password, email, confirmedPassword } = req.body;
            const userObj = {
                userName: username,
                password: password,
                email: email,
                confirmedPassword: confirmedPassword
            };
            const newUser = yield users_mode_1.default.create(userObj);
            const signToken = this.signToken(newUser._id);
            return res.status(200).json({
                status: "Success",
                data: {
                    token: signToken,
                    user: newUser
                }
            });
        }));
        this.login = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                return next(new appError_1.default("Please enter a email or password", 404));
            }
            let user = yield users_mode_1.default.findOne({ email: email }).select("password"); // add password to compare hash password
            if (!user || !(yield user.isCorrectPassword(password))) {
                return next(new appError_1.default("Invalid Email or Incorrect Password", 404));
            }
            user = yield users_mode_1.default.findOne({ email: email }).select("-password");
            const signToken = this.signToken(user === null || user === void 0 ? void 0 : user._id);
            return res.status(200).json({
                status: "Success",
                data: {
                    token: signToken,
                    user
                }
            });
        }));
        this.checkLogin = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!req.headers.authorization && !((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith("Bearer"))) {
                return next(new appError_1.default("You must be logged in", 403));
            }
            const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split("Bearer")[1].trim();
            if (process.env.JWT_SECRET_KEY && token) {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
                const user = yield users_mode_1.default.findOne({ _id: decoded.id });
                req.session.user = user || undefined;
            }
            next();
        }));
    }
}
module.exports = new AuthController();
//# sourceMappingURL=auth.controller.js.map