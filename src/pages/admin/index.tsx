import Button from '@mui/material/Button';
import { PrivateRoute } from "@/components/privateRoute";


export default function Admin() {
  return (
    <PrivateRoute requireAdmin={true}>
    <div>
      <Button variant="contained">Hello World</Button>
    </div>
    </PrivateRoute>
  )
}