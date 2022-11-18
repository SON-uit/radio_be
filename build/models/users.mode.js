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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const userSchema = new mongoose_1.default.Schema({
    userName: { type: String, required: [true, "Please input your username"] },
    email: {
        type: String,
        required: [true, "Please fill your email address"],
        unique: true,
        validate: {
            validator: function () {
                return emailRegex.test(this.email);
            },
            message: "Email must be a valid email address"
        }
    },
    password: {
        type: String,
        required: [true, "Please fill your password"],
        trim: true,
        minLength: [8, "Password must be at least 8 characters"],
        maxlength: [16, "Password must be at most 16 characters "],
        select: false // can't not see this field when query
    },
    confirmedPassword: {
        type: String,
        required: [true, "Password must be a valid confirm password"],
        trim: true,
        minLength: [8, "Password must be at least 8 characters"],
        maxlength: [16, "Password must be at most 16 characters "],
        select: false,
        validate: {
            validator: function () {
                return this.confirmedPassword === this.password;
            },
            message: "Confirm password incorrect"
        }
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        select: false,
        message: "Invalid role"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dnyieivv3/image/upload/v1654421839/Radio_Image/default_avatar_mofobi.png"
    },
    likeTracks: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Track" }],
    likeSingers: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Singer" }],
    likeAlbums: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Album" }]
}, { timestamps: true });
// Pre Save User
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // only run when password modified
        if (!this.isModified("password"))
            return next();
        // hash password,
        this.password = yield bcrypt_1.default.hash(this.password, 12);
        // dont' strore password confirm
        this.confirmedPassword = undefined;
        next();
    });
});
// User Methods
userSchema.methods.isCorrectPassword = function (enterPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield bcrypt_1.default.compare(enterPassword, this.password);
        return result;
    });
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=users.mode.js.map