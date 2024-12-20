import { LowkeyChatClient } from '@devlowkey/chat-sdk-core';

export const lowkeyClient = LowkeyChatClient.getInstance({
  appId: process.env.EXPO_PUBLIC_APP_ID as string,
  appKey: process.env.EXPO_PUBLIC_APP_KEY as string,
});
