import { LowkeyChatsList } from '@devlowkey/chat-sdk-react-native';
import { router } from 'expo-router';
import { ReactElement } from 'react';

export default function ChatsScreen(): ReactElement | null {
  const onChatPress = (chatId: string) => {
    router.push(`/chats/${chatId}`);
  };

  const handleNewChatPress = () => {
    router.navigate('/chats/new-chat');
  };

  return <LowkeyChatsList onChatPress={onChatPress} onNewChatPress={handleNewChatPress} />;
}
