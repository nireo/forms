export interface User {
  id: number;
  username: string;
}

export interface UserAction {
  username: string;
  password: string;
}

export interface UserWithToken {
  token: string;
  user: User;
}
