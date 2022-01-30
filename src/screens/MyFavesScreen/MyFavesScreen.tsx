import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import favoriteReducer, { init, FavoriteType } from "../../reducers/favoriteReducer";

import './MyFavesScreen.scss';

import SectionNews, { Post } from "../../components/SectionNews/SectionNews";
import Pagination from "../../components/Pagination/Pagination";

const MyFaves = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  const [state, setState] = useState({ page: parseInt(page || '1') });
  const [favoriteItems, dispatchFavorites] = useReducer(favoriteReducer, [], init);
  const itemPerPage = 8;

  useEffect(() => {
    navigate({ pathname: `/my-faves/${state.page}` });
  }, [state, navigate]);

  const handlerNews = (news: Post) => {
    dispatchFavorites({
      type: news.isFavorite? FavoriteType.ADD : FavoriteType.DELETE,
      payload: news
    })
  };

  const handlerPagination = (page: number) => {
    setState((state) => ({
      ...state,
      page
    }));
  };

  const favoritePerPage = (favorites: Post[]) => {
    return favorites.filter((_, index) => (
      index >= (state.page -1) * itemPerPage && index < (state.page * itemPerPage)
    ))
  };

  return (
    <div className="MyFaves max-container">
      
      <SectionNews items={ favoritePerPage(favoriteItems as Post[]) } onChange={handlerNews}/>
      
      <Pagination
        currentPage={state.page}
        total={favoriteItems.length}
        pagesShow={12}
        pagesSize={itemPerPage}
        onChange={handlerPagination}
      />
    </div>
  );
};

export default MyFaves;