import Button from '@mui/material/Button';
import { PrivateRoute } from "@/components/privateRoute";
import { useState } from 'react';



export default function Admin() {

  const [users, setUsers] = useState([]);
  const [isLogin, setIsLoading] = useState(true);
  return (
    <PrivateRoute requireAdmin={true}>
    <div>
      <Button variant="contained">Hello World</Button>
    </div>
    </PrivateRoute>
  )
}