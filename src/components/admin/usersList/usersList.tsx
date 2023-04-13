import { FC } from "react";

import type { User } from "@/types/user";

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

import { API_URL } from "@/constants";

type Props = {
  users: User[];
  setUsers: (users: User[]) => void;
  setEditingUser: (user: User | null) => void;
};

export const UsersList: FC<Props> = ({ users, setUsers, setEditingUser }) => {
  const deleteUser = async (id: string) => {
    const accessToken = localStorage.getItem("accessToken");

    const result = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken as string,
      },
    });

    if (!result.ok) return;

    const newUsers = [...users].filter((user) => user.id !== id);
    setUsers(newUsers);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead
          style={{
            backgroundColor: "#e0e0e0",
          }}
        >
          <TableRow>
            <TableCell align="left"> ID</TableCell>
            <TableCell align="left">NAME</TableCell>
            <TableCell align="left">USERNAME</TableCell>
            <TableCell align="left">ROLE</TableCell>
            <TableCell align="center">ACTIONS</TableCell>
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
              <TableCell align="right" padding="normal">
                <Stack direction="row" spacing={1} justifyContent="center">
                  <IconButton onClick={() => setEditingUser(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
