import {
  AuthenticationGateway,
  UserData,
} from "@/domain/application/gateways/authentication";
import { supabase } from "@/utils/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { SupabaseClient } from "@supabase/supabase-js";
import { inject, injectable } from "inversify";

@injectable()
export class SupabaseAuthenticationGateway implements AuthenticationGateway {
  @inject("SupabaseClient") private readonly supabase!: SupabaseClient;
  async getStoredUser(): Promise<UserData | null> {
    const {
      data: { session },
      error,
    } = await this.supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return (
      session && {
        photo: session.user.user_metadata.avatar_url,
        name: session.user.user_metadata.name,
        id: session.user.id,
      }
    );
  }

  async signIn(): Promise<UserData> {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    if (userInfo.idToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: userInfo.idToken,
      });

      const { photo, id, name } = userInfo.user;
      return {
        id,
        photo: photo!,
        name: name!,
      };
    }
    throw new Error("no ID token present!");
  }

  signOut(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
