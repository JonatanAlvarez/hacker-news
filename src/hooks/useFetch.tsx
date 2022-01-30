import { useEffect, useState } from "react";

function useFetch<T>(url: string) {
  const [state, setState] = useState({
    isLoaded: false,
    data: {} as T,
    error: null
  });

  useEffect(() => {
    setState((state) => ({
      ...state,
      isLoaded: false
    }));

    fetch(url)
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
  }, [url]);

  return state;
};

export default useFetch;