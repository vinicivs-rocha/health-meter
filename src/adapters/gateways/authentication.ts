import { AuthenticationGateway } from "@/domain/application/gateways/authentication";
import { supabase } from "@/utils/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { SupabaseClient } from "@supabase/supabase-js";
import { inject, injectable } from "inversify";

@injectable()
export class SupabaseAuthenticationGateway implements AuthenticationGateway {
  @inject("SupabaseClient") private readonly supabase!: SupabaseClient;

  async signIn(): Promise<void> {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo);

      if (!userInfo.idToken) throw new Error("no ID token present!");

      const { error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: userInfo.idToken,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error while signing in", error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  async isAuthenticated(): Promise<boolean> {
    const { data, error } = await this.supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return data.session !== null;
  }
}
