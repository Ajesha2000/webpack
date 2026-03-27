import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About } from "@/pages/about";
import { Store } from "@/pages/store";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback={"????"}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/store",
        element: (
          <Suspense fallback={"????"}>
            <Store />
          </Suspense>
        ),
      },
    ],
  },
]);

const container = createRoot(root);

container.render(<RouterProvider router={router} />);
