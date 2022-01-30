import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import MyFaves from "../screens/MyFavesScreen/MyFavesScreen";
import NewsScreen from "../screens/NewsScreen/NewsScreen";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Navigate to="/1" />} />
          <Route path="my-faves/:page" element={<MyFaves />} />
          <Route path=":page" element={<NewsScreen />} />
          <Route path=":query/:page" element={<NewsScreen key="query" />} />
        </Route>
        <Route path="/*" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
};
