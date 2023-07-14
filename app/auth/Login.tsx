"use client";

import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <li className="list-none">
      <button
        className="text-sm bg-cyan-300 text-gray-950 py-2 px-6 rounded-xl disabled:opacity-25 hover:bg-cyan-600"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </li>
  );
};

export default Login;
