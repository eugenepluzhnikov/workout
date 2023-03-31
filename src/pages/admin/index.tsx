import { useState } from "react";

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { blueGrey } from "@mui/material/colors";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

export default function BasicStack() {
  const [count, setCount] = useState(true);
  return (
    <Box
      component="form"
      sx={{
        height: "100vh",
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
          id="demo-helper-text-aligned"
          label="Login"
        />
        <TextField
          helperText="Please enter your password"
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        {count === false && (
          <>
            <TextField
              helperText="Please enter your name"
              id="demo-helper-text-aligned"
              label="Name"
            />
            <Button variant="contained" disableElevation>
              Register
            </Button>
          </>
        )}
        {count === true && (
          <>
            <Button variant="contained" disableElevation>
              Log in
            </Button>

            <Link href="#" onClick={() => setCount(false)}>
              {"Register"}
            </Link>
          </>
        )}
      </Stack>
    </Box>
  );
}
