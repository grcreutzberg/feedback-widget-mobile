import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import 'react-native-gesture-handler';
import Widget from './src/components/Widget';
import { theme } from './src/theme';

export default function App() {
  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      enabled
    >
      <DismissKeyboard>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
          }}
        >
          <StatusBar style="light"
            backgroundColor='transparent'
            translucent
          />
          <Widget />
        </View>
      </DismissKeyboard>
    </KeyboardAvoidingView>
  );
}
