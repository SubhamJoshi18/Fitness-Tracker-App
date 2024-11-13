export enum workoutTypeEnum {
  Cardio = 'Cardio',
  Strength = 'Strength',
  Flexibility = 'Flexibility',
}

export enum ReviewRatingEnum {
  one = 1,
  two = 2,
  three = 3,
  four = 4,
  five = 5,
}

export interface CreateBlogI {
  title: string;
  description: string;
  workoutType: workoutTypeEnum;
}
