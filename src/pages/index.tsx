import { PrivateRoute } from "@/components/privateRoute";

export default function Home() {
  return (
    <PrivateRoute>
      <main>hello</main>
    </PrivateRoute>
  );
}
