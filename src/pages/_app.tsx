import "@/styles/fonts.css";
import "@/styles/globals.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { AppProps } from "next/app";
import { FC } from "react";

const SolariusConnectApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Theme accentColor="pink" panelBackground="translucent">
      <Component {...pageProps} />
    </Theme>
  );
};

export default SolariusConnectApp;
