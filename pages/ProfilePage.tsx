import {Text, Button, View} from "react-native";
import tw from "tailwind-react-native-classnames";
// import {useAuth} from "../composables/useAuth";
import WebView from "react-native-webview";

const ProfilePage = ({ navigation }: {navigation: any}) => {

    // const { logOut } = useAuth()
    //
    // async function onLogOut() {
    //     await logOut(navigation)
    // }

    return <WebView
        scalesPageToFit={true}
        bounces={false}
        javaScriptEnabled
        scollEnabled={false}
        style={{ height: '100%', width: '100%' }}
        source={{ uri: 'https://heroes-of-the-universe-ui.herokuapp.com/login' }}
        automaticallyAdjustContentInsets={false}
        javaScriptCanOpenWindowsAutomatically={true}
        applicationNameForUserAgent='Heroes Of The Universe'
    />
};

export default ProfilePage