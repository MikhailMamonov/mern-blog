import { UserViewModel } from "./UserViewModel";

export type AuthViewModel = {
  token: string;
  user: UserViewModel;
  message: string;
};
