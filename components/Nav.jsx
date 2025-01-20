"use client";

//Link and Image must be imported from next
import Link from "@node_modules/next/link";
import Image from "@node_modules/next/image";

//useRouter is for routing dynamicly. router=useRouter(); router.push("/")
import { useRouter } from "@node_modules/next/navigation";

import { useState, useEffect } from "react";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const [providers, setProviders] = useState(null);

  //mobile nav button. when you click it should show the navigations togglingdown.
  const [toggleDroppDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3 ">
      <Link href="/" className=" gap-2 flex-center">
        <Image
          width={30}
          height={30}
          priority
          alt="PromptFlow-logo"
          src="/assets/images/world-logo.png"
          className="bg-white h-auto"
        />
        <h2 className="max-sm:hidden text-xl font-bold font-satoshi">
          PromptFlow
        </h2>
      </Link>
      <div className="sm:flex hidden">
        {status === "loading" ? (
          <div className="font-bold">Loading...</div>
        ) : session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>

      <div className="max-sm:flex hidden relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full cursor-pointer"
              alt="profile"
              onClick={() => {
                setToggleDropDown((prev) => !prev);
              }}
            />
            {toggleDroppDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(False)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(False)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
