import OuterUI from "@/components/auth-page";
import authorizedRoute from "@/lib/auth";
import clsx from "@/lib/clsx";
import { Anchor, Box, Button, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { FC } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

const Login: FC = () => {
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: "",
    },
  });

  return (
    <OuterUI description="Enter your email address to receive a password reset link.">
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}
      >
        <TextInput
          label="Your email"
          placeholder="me@solarius.me"
          required
          {...form.getInputProps("email")}
        />
        <div
          className={clsx(
            "mt-4 items-center w-full",
            "flex md:flex-row gap-4 flex-col-reverse justify-between"
          )}
        >
          <Anchor c="dimmed" size="sm" component={Link} href="/auth/login">
            <div className="flex items-center gap-2">
              <HiArrowLeft className="flex-shrink-0" />
              <Box ml={5}>Back to login page</Box>
            </div>
          </Anchor>
          <Button type="submit" className="md:!w-fit !w-full">
            Reset password
          </Button>
        </div>
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
