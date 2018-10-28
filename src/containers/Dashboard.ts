import DashboardPage from 'pages/Dashboard';
import withFirestore from 'services/withFirestore';
import { Game } from 'types/Game';
import { firestore } from 'firebase';

const DashboardContainer = withFirestore()({
  queries: {
    games: async firestore => firestore.collection('games') as firestore.CollectionReference<Game>,
  },
})(DashboardPage);

export default DashboardContainer;
