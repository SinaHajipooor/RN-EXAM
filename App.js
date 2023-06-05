import { StatusBar } from "expo-status-bar";
import AuthContextProvider from "./data/auth-context";
import Root from "./navigation/Root";
import { I18nManager } from "react-native";
//-----------------------------------------------------------
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
//--------------------------------------------------------------------------------------------------------------------------
export default function App() {
    return (
        <>
            <StatusBar style="dark" />
            <AuthContextProvider>
                <Root />
            </AuthContextProvider>
        </>
    );
}
//--------------------------------------------------------------------------------------------------------------------------
