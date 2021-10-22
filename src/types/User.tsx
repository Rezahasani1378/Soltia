export interface LoginInput {
  usernameOrEmail: string;
  password: UserFulfilled['password'];
}

export interface UserFulfilled {
  refresh: string;
  access: string;
  id: number;
  username: string;
  email: string;
  full_name: string;
  message: string;
  password?: string;
  accessibility: 'premium' | 'primary' | 'stuff' | '';
}

export type UserResponse = { data: UserFulfilled } & { isLoading: boolean } & {
  error: string;
};
