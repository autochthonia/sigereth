// @ts-ignore
import React, { ChangeEvent, useState } from 'react';
import Flex from 'atoms/Flex';
import Input from 'atoms/Input';
import Button from 'atoms/Button';
import { firestore } from 'firebase';
import { Game, Player, PlayerStatus, UserRole } from 'types/Game';
import { some } from 'lodash';
import { createFSUserRef } from 'services/fsSelector';
import { useInput } from 'hooks/useInput';

interface PInvitePlayer {
  gameRef: firestore.DocumentReference<Game>;
  players: firestore.QuerySnapshotExpanded<Player>;
}

const InvitePlayer = ({ gameRef, players }: PInvitePlayer) => {
  const playerInput = useInput();
  // const [error, setError] = useState(null);

  return (
    <Flex flexDirection="column">
      <h2>Invite players</h2>
      <Input {...playerInput} />
      <Button
        onClick={async () => {
          if (some(players.docs, p => p.id === playerInput.value)) {
            return playerInput.set('');
          }
          const invitedUser = await createFSUserRef(playerInput.value).get();
          gameRef
            .collection<Player>('players')
            .doc(playerInput.value)
            .set({
              username: invitedUser.data().username,
              user: invitedUser.ref,
              role: UserRole.player,
              status: PlayerStatus.invited,
            } as Player);
        }}
      >
        Invite
      </Button>
    </Flex>
  );
};

export default InvitePlayer;
