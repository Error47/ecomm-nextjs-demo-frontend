import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import { MAGIC_PUBLIC_KEY } from "../utils/urls";

const AuthContext = createContext();

let magic;
export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  /**
   * Adds email to user
   * @param {string} email
   */
  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      setUser({ email });
      router.push("/");
    } catch (err) {
      setUser(null);
    }
  };

  /**
   * Remove email from user
   */
  const logoutUser = async () => {
    try {
      await magic.user.logout();
      setUser(null);
      router.push("/");
    } catch (err) {}
  };
  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata();
        setUser({ email });
      }
    } catch (err) {}
  };
  const value = { user, loginUser, logoutUser };

  useEffect(() => {
    magic = new Magic(MAGIC_PUBLIC_KEY);
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
