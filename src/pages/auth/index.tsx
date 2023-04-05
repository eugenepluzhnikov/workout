import { useState, version } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { blueGrey } from "@mui/material/colors";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { API_URL } from "@/constants";

import { useAppContext } from "@/context/context";

export default function Auth() {
  const router = useRouter();
  const { setUser } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let activeUsernameError = false;
    if (username.length < 3) {
      activeUsernameError = true;
    }
    setIsUsernameError(activeUsernameError);

    let activePasswordError = false;
    if (
      password === "" ||
      !/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/.test(password)
    ) {
      activePasswordError = true;
    }
    setIsPasswordError(activePasswordError);

    let activeNameError = false;
    if (!isLogin && !/^[a-zA-Z]+$/.test(name)) {
      activeNameError = true;
    }
    setIsNameError(activeNameError);

    console.log(activeNameError, activePasswordError, activeUsernameError);
    return !(activeNameError || activePasswordError || activeUsernameError);
  };

  const login = async () => {
    if (!validate()) return;
    setIsLoading(true);
    const result = await fetch(API_URL + "/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const json = await result.json();
    console.log(json);
    if (result.ok) {
      localStorage.setItem("accessToken", json.accessToken);
      setUser(json.user);
      router.push("/");
    } else {
      alert(json.error);
    }
    setIsLoading(false);
  };

  const register = async () => {
    if (!validate()) return;
    setIsLoading(true);
    const result = await fetch(API_URL + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        name,
      }),
    });
    const json = await result.json();
    console.log(json);
    if (result.ok) {
      alert("Success. You can now login with your username and password");
      setIsLogin(true);
    } else {
      alert(json.error);
    }
    setIsLoading(false);
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
      <Stack
        justifyContent="center"
        margin={"0 auto"}
        width={400}
        alignItems="center"
        spacing={1}
      >
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
          fullWidth={true}
          error={isUsernameError}
          helperText={isUsernameError && "The length of login > 2 characters"}
          label="Login"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <TextField
          fullWidth={true}
          error={isPasswordError}
          helperText={
            isPasswordError &&
            `The length of password > 5 alphanumeric characters`
          }
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        {!isLogin && (
          <>
            <TextField
              fullWidth={true}
              error={isNameError}
              helperText={isNameError && "Name must be > 0 letters "}
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
            />
            <Button variant="contained" onClick={register}>
              Register
            </Button>
          </>
        )}
        {isLogin && (
          <Button variant="contained" onClick={login} disabled={isLoading}>
            {isLoading ? <CircularProgress /> : "Log in"}
          </Button>
        )}
        <Link onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "register" : "login"}
        </Link>
      </Stack>
    </Box>
  );
}
