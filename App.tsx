import { Appearance, Image, StatusBar, StatusBarStyle } from 'react-native';
import { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { useAppTheme } from './src/stores/useAppTheme';
import { useUserPrefStore } from './src/stores/useUserPrefStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Colors } from './src/constants/Colors';

import Toast from 'react-native-toast-message';
import ThemedView from './src/components/ThemedView';
import ThemedText from './src/components/ThemedText';

const queryClient = new QueryClient();

function App() {
  const colorScheme: string = useAppTheme()
  const theme = colorScheme == "light" ? Colors.light : Colors.dark
  const barStyle: StatusBarStyle = colorScheme == "light" ? 'dark-content' : 'light-content'
  const updateSystemTheme = useUserPrefStore((state) => state.updateSystemPref)

  const toastConfig = {
    errorToast: ({ text1, props }: { text1?: string, props: any }) => (
      <ThemedView style={{ width: '95%', minHeight: 50, backgroundColor: Colors.warnning, justifyContent: 'center', padding: 10, borderRadius: 10, elevation: 5 }}>
        <ThemedText btnText={true} style={{ fontWeight: '400' }}>{text1}</ThemedText>
      </ThemedView>
    ),

    successToast: ({ text1, props }: { text1?: string, props: any }) => (
      <ThemedView style={{ width: 'auto', flexDirection: 'row', gap: 5, backgroundColor: theme.uiBackground, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 50, elevation: 1 }}>
        <Image source={require('./src/assets/logo.png')} style={{ width: 25, height: 25 }} />
        <ThemedText style={{ fontWeight: '400' }}>{text1}</ThemedText>
      </ThemedView>
    )
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      updateSystemTheme(colorScheme);
    });

    return () => subscription.remove();
  }, [updateSystemTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle={barStyle} />
      <AppNavigator />
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

export default App;
