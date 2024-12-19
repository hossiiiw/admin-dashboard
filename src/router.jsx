import { createBrowserRouter } from "react-router-dom";
import { IdentityLayout } from "./layout/identity-layout";
import { Login } from "./features/identify/components/login";
import {
  Register,
  registerAction,
} from "./features/identify/components/register";

export const router = createBrowserRouter([
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
        errorElement: <Register />,
      },
    ],
  },
]);
