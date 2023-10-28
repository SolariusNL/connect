import { Session, User } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import prisma from "./prisma";

type AuthorizedRouteConfig = {
  unauthedRedirect?: boolean;
  authedRedirect?: boolean;
};

const authorizedRoute = async (
  context: GetServerSidePropsContext,
  {
    unauthedRedirect = false,
    authedRedirect = false,
  }: AuthorizedRouteConfig = {},
  ...props: any[]
) => {
  const token = context.req.cookies[".solarius"];

  if (token === undefined) {
    if (unauthedRedirect) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    } else {
      return {
        props: { ...props },
      };
    }
  }

  let account = await getAccountFromSession(token);
  const isAuthorized = !!account;

  switch (isAuthorized) {
    case true:
      if (authedRedirect) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      } else {
        return {
          props: {
            user: {
              ...account,
            },
          },
        };
      }
    case false:
      if (unauthedRedirect) {
        return {
          redirect: {
            destination: "/auth/login",
            permanent: false,
          },
        };
      } else {
        return { props: {} };
      }
  }
};

async function verifySession(token: string): Promise<Session | undefined> {
  const session = JSON.parse(
    JSON.stringify(
      await prisma.session.findFirst({
        where: {
          token,
        },
      })
    )
  );

  if (!session) {
    return undefined;
  }

  return session;
}

export async function getAccountFromSession(
  token: string
): Promise<User | undefined> {
  const session = await verifySession(token);

  if (!session || !session.userId) {
    return undefined;
  }

  const account = JSON.parse(
    JSON.stringify(
      await prisma.user.findFirst({
        where: {
          id: session.userId,
        },
      })
    )
  );

  if (!account) {
    return undefined;
  }

  return account;
}

export default authorizedRoute;
