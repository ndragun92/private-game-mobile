// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
//
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { StatusBar } from 'expo-status-bar';
// import { Text, View, StyleSheet } from 'react-native';
//
// const App = () => {
//   return (
//       <NavigationContainer>
//                <View style={styles.container}>
//                 <Text>Open up App.js to start working on your app!</Text>
//                  <StatusBar style="auto" />
//                </View>
//       </NavigationContainer>
//   );
// };
//
// export default App;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });



import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AuthLoginPage from "./pages/auth/login/AuthLoginPage";
import {StyleSheet} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// StatusBar.setBarStyle('light-content', true)
// StatusBar.setHidden(true);
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
                    tapBarVisible: false,
                    tabBarStyle: { display: "none" },
                    headerShown: false
                }} >
                <Stack.Screen
                    style={styles.screen}
                    name="Home"
                    component={HomePage}
                    options={{ title: 'Welcome', orientation: 'portrait' }}
                />
                <Stack.Screen name="Profile" component={ProfilePage} options={{ title: 'Welcome', orientation: 'landscape' }} />
                <Stack.Screen name="Login"
                              component={AuthLoginPage}
                              options={{
                                  title: 'Login',
                                  orientation: 'landscape',
                                  tapBarVisible: false,
                                  tabBarButton: (props) => null,
                                  tabBarStyle: { display: "none" },
                                  // headerShown: false
                }
                } />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: 'black'
    },
    screen: {
        backgroundColor: 'black'
    },
});
