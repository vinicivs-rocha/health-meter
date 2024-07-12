import { Supervised } from "@/domain/enterprise/entities/supervised";

export interface AuthenticationPresenter {
  presentError(message: string): Promise<void>;
  presentUnauthenticated(): Promise<void>;
  presentAuthenticated(userData: Supervised): Promise<void>;
}
