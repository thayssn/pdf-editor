import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <main>
          <Suspense>{props.children}</Suspense>
        </main>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
