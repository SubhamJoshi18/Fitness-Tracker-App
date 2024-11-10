import dotenv from 'dotenv';
import fitnessLogger from '../libs/logger';
dotenv.config();

const checkValidKey = (key: string) => {
  let validKey = false;
  if (process.env[key] && process.env.hasOwnProperty(key as string)) {
    validKey = true;
  }
  return validKey;
};

export const getEnvValue = (key: string) => {
  if (!checkValidKey(key)) {
    fitnessLogger.error(`${key} you provided does not exists in .env`);
    process.exit(1);
  }

  return process.env[key] ?? process.env?.key;
};
