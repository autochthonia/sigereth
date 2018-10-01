import Flex from 'atoms/Flex';
import React, { Component } from 'react';
import LabeledInput from 'molecules/LabeledInput';
import Input from 'atoms/Input';
import { firestore } from 'firebase';
import { getUID } from 'services/firestation';
import { Combat } from 'types/Combat';
import { WithRouter } from 'found';

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
            const gameRef = await firestore()
              .collection('games')
              .add(
                { name: this.state.gameName, turn: 0 },
                // as Game
              );
            await Promise.all([
              gameRef.collection('players').add(
                {
                  name: 'no player name yet',
                  role: 'OWNER',
                  user: firestore().doc(`users/${getUID()}`),
                },
                // as Player
              ),
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
