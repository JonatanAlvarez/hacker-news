import { useEffect, useState } from "react";
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
  const [selectedNews, setSelectedNews] = useState('');
  const [state, setState] = useState({
    isLoaded: false,
    data: {} as AlgoliaResults,
    error: null
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    setState((state) => ({
      ...state,
      isLoaded: false
    }));

    fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${selectedNews}&hitsPerPage=8&page=${page - 1}`)
      .then(res => res.json())
      .then(
        (result) => {
          setState((state) => ({
            ...state,
            isLoaded: true,
            data: result
          }));
        },
        (error) => {
          setState((state) => ({
            ...state,
            isLoaded: true,
            error
          }));
        }
      )
  }, [selectedNews, page]);

  return (
    <div className="NewsScreen max-container">
      <SelectItem value={selectedNews} placeholder="Select your news" onChange={setSelectedNews}>
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

      { state.isLoaded ? <SectionNews items={ state.data.hits }/> : <Loader /> }
      
      <Pagination
        currentPage={page}
        total={state.data.hitsPerPage * state.data.nbPages}
        pagesShow={12}
        pagesSize={8}
        onChange={setPage}
      />
    </div>
  );
};

export default NewsScreen;