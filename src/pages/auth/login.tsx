import OuterUI from "@/components/auth-page";
import authorizedRoute from "@/lib/auth";
import fetchJson from "@/lib/fetch";
import { ONE_HUNDRED_TWENTY_DAYS } from "@/lib/time";
import { Anchor, Button, Checkbox, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { setCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { HiOutlineAtSymbol, HiOutlineKey, HiXCircle } from "react-icons/hi";
import { z } from "zod";
import { PostLoginResponse } from "../api/auth/[[...params]]";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(256),
});

const Login: FC = () => {
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  return (
    <OuterUI
      description={
        <span className="flex flex-col gap-2">
          Log in to your Solarius Connect account to manage your Solarius
          information.{" "}
          <Anchor href="/auth/register" component={Link}>
            Don't have an account? Sign up
          </Anchor>
        </span>
      }
    >
      <form
        onSubmit={form.onSubmit(async (values) => {
          await fetchJson<PostLoginResponse>("/api/auth/login", {
            method: "POST",
            body: values,
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
            label="Email"
            placeholder="Enter your email address"
            required
            leftSection={<HiOutlineAtSymbol />}
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
            leftSection={<HiOutlineKey />}
            {...form.getInputProps("password")}
          />
        </Stack>
        <div className="flex mt-4 justify-between items-center">
          <Checkbox label="Remember me" />
          <Anchor size="sm" component={Link} href="/auth/reset-password">
            Forgot your password?
          </Anchor>
        </div>
        <Button fullWidth className="mt-6" type="submit">
          Sign in
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
