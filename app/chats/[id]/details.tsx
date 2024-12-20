import { LowkeyChatDetails } from '@devlowkey/chat-sdk-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ReactElement } from 'react';

export default function ChatDetailsScreen(): ReactElement {
  const chatId = useLocalSearchParams().id as string;

  const handleOpenDirectChat = async (chatId: string) => {
    router.navigate(`/chats/${chatId}`);
  };

  const handleChatLeft = () => {
    router.replace('/chats');
  };

  return (
    <LowkeyChatDetails
      chatId={chatId}
      onOpenDirectChat={handleOpenDirectChat}
      onChatLeft={handleChatLeft}
      onBackPress={() => router.back()}
    />
  );
}
