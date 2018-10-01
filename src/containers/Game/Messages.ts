import withFirestore from 'services/withFirestore';
import MessagesOrganism, { PMessagesOrganism } from 'organisms/Messages';
import { CollectionReference, QuerySnapshotExpanded } from 'types/Firestation';
import { Message, Player } from 'types/Game';

const MessagesContainer = withFirestore<{
  messages: CollectionReference<Message>;
  sendMessage: PMessagesOrganism['sendMessage'];
  players: QuerySnapshotExpanded<Player>;
}>()({
  queries: {
    messages: async (_firestore, props) => props.messages.orderBy('createdAt', 'asc'),
  },
  props: ['sendMessage', 'players'],
})(MessagesOrganism);

export default MessagesContainer;
