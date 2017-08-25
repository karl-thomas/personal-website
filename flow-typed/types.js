// @flow

export type Show = {
  title: string,
  description: string,
  year: string,
  imdbID: string,
  trailer: string,
  poster: string,
  rating?: string
};

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};

declare type ActionType = 'SET_SEARCH_TERM' | 'ADD_API_DATA';

// bars needed for generic types
declare type ActionT<A: ActionType, P> = {|
  type: A,
  payload: P
|};

// the payload from the api is a show type
export type Action = ActionT<'SET_SEARCH_TERM', string> | ActionT<'ADD_API_DATA', Show>;
