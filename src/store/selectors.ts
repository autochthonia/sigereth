import { StoreState } from '.';
import { MatchBase } from 'found';

export const getAuth = (state: StoreState) => state.auth;
export const getUser = (state: StoreState) => state.user;
export const getGames = (state: StoreState) => state.games;
export const getGame = (state: StoreState, props?: string | { match: MatchBase }) => {
  const games = getGames(state);
  const gameDocs = (games && games.docs) || {};
  const gameId =
    typeof props === 'string'
      ? props
      : props.match && props.match.params && props.match.params.gameId;
  return (gameId && games && gameDocs && gameDocs[gameId]) || null;
};
