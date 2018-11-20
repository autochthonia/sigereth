import React from 'react';
import Flex from 'atoms/Flex';
import Input from 'atoms/Input';
import Button from 'atoms/Button';
import { firestore } from 'firebase';
import { Game, Player, PlayerStatus, UserRole } from 'types/Game';
import { some } from 'lodash';
import { createFSUserRef } from 'services/fsSelector';
import { useInput } from 'hooks/useInput';
import { QuerySnapshotExpanded } from 'store/expandSnapshot';
import { User } from 'types/User';

interface PInvitePlayer {
  gameRef: firestore.DocumentReference<Game>;
  players: QuerySnapshotExpanded<Player>;
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
          const invitedUser: firestore.DocumentSnapshot<User> = await createFSUserRef(playerInput.value).get();
          gameRef
            .collection<Player>('players')
            .doc(playerInput.value)
            .set({
              username: invitedUser.data<User>().username,
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
