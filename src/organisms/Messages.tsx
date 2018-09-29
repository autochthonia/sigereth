import Flex from 'atoms/Flex';
import React, { SFC } from 'react';
import { map } from 'lodash';
import { QuerySnapshotExpanded } from 'types/Firestation';
import { Message } from 'types/Game';
import styled from 'react-emotion';
import colors from 'styles/colors';
import MessagesChatInput, { MessagesChatInputProps } from 'molecules/MessagesChatInput';
import { firestore } from 'firebase';
import { getUID } from 'services/firestation';

const MessagesWrapper = styled(Flex)({
  borderColor: colors.black,
  borderWidth: 1,
  borderStyle: 'solid',
});

const Message = styled(Flex)<{ isUser: boolean }>(({ isUser = false }) => ({
  background: isUser ? colors.grey : colors.white,
}));

export interface PMessagesOrganism {
  messages: QuerySnapshotExpanded<Message>;
  sendMessage: MessagesChatInputProps['sendMessage'];
}

const MessagesOrganism: SFC<PMessagesOrganism> = ({ messages, sendMessage }) => (
  <MessagesWrapper flexDirection="column">
    <h1>Messages</h1>
    <Flex flexDirection="column" flexGrow={1}>
      {map(messages.docs, m => (
        <Message isUser={m.data.sender.isEqual(firestore().doc(`users/${getUID()}`))} key={m.id}>
          {m.data.body}
        </Message>
      ))}
    </Flex>
    <MessagesChatInput sendMessage={sendMessage} />
  </MessagesWrapper>
);

export default MessagesOrganism;
