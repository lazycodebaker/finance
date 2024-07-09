import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { queryClient } from "./tanstack/client.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { router } from "./tanstack/router.tsx";
import { RouterProvider } from "@tanstack/react-router";


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
