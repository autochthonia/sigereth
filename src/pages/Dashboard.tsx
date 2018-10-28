import React, { SFC } from 'react';
import Flex from 'atoms/Flex';
import { map } from 'lodash';
import { Link } from 'found';
import { Game } from 'types/Game';
import { firestore } from 'firebase';

interface PDashboardPage {
  games: firestore.QuerySnapshotExpanded<Game>;
}

const DashboardPage: SFC<PDashboardPage> = ({ games }) => (
  <Flex flexDirection="column">
    <p>Debug mode - all games shown</p>
    {map(games.docs, g => (
      <Link key={g.id} to={`/games/${g.id}`}>
        {g.data.name}
      </Link>
    ))}
    <Link to="/games/new">Create game</Link>
  </Flex>
);

export default DashboardPage;
