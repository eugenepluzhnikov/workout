import { PrivateRoute } from "@/components/privateRoute";
import { useState, useEffect } from "react";

import type { User } from "@/types/user";

import { API_URL } from "@/constants";

import { blueGrey } from "@mui/material/colors";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getListOfUsers = async () => {
      const accessToken = localStorage.getItem("accessToken");

      const result = await fetch(API_URL + "/users", {
        headers: {
          Authorization: accessToken as string,
        },
      });
      if (!result.ok) return;
      const usersJson = (await result.json()) as User[];
      setUsers(usersJson);
    };
    getListOfUsers();
  }, []);
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>USERNAME</TableCell>
                <TableCell>ROLE</TableCell>
                <TableCell align="right">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </PrivateRoute>
  );
}
