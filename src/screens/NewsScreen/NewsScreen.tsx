import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import favoriteReducer, { init, FavoriteType } from "../../reducers/favoriteReducer";
import loadNews from "../../helpers/loadNews";

import OptionItem from "../../components/SelectItem/OptionItem";
import SelectItem from "../../components/SelectItem/SelectItem";
import Toggle from "../../components/Toggle/Toggle";
import SectionNews, { Post } from "../../components/SectionNews/SectionNews";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import Pagination from "../../components/Pagination/Pagination";

import './NewsScreen.scss';

import { ReactComponent as Loader } from '../../assets/loader.svg';
import logoReact from '../../assets/react.png';
import logoAngular from '../../assets/angular.png';
import logoVuejs from '../../assets/vuejs.png';

const NewsScreen = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(true);
  const { query, page } = useParams();
  const [state, setState] = useState({ query: query || '', page: parseInt(page || '1') });
  const [infinityScroll, setInfinityScroll] = useState(false);
  const [infinityLoading, setInfinityLoading] = useState(false);
  const [results, setResults] = useState({
    isLoaded: false,
    hitsPerPage: 0,
    nbPages: 0,
    nbHits: 0,
    hits: [],
    page: 0,
    error: null
  });
  
  const [favoriteItems, dispatchFavorites] = useReducer(favoriteReducer, [], init);

  useEffect(() => {
    setMounted(true);
    
    const query = localStorage.getItem('selectedFilter');
    if(query) {
      setState((state) => ({
        ...state,
        query
      }));
    }

    return () => {
      setMounted(false);
    }
  }, []);

  useEffect(() => {
    if (!Number.isInteger(state.page)) {
      setState((state) => ({
        ...state,
        page: 1
      }));
    } else if (state.query !== '') {
      navigate({ pathname: `/${state.query}/${state.page}` });
    } else {
      navigate({ pathname: `/${state.page}` });
    }
  }, [state, navigate]);

  useEffect(() => {
    setResults((state) => ({
      ...state,
      isLoaded: false
    }));

    loadNews(`https://hn.algolia.com/api/v1/search_by_date?query=${state.query}&hitsPerPage=8&page=${state.page - 1}`)
      .then((results) => {
        setResults((state) => ({
          ...state,
          ...results
        }));
      });
  }, [state]);

  const handlerSelect = (query: string) => {
    localStorage.setItem('selectedFilter', query);
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

  const handleInfiniteScroll = () => {
    setInfinityLoading(true);

    loadNews(`https://hn.algolia.com/api/v1/search_by_date?query=${state.query}&hitsPerPage=8&page=${results.page + 1}`)
      .then((results) => {

        setResults((state) => ({
          ...state,
          ...results,
          hits: [
            ...state.hits,
            ...results.hits
          ],
          page: state.page + 1
        }));

        setInfinityLoading(false);
      });
  };

  return (
    <div className="NewsScreen max-container">
      <div className="controls">
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

        <Toggle
          isActive={infinityScroll}
          onClick={(e) => {
            setInfinityScroll(e);
            setState({
              ...state,
              page: 1
            })
          }}
        >
          Infinite Scroll
        </Toggle>
      </div>

      { 
        results.error && 
        <>
          <p>Oops, we're sorry. There was an error loading the news. =(</p>
          <img src="" alt="" />
        </>
      }

      { results.isLoaded && mounted 
        ? <SectionNews items={ markFavoritePosts(results.hits) } onChange={handlerNews}/> 
        : <Loader />
      }
      
      { infinityScroll
        ? 
          <InfiniteScroll isLoading={infinityLoading} onClick={handleInfiniteScroll} />
        : 
          <Pagination
            currentPage={state.page}
            total={results.hitsPerPage * results.nbPages}
            pagesShow={12}
            pagesSize={8}
            onChange={handlerPagination}
          />
      }
    </div>
  );
};

export default NewsScreen;