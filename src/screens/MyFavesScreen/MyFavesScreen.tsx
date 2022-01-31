import { useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import favoriteReducer, { init, FavoriteType } from "../../reducers/favoriteReducer";

import SectionNews, { Post } from "../../components/SectionNews/SectionNews";
import Pagination from "../../components/Pagination/Pagination";

import './MyFavesScreen.scss';

import hearts from "../../assets/beating-hearts.gif";

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

  const favoritePerPage = useCallback(() => {
    return favoriteItems.filter((_, index) => (
      index >= (state.page -1) * itemPerPage && index < (state.page * itemPerPage)
    )) as Post[]
  }, [favoriteItems, state]);

  return (
    <div className="MyFaves max-container">
      
      { 
        favoritePerPage().length > 0
        ? <SectionNews items={ favoritePerPage() } onChange={handlerNews}/>
        :
          <>
            <h2>You don't have favorites yet.<br />Add some to see them here whenever you want.</h2>
            <img src={hearts} alt="" width="80" height="80" />
          </>
      }
      
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