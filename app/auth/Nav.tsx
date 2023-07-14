import Link from "next/link";
import Login from "./Login";
import Logged from "./Logged";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import defaultImage from "/public/images/defaultUserImage.jpg";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex justify-between items-center px-4 lg:px-48 py-8 bg-zinc-900 border-b-2 border-white border-solid">
      <Link href="/" title="Home">
        <h4 className="text-purple-600 text-4xl font-bold tracking-wider hover:text-shadow-lg hover:text-shadow-cyan-300">
          Cocktails
        </h4>
      </Link>
      <ul>
        {!session?.user && <Login />}
        {session?.user && (
          <Logged image={session.user?.image || defaultImage} />
        )}
      </ul>
    </nav>
  );
}
