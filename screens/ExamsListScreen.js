import { Pressable, StyleSheet, Image, Alert, View, Text } from "react-native";
import { useLayoutEffect, useContext, useEffect, useState } from "react";
import { AuthContext } from "../data/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/colors";
import ExamsList from "../components/Exam/ExamsList";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { fetchUserExams, startUserExam } from "../data/database";
//-------------------------------------------------------------------------------------------------------------
const ExamsListScreen = ({ navigation }) => {
    //--------------------------------------------------
    const [isLoading, setIsLoading] = useState(false);
    const [userExams, setUserExams] = useState([]);
    //--------------------------------------------------
    // profile logo
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    <Pressable style={styles.imageContainer}>
                        <Image style={styles.image} source={require("../assets/userProfile.png")} />
                    </Pressable>
                );
            },
        });
    }, [navigation]);
    //--------------------------------------------------
    const authCtx = useContext(AuthContext);
    const confirmLogout = () => {
        return Alert.alert("آیا می خواهید از حساب خود خارج شوید ؟", "", [
            {
                text: "لغو",
                onPress: () => {},
                style: "cancel",
            },
            { text: "بله", onPress: authCtx.logout },
        ]);
    };
    //--------------------------------------------------
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable style={{ marginLeft: 0 }} onPress={confirmLogout}>
                    <Ionicons name="exit-outline" size={26} color={GlobalStyles.colors.darkblue} />
                </Pressable>
            ),
        });
    }, []);
    //-------------------------------------------------
    useEffect(() => {
        const getUserExams = async () => {
            setIsLoading(true);
            const userExams = await fetchUserExams();
            setUserExams(userExams);
            setIsLoading(false);
        };
        getUserExams();
    }, []);
    //-------------------------------------------------
    if (isLoading) {
        return <LoadingOverlay message="منتظر بمانید" />;
    }
    //-------------------------------------------------

    return <ExamsList userExams={userExams} />;
};
//-------------------------------------------------------------------------------------------------------------
export default ExamsListScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
    },
    imageContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});
