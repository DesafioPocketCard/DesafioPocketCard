import { IUser } from "../Auth";

declare module "next-auth" {
  interface Session {
    user: IUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: IUser;
  }
}
