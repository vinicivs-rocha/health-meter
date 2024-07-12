export interface AuthenticationGateway {
  signIn(): Promise<void>;
  signOut(): Promise<void>;
  isAuthenticated(): Promise<boolean>;
}
