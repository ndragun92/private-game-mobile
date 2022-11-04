import {Text, Button, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {useAuth} from "../composables/useAuth";

const ProfilePage = ({ navigation }: {navigation: any}) => {

    const { logOut } = useAuth()

    async function onLogOut() {
        await logOut(navigation)
    }

    return<View style={tw`mt-10`}>
            <Button title='Log Out' onPress={onLogOut}></Button>
        </View>;
};

export default ProfilePage