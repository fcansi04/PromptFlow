"use client";

import { SessionProvider } from "@node_modules/next-auth/react";

const Provider = ({ children, userSession }) => {
  return <SessionProvider session={userSession}>{children}</SessionProvider>;
};

export default Provider;
