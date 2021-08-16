import Head from "next/head";
import { useContext } from "react";
import Link from "next/link";
import AuthContext from "../context/AuthContext";

export default function Account() {
  const { user, logoutUser } = useContext(AuthContext);

  if (!user)
    return (
      <div>
        <p>Please login/register.</p>
        <Link href="/">
          <a>Go Back</a>
        </Link>
      </div>
    );

  return (
    <div>
      <Head>
        <title>Account Page</title>
        <meta
          name="description"
          content="The account page, view your orders and logout"
        />
      </Head>
      <h2>Account Page</h2>
      <p>Logged in as: {user.email}</p>
      <a href="#" onClick={logoutUser}>
        Logout
      </a>
    </div>
  );
}
