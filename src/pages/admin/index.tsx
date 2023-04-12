import { PrivateRoute } from "@/components/privateRoute";
import { useState, useEffect } from "react";

import type { User } from "@/types/user";

import { API_URL } from "@/constants";

import { blueGrey } from "@mui/material/colors";

import Box from "@mui/material/Box";

import { UsersList } from "@/components/admin/usersList/usersList";
import { ModalEditUser } from "@/components/admin/modal/editUser/editUser";

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);

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
        <UsersList
          users={users}
          setUsers={setUsers}
          setEditingUser={setEditingUser}
        />
        {!!editingUser && (
          <ModalEditUser
            users={users}
            setUsers={setUsers}
            editingUser={editingUser}
            setEditingUser={setEditingUser}
          />
        )}
      </Box>
    </PrivateRoute>
  );
}
