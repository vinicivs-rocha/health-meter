export type UserData = {
  photo: string;
  name: string;
  id: string;
};

export interface AuthenticationGateway {
  getStoredUser(): Promise<UserData | null>;
  signIn(): Promise<UserData>;
  signOut(): Promise<void>;
}
