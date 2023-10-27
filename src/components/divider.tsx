import clsx from "@/lib/clsx";
import { FC } from "react";

type DividerProps = React.ComponentProps<"div">;

const Divider: FC<DividerProps> = (props) => {
  return (
    <div
      {...props}
      className={clsx("w-full border-b border-neutral-100", props.className)}
    />
  );
};

export default Divider;
