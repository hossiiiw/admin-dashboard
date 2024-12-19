import { createBrowserRouter } from "react-router-dom";
import { IdentityLayout } from "./layout/identity-layout";
import { Login, loginAction } from "./features/identify/components/login";
import {
  Register,
  registerAction,
} from "./features/identify/components/register";
import { MainLayout } from "./layout/mainLayout";
import { Courses } from "./pages/courses";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <Courses />,
        index: true,
      },
    ],
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
        errorElement: <Login />,
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
