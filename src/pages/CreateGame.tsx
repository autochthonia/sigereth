import Flex from 'atoms/Flex';
import React, { Component } from 'react';
import LabeledInput from 'molecules/LabeledInput';
import Input from 'atoms/Input';
import { firestore } from 'firebase';
import { Game, Player, UserRole } from 'types/Game';
import { getUID } from 'services/firestation';

const Form = Flex.withComponent('form');

class CreateGamePage extends Component {
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
              .add({ name: this.state.gameName, turn: 0 } as Game);
            gameRef.collection('players').add({
              name: 'no player name yet',
              role: UserRole.owner,
              user: firestore().doc(`users/${getUID()}`),
            } as Player);
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
