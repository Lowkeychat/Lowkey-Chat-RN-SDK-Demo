import { lowkeyClient } from '@/libs/lowkey-client';
import { LowkeyChatProvider, LowkeyUiProvider, useLowkeyChat, useLowkeyUi } from '@devlowkey/chat-sdk-react-native';
import { useFonts } from 'expo-font';
import { router, Stack, useRootNavigationState } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Fragment, ReactElement, useEffect } from 'react';

export { ErrorBoundary } from 'expo-router';

function App() {
  const [loaded, error] = useFonts({
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
  });

  const rootNavigationState = useRootNavigationState();
  const navigatorReady = rootNavigationState?.key != null;
  const { themeVariant } = useLowkeyUi();
  const { user } = useLowkeyChat();

  useEffect(() => {
    if (!navigatorReady) {
      return;
    }

    if (lowkeyClient.isAuthenticated && user) {
      router.replace('/chats');
    } else {
      router.replace('/');
    }
  }, [navigatorReady, user]);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Fragment>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='chats' />
      </Stack>
      <StatusBar style={themeVariant === 'dark' ? 'light' : 'dark'} translucent />
    </Fragment>
  );
}

export default function RootLayout(): ReactElement | null {
  return (
    <LowkeyChatProvider lowkeyClient={lowkeyClient}>
      <LowkeyUiProvider>
        <App />
      </LowkeyUiProvider>
    </LowkeyChatProvider>
  );
}
