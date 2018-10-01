import DashboardPage from 'pages/Dashboard';
import withFirestore from 'services/withFirestore';
import { CollectionReference } from 'types/Firestation';
import { Game } from 'types/Game';

const DashboardContainer = withFirestore()({
  queries: {
    games: async firestore => firestore.collection('games') as CollectionReference<Game>,
  },
})(DashboardPage);

export default DashboardContainer;
