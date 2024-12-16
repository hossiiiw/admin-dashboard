import { Login } from "./features/identify/components/login";
import { Register } from "./features/identify/components/register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IdentityLayout } from "./layout/identity-layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<IdentityLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
