import { useState, version } from "react";
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

  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const validate = () => {
    // проверили все 3 поля

    if (username.length < 3) {
      setIsUsernameError(true);
    } else {
      setIsUsernameError(false);
    }

    if (
      password === "" ||
      !/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/.test(password)
    ) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }

    if (!(/^[a-zA-Z]+$/.test(name))) {
      setIsNameError(true);
    } else {
      setIsNameError(false);
    }
    // -----------------
    return !(isPasswordError || isNameError || isUsernameError);
  };

  const login = () => {
    if (!validate()) return;
    console.log(username, password);
  };

  const register = () => {
    if (!validate()) return;
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
          error={isUsernameError}
          helperText="Please enter your login"
          label="Login"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <TextField
          error={isPasswordError}
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
              error={isNameError}
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
