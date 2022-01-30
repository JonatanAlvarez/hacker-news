import CardNews from "../../components/CardNews/CardNews";

import './SectionNews.scss';

export type Post = {
  objectID: string,
  author: string,
  story_title: string,
  story_url: string,
  created_at: string,
  isFavorite?: boolean
}

type Props = {
  items: Post[],
  onChange?: (item: Post) => void
};

const SectionNews = ({ items, onChange = () => {} }: Props) => {
  const openNewTab = (url: string) => {
    window.open(url, '_blank');
  }

  const handlerFavorite = (item: Post, isFavorite: boolean) => {
    onChange({
      ...item,
      isFavorite
    })
  }

  return (
    <section className="SectionNews">
      {
        items.map((item, i) => {
          if (item.author && item.story_title && item.created_at && item.story_url) {
            return (
              <CardNews
                key={item.objectID + '-' + i}
                publishedDate={item.created_at}
                author={item.author}
                title={item.story_title}
                isFavorite={item.isFavorite}
                onClick={() => openNewTab(item.story_url)}
                onFavorite={(e) => handlerFavorite(item, e)}
              />
            );
          }

          return null;
        })
      }
    </section>
  );
};

export default SectionNews;