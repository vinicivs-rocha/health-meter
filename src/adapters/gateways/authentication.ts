import {
  AuthenticationGateway,
  UserData,
} from "@/domain/application/gateways/authentication";
import { SupabaseClient } from "@supabase/supabase-js";
import { inject } from "inversify";

export class SupabaseAuthenticationGateway implements AuthenticationGateway {
  constructor(
    @inject("SupabaseClient") private readonly supabase: SupabaseClient
  ) {}
  async getStoredUser(): Promise<UserData | null> {
    const { data, error } = await this.supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return (data.session as unknown as UserData) ?? null;
  }
  signIn(data: { email: string; password?: string }): Promise<UserData> {
    throw new Error("Method not implemented.");
  }
  signOut(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
