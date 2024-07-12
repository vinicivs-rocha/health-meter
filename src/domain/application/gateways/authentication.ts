export interface AuthenticationGateway {
  signIn(): Promise<void>;
  signOut(): Promise<void>;
}
