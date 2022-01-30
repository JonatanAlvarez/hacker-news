type Item = {
  objectID: string
}

export enum FavoriteType {
  ADD = 'ADD',
  DELETE = 'DELETE'
}

interface FavoriteAction {
  type: FavoriteType;
  payload: Item;
}

export const init = () => {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
};

const favoriteReducer = (state: Item[], action: FavoriteAction) => {
  const { type, payload } = action;
  let items = [];

  switch(type) {
    case FavoriteType.ADD:
      items = state.filter((item: Item) => item.objectID !== payload.objectID);
      items.push(payload);
      localStorage.setItem('favorites', JSON.stringify(items));

      return items;

    case FavoriteType.DELETE:
      items = state.filter((item: Item) => item.objectID !== payload.objectID);
      localStorage.setItem('favorites', JSON.stringify(items));

      return items;

    default:
      return state;
  }
};

export default favoriteReducer;