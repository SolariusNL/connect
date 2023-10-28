import IResponseBase from "@/types/response";
import { showNotification } from "@mantine/notifications";
import { deleteCookie } from "cookies-next";
import { HiXCircle } from "react-icons/hi";
import fetchJson from "./fetch";

const logout = async () => {
  await fetchJson<IResponseBase>("/api/auth/logout", {
    method: "POST",
    auth: true,
  }).then((res) => {
    if (res.success) {
      deleteCookie(".solarius");
    } else {
      showNotification({
        title: "Error",
        message: res.message ?? "An unknown error occurred",
        icon: HiXCircle,
        color: "red",
      });
    }
  });
};

export default logout;
