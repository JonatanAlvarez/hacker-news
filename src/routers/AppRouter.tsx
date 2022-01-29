import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<></>} />
          <Route path="/my-faves" element={<></>} />
        </Route>
        <Route path="/*" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
};
