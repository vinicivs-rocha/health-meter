import type { UserData } from "../gateways/authentication";

export interface AuthenticationPresenter {
  presentError(message: string): Promise<void>;
  presentUnauthenticated(): Promise<void>;
  presentAuthenticated(userData: UserData): Promise<void>;
}
