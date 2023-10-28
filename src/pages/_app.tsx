import components from "@/lib/components";
import "@/styles/fonts.css";
import "@/styles/globals.css";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import type { AppProps } from "next/app";
import { FC } from "react";

const theme = createTheme({
  fontFamily: "Inter var",
  defaultRadius: "md",
  components: components,
});

const SolariusConnectApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <MantineProvider
      theme={theme}
      forceColorScheme="light"
      defaultColorScheme="light"
    >
      <Notifications position="top-center" />
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default SolariusConnectApp;
