import Flex from 'atoms/Flex';
import React, { Component } from 'react';
import LabeledInput from 'molecules/LabeledInput';
import Input from 'atoms/Input';
import { firestore } from 'firebase';
import { getUID } from 'services/firestation';
import { Combat } from 'types/Combat';
import { WithRouter } from 'found';
// import { Player, UserRole, Game } from 'types/Game';
import { createFSUserRef } from 'services/fsSelector';
import { Game, Player } from 'types/Game';

const Form = Flex.withComponent('form');

class CreateGamePage extends Component<WithRouter> {
  state = { gameName: '' };

  render() {
    return (
      <Flex flexDirection="column">
        <Form
          flexDirection="column"
          width={400}
          onSubmit={async e => {
            e.preventDefault();
            const userRef = createFSUserRef();
            const gameRef = (await firestore()
              .collection('games')
              .add({
                name: this.state.gameName,
                turn: 0,
                owner: userRef,
              })) as firestore.DocumentReference<Game>;
            await Promise.all([
              gameRef
                .collection('players')
                .doc(getUID())
                .set({
                  username: 'Storyteller',
                  role: 'OWNER',
                  user: userRef,
                })
                .then(() => {
                  gameRef.update({
                    owner: gameRef.collection<Player>('players').doc(getUID()),
                  });
                }),
              gameRef
                .collection('combats')
                .doc(gameRef.id)
                .set({ turn: 0 } as Combat),
            ]);
            this.props.router.push(`/games/${gameRef.id}`);
          }}
        >
          <LabeledInput
            value={this.state.gameName}
            onChange={e => this.setState({ gameName: e.target.value })}
            name="gameName"
            flexDirection="row"
          >
            Game Name:
          </LabeledInput>
          <Input type="submit" value="Create Game" />
        </Form>
      </Flex>
    );
  }
}

export default CreateGamePage;
