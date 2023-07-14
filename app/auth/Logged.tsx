"use client";

import Image, { StaticImageData } from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

type User = {
  image: string | StaticImageData;
};

const Logged = ({ image }: User) => {
  return (
    <li className="flex gap-8 items-center">
      <button
        className="text-sm bg-cyan-300 text-gray-950 py-2 px-6 rounded-xl disabled:opacity-25 hover:bg-cyan-600"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
      <Link href={"/dashboard"} title="User Dashboard">
        <Image
          width={64}
          height={64}
          src={image}
          alt="user image"
          priority
          className="w-14 rounded-full hover:shadow hover:shadow-cyan-300"
        />
      </Link>
    </li>
  );
};

export default Logged;
