import { connectToFitnessDB } from '../../database/connect';
import userModel from '../../database/schemas/user.schema';
import fitnessLogger from '../../libs/logger';

export const processMessage = async (messageContent: string) => {
  await connectToFitnessDB();
  const parseContent = JSON.parse(messageContent);
  console.log(`Processing message`, parseContent);

  const userId = parseContent['user_id'];

  const isUser = await userModel.findOne({
    _id: userId,
  });

  if (!isUser) {
    fitnessLogger.error(`Error fetching the User from the Mongo`);
    process.exit(1);
  }

  await storeIfUserExists(parseContent, isUser);

  await new Promise((resolve) => setTimeout(resolve, 1000));
};

const storeIfUserExists = async (payloadUser: any, isUser: any) => {
  if (Object.entries(payloadUser).length > 0) {
    const workoutExists = checkIfWorkoutExists(isUser);

    if (!workoutExists) {
      return;
    }

    if (payloadUser.hasOwnProperty('user_id')) {
      delete payloadUser['user_id'];
    }

    isUser.workoutDetails = payloadUser;

    await isUser.save();

    fitnessLogger.info(`Data Saved for ${isUser._id}`);

    return true;
  }

  return;
};

const checkIfWorkoutExists = (isUser: any) => {
  if (isUser.workoutDetails) {
    fitnessLogger.info(`Workout Detail Already Exists, Please Update it`);
    return false;
  }
  return true;
};
