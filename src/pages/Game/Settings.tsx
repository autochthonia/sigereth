import useFirestore from 'services/useFirestore';
import React, { SFC } from 'react';
import { WithRouter } from 'found';
import { createFSGameRef } from 'services/fsSelector';
import Flex from 'atoms/Flex';
import Input from 'atoms/Input';
import { Player } from 'types/Game';

const GameSettingsPage: SFC<WithRouter> = ({
  match: {
    params: { gameId },
  },
}) => {
  const gameRef = createFSGameRef(gameId);
  const game = useFirestore(gameRef, { subscribe: true });
  const players = useFirestore(gameRef.collection<Player>('players'));
  if (game.data === null || players.docs === null) {
    return <span>'loading...'</span>;
  }
  if (game.exists === false) {
    return <span>'this game doesn\'t exist'</span>;
  }

  return (
    <Flex flexDirection="column">
      <h1>Game Settings</h1>
      <Input
        value={game.data.name}
        placeholder="Game Name"
        onChange={e => gameRef.update({ name: e.target.value })}
      />
      Game Owner: {players.docs[game.data.owner.id].data.username}
    </Flex>
  );
};

export default GameSettingsPage;
