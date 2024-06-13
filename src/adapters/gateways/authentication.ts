import {
  AuthenticationGateway,
  UserData,
} from "@/domain/application/gateways/authentication";
import { supabase } from "@/utils/supabase";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
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
  async signIn(): Promise<UserData> {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    if (userInfo.idToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: userInfo.idToken,
      });
      console.log(error, data);
      return data as unknown as UserData;
    }

    throw new Error("no ID token present!");
  }

  signOut(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
