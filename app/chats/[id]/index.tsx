import { LowkeyChatRoom } from '@devlowkey/chat-sdk-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ReactElement } from 'react';

export default function ChatScreen(): ReactElement {
  const chatId = useLocalSearchParams().id as string;

  const handleAvatarPress = () => {
    router.navigate(`/chats/${chatId}/details`);
  };

  const handleBackPress = () => {
    router.back();
  };

  return <LowkeyChatRoom chatId={chatId} onGroupChatDetailsPress={handleAvatarPress} onBackPress={handleBackPress} />;
}
