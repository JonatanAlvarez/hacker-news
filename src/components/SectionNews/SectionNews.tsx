import CardNews from "../../components/CardNews/CardNews";

import './SectionNews.scss';

export type Post = {
  author: string,
  story_title: string,
  story_url: string,
  created_at: string
}

type Props = {
  items: Post[]
};

const SectionNews = ({ items }: Props) => {
  const openNewTab = (url: string) => {
    window.open(url, '_blank');
  }

  return (
    <section className="SectionNews">
      {
        items.map((item, i) => {
          if (item.story_title) {
            return (
              <CardNews
                key={i}
                publishedDate={item.created_at}
                author={item.author}
                title={item.story_title}
                onClick={() => openNewTab(item.story_url)}
              />
            );
          }

          return <></>;
        })
      }
    </section>
  );
};

export default SectionNews;