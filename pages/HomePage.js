import {Button, View} from "react-native";

const HomePage = ({ navigation }) => {
    return (
        <View>
            <Button
                title="Go to Jane's profile"
                onPress={() =>
                    navigation.navigate('Profile', { name: 'Jane' })
                }
            />
            <Button
                title="Login"
                onPress={() =>
                    navigation.navigate('Login', { name: 'Nemanja' })
                }
            />
        </View>
    );
};

export default HomePage