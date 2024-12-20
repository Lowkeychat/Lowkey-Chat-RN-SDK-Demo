import { Stack } from 'expo-router';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_settings = {
  initialRouteName: 'chats',
};

export default function ChatScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='details' />
    </Stack>
  );
}
