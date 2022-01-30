import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import favoriteReducer, { init, FavoriteType } from "../../reducers/favoriteReducer";

import OptionItem from "../../components/SelectItem/OptionItem";
import SelectItem from "../../components/SelectItem/SelectItem";

import './NewsScreen.scss';

import { ReactComponent as Loader } from '../../assets/loader.svg';
import logoReact from '../../assets/react.png';
import logoAngular from '../../assets/angular.png';
import logoVuejs from '../../assets/vuejs.png';
import SectionNews, { Post } from "../../components/SectionNews/SectionNews";
import Pagination from "../../components/Pagination/Pagination";

type AlgoliaResults = {
  hits: Post[],
  hitsPerPage: number,
  nbHits: number,
  nbPages: number
}

const NewsScreen = () => {
  const navigate = useNavigate();
  const { query, page } = useParams();
  const [state, setState] = useState({ query: query || '', page: parseInt(page || '1') });
  const { isLoaded, data, error } = useFetch<AlgoliaResults>(`https://hn.algolia.com/api/v1/search_by_date?query=${state.query}&hitsPerPage=8&page=${state.page - 1}`);
  const [favoriteItems, dispatchFavorites] = useReducer(favoriteReducer, [], init);

  useEffect(() => {
    if (state.query !== '') {
      navigate({ pathname: `/${state.query}/${state.page}` });
    } else {
      navigate({ pathname: `/${state.page}` });
    }
  }, [state]);

  const handlerSelect = (query: string) => {
    setState({
      query,
      page: 1
    });
  };

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

  const markFavoritePosts = (posts: Post[]) => {
    const markeds = posts.map((post) => {
      const item = favoriteItems.filter(item => item.objectID === post.objectID);
      if (item.length) {
        return item[0] as Post;
      }
      return post;
    });
    
    return markeds;
  };

  return (
    <div className="NewsScreen max-container">
      <SelectItem value={state.query} placeholder="Select your news" onChange={handlerSelect}>
        <OptionItem value="angular">
          <><img src={logoAngular} alt="Logo" /> Angular</>
        </OptionItem>
        <OptionItem value="reactjs">
          <><img src={logoReact} alt="Logo" /> Reacts</>
        </OptionItem>
        <OptionItem value="vuejs">
          <><img src={logoVuejs} alt="Logo" /> Vuejs</>
        </OptionItem>
      </SelectItem>
      
      { error && <p>{ error }</p>}
      { isLoaded ? <SectionNews items={ markFavoritePosts(data.hits) } onChange={handlerNews}/> : <Loader /> }
      
      <Pagination
        currentPage={state.page}
        total={data.hitsPerPage * data.nbPages}
        pagesShow={12}
        pagesSize={8}
        onChange={handlerPagination}
      />
    </div>
  );
};

export default NewsScreen;