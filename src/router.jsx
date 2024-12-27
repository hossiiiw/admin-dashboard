import { createBrowserRouter } from "react-router-dom";
import { IdentityLayout } from "./layout/identity-layout";
import { Login, loginAction } from "./features/identify/components/login";
import {
  Register,
  registerAction,
} from "./features/identify/components/register";
import { Courses, coursesLoader } from "./pages/courses";
import { MainLayout } from "./layout/mainLayout/mainLayout";
import { CoursesCategory } from "./pages/course-categories";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <Courses />,
        index: true,
        loader: coursesLoader,
      },
      {
        path: "course-categories",
        element: <CoursesCategory />,
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
