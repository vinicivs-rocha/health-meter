export type UserData = {
  photo: string;
  name: string;
  id: string;
};

export interface AuthenticationGateway {
  getStoredUser(): Promise<UserData | null>;
  signIn(data: { email: string; password?: string }): Promise<UserData>;
  signOut(): Promise<void>;
}
