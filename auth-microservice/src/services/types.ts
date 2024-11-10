export interface RegisterBodyI {
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  username: string;
  password: string;
}

export interface LoginBodyI {
  username: string;
  password: string;
}
