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
Object.defineProperty(exports, "__esModule", { value: true });
class BaseEntity {
    constructor(modelName) {
        this.modelName = modelName;
        this.modelName = modelName;
    }
    findOne(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(typeof condition, "--");
            return yield this.modelName.findOne(condition);
        });
    }
    insertMany(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside insert many");
            return yield this.modelName.insertMany(payload);
        });
    }
    findOneAndUpdate(condition, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.modelName.findOneAndUpdate(condition, { $set: payload }, { new: true });
        });
    }
    updateOne(condition, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside updateOne qeury");
            return yield this.modelName.updateOne(condition, { $set: payload });
        });
    }
    updateArray(condition, payload, multi = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateOptions = multi ? { multi: true } : {};
            return yield this.modelName.updateMany(condition, payload, updateOptions);
        });
    }
    deleteOne(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.modelName.deleteOne(condition);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.modelName);
            return yield this.modelName.findByIdAndDelete(id);
        });
    }
    updateMany(condition, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.modelName.updateMany(condition, { $set: payload });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.modelName.create(data);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.modelName.findById(id);
        });
    }
    find(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.modelName.find(condition);
        });
    }
    updateStatus(condition, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.modelName.findOneAndUpdate(condition, { $set: { status: payload } }, { new: true });
        });
    }
    remove(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateResult = yield this.modelName
                    .updateOne({ _id: condition }, { $set: { status: 3 } })
                    .exec();
                if (updateResult.modifiedCount && updateResult.modifiedCount > 0) {
                    return { success: true };
                }
                else {
                    return { success: false };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = BaseEntity;
