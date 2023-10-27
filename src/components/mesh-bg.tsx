import Background from "@/assets/background.png";
import { FC } from "react";

const MeshBg: FC = () => {
  return (
    <span
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top right",
        backgroundAttachment: "fixed",
        backgroundImage: `url(${Background.src})`,
      }}
      className="fixed inset-0"
    />
  );
};

export default MeshBg;
