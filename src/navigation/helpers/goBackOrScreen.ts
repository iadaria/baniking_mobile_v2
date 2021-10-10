import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export function goBackOrScreen(
  navigation: NativeStackNavigationProp<ParamListBase>,
  name: string,
) {
  if (navigation.canGoBack()) {
    return navigation.goBack();
  }
  navigation.reset({ index: 0, routes: [{ name }] });
}
