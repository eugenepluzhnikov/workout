import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

type Props = {
  children?: any;
};

export const PrivateRoute: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [isCanRender, setIsCanRender] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      router.push("/auth");
    } else {
      setIsCanRender(true);
    }
  }, [router]);
  return isCanRender ? children : null;
};
