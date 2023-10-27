import Divider from "@/components/divider";
import MeshBg from "@/components/mesh-bg";
import clsx from "@/lib/clsx";
import { Button, Card, Heading, TextField } from "@radix-ui/themes";
import { FC, useState } from "react";

type LoginOptions = "email" | "username";

const Login: FC = () => {
  const [type, setType] = useState<LoginOptions | null>(null);

  return (
    <>
      <MeshBg />
      <div
        className={clsx("flex items-center flex-col justify-center h-screen")}
      >
        <Card className="max-w-[480px] w-full px-8 py-6" variant="classic">
          <Heading size="4" className="text-dimmed">
            Solarius Connect
          </Heading>
          <Heading className="pt-2">Login to your account</Heading>
          <p className="text-sm text-gray-600 text-dimmed mt-4 gap-2 flex">
            Don't have an account?{" "}
            <Button variant="ghost" size="2">
              Create one
            </Button>
          </p>
          <Divider className="mb-8 mt-4" />
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-600">Email or username</p>
              <TextField.Input size="2" placeholder="hi@solarius.me" />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <p className="text-sm text-gray-600">Password</p>
              <TextField.Input
                type="password"
                placeholder="Password"
                size="2"
              />
            </div>
            <div className="flex justify-end items-center gap-6">
              <Button variant="ghost" size="3">
                Forgot password
              </Button>
              <Button variant="soft" size="3">
                Login
              </Button>
            </div>
          </form>
        </Card>
        <p className="text-dimmed text-sm px-8 py-4 md:mt-4 mt-2 text-center">
          Copyright © Solarius B.V. 2021-2023. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Login;
