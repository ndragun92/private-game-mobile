import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAuth() {
    async function authenticated() {
        let token;
        try {
            token = await AsyncStorage.getItem("token");
        } catch(e) {
            // read error
        }
        return !!token
    }
    async function logOut(navigation: any) {
        let success = false
        try {
             await AsyncStorage.removeItem("token");
            success = true
        } catch(e) {
            // read error
        }
        console.log('logOut', success);
        if(success) {
            navigation.navigate('Login')
        }
        return success
    }
    return { authenticated, logOut };
}
