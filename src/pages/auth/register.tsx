import OuterUI from "@/components/auth-page";
import authorizedRoute from "@/lib/auth";
import fetchJson from "@/lib/fetch";
import { ONE_HUNDRED_TWENTY_DAYS } from "@/lib/time";
import { Anchor, Button, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { setCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import {
  HiOutlineAtSymbol,
  HiOutlineKey,
  HiOutlineUser,
  HiXCircle,
} from "react-icons/hi";
import { z } from "zod";
import { PostRegisterResponse } from "../api/auth/[[...params]]";

const registerSchema = z.object({
  username: z.string().min(3).max(21),
  email: z.string().email(),
  password: z.string().min(8).max(256),
  repeatPassword: z.string().min(8).max(256),
});

const Login: FC = () => {
  const form = useForm({
    validate: zodResolver(registerSchema),
    initialValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });
  const router = useRouter();

  return (
    <OuterUI
      description={
        <span className="flex flex-col gap-2">
          Create a Solarius Connect account to manage everything related to
          Solarius.{" "}
          <Anchor href="/auth/login" component={Link}>
            Have an account? Log in
          </Anchor>
        </span>
      }
    >
      <form
        onSubmit={form.onSubmit(async (values) => {
          if (values.password !== values.repeatPassword)
            return form.setFieldError(
              "repeatPassword",
              "Passwords do not match"
            );

          const { repeatPassword, ...rest } = values;

          await fetchJson<PostRegisterResponse>("/api/auth/register", {
            method: "POST",
            body: rest,
          }).then((res) => {
            if (res.success) {
              setCookie(".solarius", res.data!.token, {
                expires: new Date(Date.now() + ONE_HUNDRED_TWENTY_DAYS),
              });
              router.push("/");
            } else {
              showNotification({
                title: "Error",
                icon: <HiXCircle />,
                color: "red",
                message:
                  res.message || "An unknown server-side error occurred.",
              });
            }
          });
        })}
      >
        <Stack gap={12}>
          <TextInput
            label="Username"
            placeholder="Create a username"
            description="Your unique username to identify yourself with."
            required
            leftSection={<HiOutlineUser />}
            {...form.getInputProps("username")}
          />
          <TextInput
            label="Email"
            placeholder="Enter your email address"
            description="Your email address to receive important notifications."
            required
            leftSection={<HiOutlineAtSymbol />}
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            description="Your password to keep your account secure."
            required
            leftSection={<HiOutlineKey />}
            {...form.getInputProps("password")}
          />
          <TextInput
            label="Confirm password"
            type="password"
            placeholder="Confirm your password"
            description="Confirm your password to make sure you typed it correctly."
            required
            leftSection={<HiOutlineKey />}
            {...form.getInputProps("repeatPassword")}
          />
        </Stack>
        <Button fullWidth className="mt-6" type="submit">
          Register
        </Button>
      </form>
    </OuterUI>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  await authorizedRoute(ctx, {
    unauthedRedirect: false,
    authedRedirect: true,
  });

export default Login;
