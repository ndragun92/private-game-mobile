import React from 'react';
import { View, Image, StyleSheet, Alert, TextInput, Text, Pressable } from 'react-native';
import { AccountsController } from '../../../api/Controllers/Http/Account/AccountsController';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../composables/useAuth';
// import {StatusBar} from "expo-status-bar";

const AuthLoginPage = ({ navigation }: { navigation: any }) => {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [inputColor, onChangeInputColor] = React.useState('text-white');

  async function isAuthenticated() {
    const { authenticated } = useAuth();
    if (await authenticated()) {
      navigation.navigate('Profile');
    }
  }

  isAuthenticated();

  // Alert
  const alert = (title: string, message: string) =>
    Alert.alert(
      title,
      message,
      [
        // {
        //     text: "Cancel",
        //     onPress: () => console.log("Cancel Pressed"),
        //     style: "cancel"
        // },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      {
        userInterfaceStyle: 'dark',
        cancelable: true,
      }
    );

  return (
    <View style={tw`w-full h-full`}>
      <Image style={tw`w-full h-full`} source={require('../../../assets/images/server/bg.jpg')} />
      <Image
        style={[tw`absolute top-8 left-8`, { width: 128, height: 128 }]}
        source={require('../../../assets/images/logo.png')}
      />
      <View style={tw`absolute top-0 right-0 bottom-0 left-0 justify-center items-center`}>
        <View style={[tw`bg-black bg-opacity-75 p-4 text-white`, styles.form]}>
          <Text style={tw`uppercase font-bold text-white text-center mb-4 text-lg`}>Login</Text>
          <View>
            <Text style={tw`mb-1 font-semibold text-white`}>Email</Text>
            <TextInput
              style={tw`bg-blue-400 w-full bg-opacity-50 px-3 w-full h-10 border border-blue-500 ${inputColor}`}
              onChangeText={onChangeEmail}
              autoComplete='email'
              autoCapitalize='none'
              keyboardType='email-address'
              placeholder='Your email...'
              placeholderTextColor="#fff"
              onFocus={() => onChangeInputColor('text-black')}
              onBlur={() => onChangeInputColor('text-white')}
              onEndEditing={() => onChangeInputColor('text-white')}
              value={email}
            />
          </View>
          <View style={tw`mt-2`}>
            <Text style={tw`mb-1 font-semibold text-white`}>Password</Text>
            <TextInput
              style={tw`bg-blue-400 w-full bg-opacity-50 px-3 w-full h-10 border border-blue-500 text-white`}
              secureTextEntry={true}
              onChangeText={onChangePassword}
              autoComplete='password'
              placeholder='Your password...'
              placeholderTextColor="#fff"
              value={password}
            />
          </View>
          <View style={tw`mt-4`}>
            <Pressable
              style={tw`bg-white w-full bg-opacity-75 text-black px-2 h-10 font-semibold border border-white flex items-center justify-center`}
              onPress={onLogin}
            >
              <Text>Login</Text>
            </Pressable>
          </View>
          <View style={tw`mt-4`}>
            <Text style={tw`text-sm text-white`}>Don't have account yet?</Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={tw`text-sm text-blue-400`}>Click here to register</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/*<StatusBar hidden/>*/}
    </View>
  );

  async function onLogin() {
    const { login } = AccountsController();
    const response = await login({
      email,
      password,
    });
    if (response.success) {
      navigation.navigate('Profile');
    } else {
      alert('Error', response.data.message);
    }
  }
};

export default AuthLoginPage;

const styles = StyleSheet.create({
  form: { width: 300 },
});
