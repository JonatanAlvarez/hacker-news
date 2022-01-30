import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import NewsScreen from "../screens/NewsScreen/NewsScreen";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<NewsScreen />} />
          <Route path=":page" element={<NewsScreen />} />
          <Route path=":query/:page" element={<NewsScreen key="query" />} />
          <Route path="my-faves" element={<></>} />
        </Route>
        <Route path="/*" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
};
