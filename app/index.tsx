import { ApiErrorResponse } from '@devlowkey/chat-sdk-core';
import {
  useLowkeyChat,
  LowkeyButton,
  LowkeyLayout,
  LowkeyText,
  LowkeyTextInput,
  useLowkeyUi,
  LowkeyImages,
  LowkeyImage,
  LowkeySvgImage,
  LowkeyVectors,
  LowkeyColors,
  LowkeyKeyboardAwareScrollView,
} from '@devlowkey/chat-sdk-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export default function WelcomeScreen() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const { createUser, connectUser } = useLowkeyChat();
  const { theme, themeVariant, setThemeVariant } = useLowkeyUi();

  const handleConnect = async () => {
    if (username) {
      try {
        if (name) {
          await createUser({ externalId: username, name })
        } else {
          await connectUser({ externalId: username });
        }

        router.replace('/chats');
      } catch (error) {
        const message = (error as ApiErrorResponse).response?.data?.error;
        const status = (error as ApiErrorResponse).response?.status;
        Alert.alert(`Error ${status}`, message);
      }
    }
  };

  const toggleTheme = async () => {
    setThemeVariant(themeVariant === 'light' ? 'dark' : 'light');
  };

  return (
    <LowkeyLayout insets={{ top: true }}>
      <LowkeyKeyboardAwareScrollView
        contentContainerStyle={[styles.container, { padding: theme.spacings.contentPadding }]}>
        <LowkeyImage contentFit='contain' style={styles.image} source={LowkeyImages.loginBanner} />
        <LowkeyButton containerStyle={styles.themeButton} onPress={toggleTheme}>
          <LowkeySvgImage
            fill={LowkeyColors.lightPrimary}
            source={themeVariant === 'dark' ? LowkeyVectors.moon : LowkeyVectors.sun}
            width={20}
            height={20}
          />
        </LowkeyButton>
        <LowkeyText size='h3' weight='semiBold'>
          Welcome to Lowkey{'\n'}Chat SDK demo
        </LowkeyText>
        <LowkeyText type='secondary'>Please enter your username to connect</LowkeyText>
        <View style={styles.formContainer}>
          <LowkeyTextInput value={username} onChangeText={setUsername} placeholder='Username' autoCapitalize={'none'} />
          <LowkeyTextInput value={name} onChangeText={setName} placeholder='Name (fill if creating account)' />
        </View>
        <LowkeyButton disabled={!username} size='large' onPress={handleConnect}>
          {name ? 'Create account' : 'Login'}
        </LowkeyButton>
      </LowkeyKeyboardAwareScrollView>
    </LowkeyLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingBottom: 200,
  },
  image: {
    minHeight: '20%',
  },
  themeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  formContainer: {
    marginVertical: 10,
    gap: 10,
  },
});
