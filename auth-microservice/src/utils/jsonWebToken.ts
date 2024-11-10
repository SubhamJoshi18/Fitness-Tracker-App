import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { getEnvValue } from './getKey';
import { date, string } from 'zod';
import { resolve } from 'path';

class JwtUtils {
  async createAccessToken(tokenData: any) {
    const option = {
      expiresIn: '1h',
      issuer: 'Shubham',
    };
    const secretKey = getEnvValue('SECRET');
    const payload = JSON.parse(JSON.stringify(tokenData));
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        secretKey,
        option,
        (err: JsonWebTokenError | Error, token: string) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  }
}

export default new JwtUtils();
