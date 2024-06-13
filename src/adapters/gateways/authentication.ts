import {
  AuthenticationGateway,
  UserData,
} from "@/domain/application/gateways/authentication";
import { SupabaseClient } from "@supabase/supabase-js";
import { inject, injectable } from "inversify";

@injectable()
export class SupabaseAuthenticationGateway implements AuthenticationGateway {
  @inject("SupabaseClient") private readonly supabase!: SupabaseClient;
  async getStoredUser(): Promise<UserData | null> {
    const { data, error } = await this.supabase.auth.getSession();

    if (error) {
      throw error;
    }

    console.log(data, data.session);

    return (data.session as unknown as UserData) ?? null;
  }
  signIn(): Promise<UserData> {
    throw new Error("Method not implemented.");
  }
  signOut(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
