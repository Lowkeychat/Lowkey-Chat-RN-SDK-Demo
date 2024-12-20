import { LowkeyCreateOrJoinGroupChat } from '@devlowkey/chat-sdk-react-native';
import { router } from 'expo-router';
import { ReactElement } from 'react';

export default function NewChatScreen(): ReactElement | null {
  const handleNewChat = (chat: { id: string }) => {
    router.replace(`/chats/${chat.id}`);
  };

  return (
    <LowkeyCreateOrJoinGroupChat
      onChatCreated={handleNewChat}
      onChatJoined={handleNewChat}
      onBackButtonPress={() => router.back()}
    />
  );
}
