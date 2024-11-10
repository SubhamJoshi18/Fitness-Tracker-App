import userModel from '../database/schemas/user.schema';
import { DatabaseException, ValidationException } from '../exceptions';
import { LoginBodyI, RegisterBodyI } from './types';
import AuthRepo from '../repository/auth.repo';
import BcryptUtils from '../utils/bcrypt';
import JwtUtils from '../utils/jsonWebToken';

abstract class AuthServiceAbs {
  abstract registerService(validData: Required<RegisterBodyI>): Promise<any>;
}

class AuthService extends AuthServiceAbs {
  public async registerService(
    validData: Required<RegisterBodyI>
  ): Promise<any> {
    let isValueNull: number = 0;

    const queryDatas = await Promise.allSettled([
      await userModel.findOne({
        username: validData.username,
      }),

      await userModel.findOne({
        email: validData.email,
      }),
    ]);

    for (const item of queryDatas) {
      if (item['status'] && 'status' in item) {
        if (item['value']) {
          isValueNull += 1;
        } else {
          break;
        }
      }
    }

    if (isValueNull && !isValueNull.toString().startsWith('0')) {
      throw new DatabaseException(
        403,
        'Username or Email is already Registered'
      );
    }

    const saveData = await AuthRepo.registerDatasMongo(
      validData as RegisterBodyI
    );

    return saveData;
  }

  public async loginService(data: Required<LoginBodyI>) {
    const isUser = await userModel.findOne({
      username: data.username,
    });

    if (!isUser) {
      throw new DatabaseException(403, 'Username Does Not Match');
    }

    const isPasswordValid = await BcryptUtils.comparePassword(
      isUser.password,
      data.password
    );
    if (typeof isPasswordValid === 'boolean' && !isPasswordValid) {
      throw new DatabaseException(404, 'Password Does not Match');
    }
    const payloadToken = {
      ...isUser,
    };

    if (payloadToken['password'] || payloadToken.hasOwnProperty('password')) {
      delete payloadToken['password'];
    }

    const accessToken = await JwtUtils.createAccessToken(payloadToken);
    return {
      accessToken,
      username: data.username,
      email: isUser.email,
    };
  }
}

export default new AuthService();
