import { PrivateRoute } from "@/components/privateRoute";
import { useState } from "react";

import { blueGrey } from "@mui/material/colors";


import { Box, Button } from "@mui/material";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [isLogin, setIsLoading] = useState(true);
  return (
    <PrivateRoute requireAdmin={true}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          bgcolor: blueGrey[100],
        }}
      >
        <Button variant="contained">Hello World</Button>
      </Box>
    </PrivateRoute>
  );
}
