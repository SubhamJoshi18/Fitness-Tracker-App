import { FoodRountineI } from '../controller/types';
import { WeekDayEnum } from '../database/types';
import { DatabaseException } from '../exceptions';
import fitnessLogger from '../libs/logger';
import GeminiApi from '../utils/gemini';
import { getEnvValue } from '../utils/getKey';

class WeekDayService {
  async weeklyFoodRoutine(
    userDetails: any,
    weeklyBody: Required<FoodRountineI>
  ) {
    const weekDayName = weeklyBody.hasOwnProperty('weekDay')
      ? weeklyBody['weekDay']
      : '';

    const isValiWeek = this.validateWeekName(weekDayName as string);

    fitnessLogger.info(`Week Day is valid : ${isValiWeek}`);

    const extractFoodName = weeklyBody.weekDay.map((item: any) => {
      return item.food_name ? item.food_name : '';
    });

    if (extractFoodName.length === 0) {
      throw new DatabaseException(403, 'No Food For this Week Days');
    }

    const geminiInstance = new GeminiApi(getEnvValue('API_KEY'));

    const foodDetails = await geminiInstance.generateFoodDetails(
      extractFoodName[0] as unknown as string
    );
    console.log(foodDetails);
  }

  private validateWeekName = (weekName: string) => {
    let validWeek = [];
    const weeksOfDays = [
      WeekDayEnum.SUNDAY,
      WeekDayEnum.MONDAY,
      WeekDayEnum.TUESDAY,
      WeekDayEnum.WEDNESDAY,
      WeekDayEnum.THURSDAY,
      WeekDayEnum.FRIDAY,
      WeekDayEnum.SATURDAY,
    ];
    for (const weekNames of weeksOfDays) {
      if (weekNames.includes(weekName) && weekName in weeksOfDays) {
        validWeek.push(weekName);
      }
    }
    return validWeek[0];
  };
}

export default new WeekDayService();
