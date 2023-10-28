import { compareData, hashData } from "@/lib/hash";
import prisma from "@/lib/prisma";
import { getOperatingSystem } from "@/lib/ua";
import IResponseBase from "@/types/response";
import { OperatingSystem } from "@prisma/client";
import {
  Body,
  Post,
  Request,
  createHandler,
} from "@solariusnl/next-api-decorators";
import type { NextApiRequest } from "next";
import { getClientIp } from "request-ip";
import { v4 } from "uuid";
import { z } from "zod";

type SystemInformation = {
  ip: string;
  agent: string;
  os: OperatingSystem;
};

const getSystemInformation = (req: NextApiRequest): SystemInformation => {
  const ip = getClientIp(req);
  const agent = req.headers["user-agent"];
  const os =
    OperatingSystem[
      getOperatingSystem(String(agent)) as keyof typeof OperatingSystem
    ];

  return {
    ip: ip || "unknown",
    agent: agent || "unknown",
    os: os || OperatingSystem.OTHER,
  };
};

const registerSchema = z
  .object({
    username: z.string().min(3).max(21),
    email: z.string().email(),
    password: z.string().min(8).max(256),
  })
  .strict();
const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(256),
  })
  .strict();

export type PostRegisterResponse = IResponseBase<{
  token: string;
}>;
export type PostLoginResponse = IResponseBase<{
  token: string;
}>;

class AuthRouter {
  @Post("/register")
  public async register(@Request() req: NextApiRequest, @Body() body: unknown) {
    const validatedBody = registerSchema.parse(body);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: {
              equals: validatedBody.username,
              mode: "insensitive",
            },
          },
          {
            email: {
              equals: validatedBody.email,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    if (existingUser)
      return <PostRegisterResponse>{
        success: false,
        message: "Username or email already in use",
      };

    const user = await prisma.user.create({
      data: {
        username: validatedBody.username,
        email: validatedBody.email,
        passwordHash: await hashData(validatedBody.password),
      },
    });
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        token: v4(),
        ...getSystemInformation(req),
      },
    });

    return <PostRegisterResponse>{
      success: true,
      data: {
        token: session.token,
      },
    };
  }

  @Post("/login")
  public async login(@Request() req: NextApiRequest, @Body() body: unknown) {
    const validatedBody = loginSchema.parse(body);

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: validatedBody.email,
          mode: "insensitive",
        },
      },
    });

    if (!user)
      return <PostLoginResponse>{
        success: false,
        message: "User not found",
      };

    const passwordMatches = await compareData(
      validatedBody.password,
      user.passwordHash
    );

    if (!passwordMatches)
      return <PostLoginResponse>{
        success: false,
        message: "Incorrect password",
      };

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        token: v4(),
        ...getSystemInformation(req),
      },
    });

    return <PostLoginResponse>{
      success: true,
      data: {
        token: session.token,
      },
    };
  }

  @Post("/logout")
  public async logout(@Request() request: NextApiRequest) {
    const { authorization } = request.headers;

    await prisma.session.delete({
      where: {
        token: String(authorization),
      },
    });

    return <IResponseBase>{
      success: true,
    };
  }
}

export default createHandler(AuthRouter);
