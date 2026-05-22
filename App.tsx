import { Appearance, StatusBar, StatusBarStyle } from 'react-native';
import { useAppTheme } from './src/stores/useAppTheme';
import { useUserPrefStore } from './src/stores/useUserPrefStore';
import { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';

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
    <>
      <StatusBar barStyle={barStyle} />
      <AppNavigator />
    </>
  );
}

export default App;
