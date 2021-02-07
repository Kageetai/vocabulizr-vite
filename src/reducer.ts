import { Dispatch, useReducer } from 'react';

type ActionConstants = 'add' | 'remove';
interface Action {
  type: ActionConstants;
  payload: string;
}

const key = 'words';
export const words: string[] = JSON.parse(localStorage.getItem(key) || '[]');

const saveWords = (words: string[]) =>
  localStorage.setItem(key, JSON.stringify(words));

export const addWord = (word: string): Action => ({
  type: 'add',
  payload: word,
});

export const removeWord = (word: string): Action => ({
  type: 'remove',
  payload: word,
});

declare global {
  interface Array<T> {
    random(): T;
  }
}

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

const reducer = (
  state: string[],
  action: { type: ActionConstants; payload: string },
) => {
  let w: string[] = [];

  switch (action.type) {
    case 'add':
      w = !state.includes(action.payload) ? [...state, action.payload] : state;
      break;
    case 'remove':
      w = state.filter((word) => word !== action.payload);
      break;
    default:
      throw new Error();
  }

  saveWords(w);
  return w;
};

export const useWords = (): [string[], Dispatch<Action>] =>
  useReducer(reducer, words);
