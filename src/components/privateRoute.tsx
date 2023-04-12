import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { blueGrey } from "@mui/material/colors";

import { useAppContext } from "@/context/context";

import { API_URL } from "@/constants";

type Props = {
  children?: any;
  requireAdmin?: boolean;
};

export const PrivateRoute: FC<Props> = ({ children, requireAdmin }) => {
  const { user, setUser } = useAppContext();
  const router = useRouter();
  const [isCanRender, setIsCanRender] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/auth");
      return;
    }
    if (!requireAdmin) {
      setIsCanRender(true);
      return;
    }
    if (!user) {
      void fetch(API_URL + "/users/me", {
        headers: {
          Authorization: accessToken,
        },
      }).then((result) => {
        if (result.ok) {
          return result.json().then((data) => {
            setUser(data);
          });
        }
        router.push("/auth");
      });
      return;
    }
    if (user.role === "admin") {
      setIsCanRender(true);
      return;
    }
    router.push("/");
  }, [router, requireAdmin, setUser, user]);
  return isCanRender ? (
    children
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        bgcolor: blueGrey[100],
      }}
    >
      <CircularProgress />
    </Box>
  );
};
