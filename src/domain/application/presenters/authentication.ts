export interface AuthenticationPresenter {
  presentError(message: string): Promise<void>;
  presentUnauthenticated(): Promise<void>;
  presentAuthenticated(): Promise<void>;
}
