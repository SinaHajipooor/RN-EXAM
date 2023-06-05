import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExamsListScreen from "../screens/ExamsListScreen";
import ExamQuestionScreen from "../screens/ExamQuestionScreen";

//-----------------------------------------------------------------------------------------------------------------------------
const Stack = createNativeStackNavigator();
//------------------------------------------------------------
const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ExamsList" component={ExamsListScreen} options={{ title: "فهرست آزمون ها", headerTitleAlign: "center" }} />
            <Stack.Screen name="ExamQuestions" component={ExamQuestionScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};
//-----------------------------------------------------------------------------------------------------------------------------
export default StackNavigator;
