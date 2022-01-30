const loadNews = async (url: string) => {
  return await fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        return {
          ...result,
          isLoaded: true
        }
      },
      (error) => {
        return {
          error,
          isLoaded: true
        }
      }
    )
};

export default loadNews;