import { Appearance, StatusBar, StatusBarStyle } from 'react-native';
import { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { useAppTheme } from './src/stores/useAppTheme';
import { useUserPrefStore } from './src/stores/useUserPrefStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const colorScheme: string = useAppTheme()
  const barStyle: StatusBarStyle = colorScheme == "light" ? 'dark-content' : 'light-content'
  const updateSystemTheme = useUserPrefStore((state) => state.updateSystemPref)

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
    </QueryClientProvider>
  );
}

export default App;
