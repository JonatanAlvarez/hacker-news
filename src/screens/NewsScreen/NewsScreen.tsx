import { useState } from "react";
import OptionItem from "../../components/SelectItem/OptionItem";
import SelectItem from "../../components/SelectItem/SelectItem";

import './NewsScreen.scss';

import logoReact from '../../assets/react.png';
import logoAngular from '../../assets/angular.png';
import logoVuejs from '../../assets/vuejs.png';
import CardNews from "../../components/CardNews/CardNews";
import Pagination from "../../components/Pagination/Pagination";

const NewsScreen = () => {
  const [selectedNews, setSelectedNews] = useState('');
  const [page, setPage] = useState(1);

  return (
    <div className="NewsScreen max-container">
      <SelectItem value={selectedNews} placeholder="Select your news" onChange={setSelectedNews}>
        <OptionItem value="angular">
          <><img src={logoAngular} alt="Logo" /> Angular</>
        </OptionItem>
        <OptionItem value="reacts">
          <><img src={logoReact} alt="Logo" /> Reacts</>
        </OptionItem>
        <OptionItem value="vuejs">
          <><img src={logoVuejs} alt="Logo" /> Vuejs</>
        </OptionItem>
      </SelectItem>
      <section>
        <CardNews
          publishedDate="2022-01-28T14:05:58.000Z"
          author="Test"
          title="How do you cross the bridge between Knowing and Practicing?"
          comment=""
        />
      </section>
      <Pagination currentPage={page} total={20} pagesShow={12} onChange={setPage} />
    </div>
  );
};

export default NewsScreen;