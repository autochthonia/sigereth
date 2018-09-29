import withFirestore from 'services/withFirestore';
import MessagesOrganism, { PMessagesOrganism } from 'organisms/Messages';
import { CollectionReference } from 'types/Firestation';
import { Message } from 'types/Game';

const MessagesContainer = withFirestore<{
  messages: CollectionReference<Message>;
  sendMessage: PMessagesOrganism['sendMessage'];
}>()({
  queries: {
    messages: async (_firestore, props) => props.messages.orderBy('createdAt', 'asc'),
  },
  props: ['sendMessage'],
})(MessagesOrganism);

export default MessagesContainer;
