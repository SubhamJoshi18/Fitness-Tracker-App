import { DatabaseException } from '../exceptions';
import { RegisterBodyI } from '../services/types';
import userModel from '../database/schemas/user.schema';
import BcryptUtils from '../utils/bcrypt';

class AuthRepo {
  async registerDatasMongo(data: RegisterBodyI) {
    try {
      const hashPassword = await BcryptUtils.hashPassword(data.password);
      console.log('This is the hash password', hashPassword);
      const userData = new userModel({
        password: hashPassword,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        age: data.age,
        username: data.username,
      });
      console.log('This is the userdata', userData);
      return await userData.save();
    } catch (err) {
      throw new DatabaseException(403, err);
    }
  }
}

export default new AuthRepo();
