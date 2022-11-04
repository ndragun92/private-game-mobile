import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Game from './pages/Game';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Game"
          component={Game}
          options={{ title: 'Heroes Of The Universe', orientation: 'landscape' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
