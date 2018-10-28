import withFirestore from 'services/withFirestore';
import MessagesOrganism, { PMessagesOrganism } from 'organisms/Messages';
import { Message, Player } from 'types/Game';
import { firestore } from 'firebase';

const MessagesContainer = withFirestore<{
  messages: firestore.CollectionReference<Message>;
  sendMessage: PMessagesOrganism['sendMessage'];
  players: firestore.QuerySnapshotExpanded<Player>;
}>()({
  queries: {
    messages: async (_firestore, props) => props.messages.orderBy('createdAt', 'asc'),
  },
  props: ['sendMessage', 'players'],
})(MessagesOrganism);

export default MessagesContainer;
