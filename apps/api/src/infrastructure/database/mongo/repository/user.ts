import { injectable } from "inversify";
import BaseRepository from "./base-repository.js";
import { UserModel, type UserDocument } from "../model/user.js";

@injectable()
export class UserRepository extends BaseRepository<UserDocument> {
    // constructor() {
    // super(this.model);
    //}
    model = UserModel;

}

