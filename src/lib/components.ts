import { Button } from "@mantine/core";

const components = {
  Button: Button.extend({
    styles: (theme, props) => ({
      root: {
        ...(!props.variant && {
          border: "1px solid",
          borderColor:
            theme.colors[props.color || theme.primaryColor][9] + "50",
          "&:hover": {
            borderColor:
              theme.colors[props.color || theme.primaryColor][9] + "50",
          },
          boxShadow: "inset 0 1.2px 0 0 hsla(0,0%,100%,.2)",
        }),
        ...(props.variant === "light" && {
          border: "1px solid",
          borderColor:
            theme.colors[props.color || theme.primaryColor][9] + "15",
          "&:hover": {
            borderColor:
              theme.colors[props.color || theme.primaryColor][9] + "20",
          },
        }),
      },
    }),
  }),
};

export default components;
