import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { blueGrey } from "@mui/material/colors";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log(username, password);
  };
  const register = () => {
    console.log(username, password, name);
  };

  return (
    <Box
      component="form"
      sx={{
        height: "100%",
        margin: 0,
        padding: 3,
        bgcolor: blueGrey[100],
      }}
    >
      <Stack justifyContent="center" alignItems="center" spacing={1}>
        <h1
          style={{
            marginTop: 30,
            marginBottom: 70,
            color: "#1565c0",
          }}
        >
          Your workouts for the week
        </h1>
        <TextField
          helperText="Please enter your login"
          label="Login"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <TextField
          helperText="Please enter your password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        {!isLogin && (
          <>
            <TextField
              helperText="Please enter your name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
            />
            <Button variant="contained" disableElevation onClick={register}>
              Register
            </Button>
          </>
        )}
        {isLogin && (
          <Button variant="contained" disableElevation onClick={login}>
            Log in
          </Button>
        )}
        <Link onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "register" : "login"}
        </Link>
      </Stack>
    </Box>
  );
}
