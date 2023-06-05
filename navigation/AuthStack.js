import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import AuthenticateScreen from "../screens/AuthenticateScreen";
const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Authenticate" component={AuthenticateScreen} />
        </Stack.Navigator>
    );
};

export default AuthStack;
