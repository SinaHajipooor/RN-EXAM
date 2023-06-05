import { View, Text, StyleSheet, ScrollView, Image, TextInput, Alert, Pressable } from "react-native";
import { GlobalStyles } from "../constants/colors";
import { useState } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { login } from "../util/auth";
//-------------------------------------------------------------------------------------------------------------------------
const LoginScreen = ({ navigation }) => {
    //------------------------------------------
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    //------------------------------------------
    const [phoneNumber, setPhoneNumber] = useState("");
    const phoneNumberChangeHandler = (enteredPhoneNumber) => {
        setPhoneNumber(enteredPhoneNumber);
    };
    //------------------------------------------
    const loginHandler = async () => {
        if (phoneNumber.length == 11) {
            setIsAuthenticating(true);
            const data = await login(phoneNumber);
            setIsAuthenticating(false);
            navigation.navigate("Authenticate", { data: data });
        } else {
            Alert.alert("خطایی رخ داده است", "شماره همراه نامعتبر است");
        }
    };
    //------------------------------------------
    if (isAuthenticating) {
        return <LoadingOverlay message="منتظر بمانید" />;
    }
    //------------------------------------------
    return (
        <View style={styles.root}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image source={require("../assets/ExamImage.jpg")} style={styles.image} />
                </View>
                <View style={styles.infoContainer}>
                    <View
                        style={{
                            height: "60%",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TextInput
                            style={styles.inputContainer}
                            placeholder="شماره همراه"
                            keyboardType="phone-pad"
                            onChangeText={phoneNumberChangeHandler}
                            value={phoneNumber}
                        />
                        <Pressable style={styles.buttonContainer} onPress={loginHandler}>
                            <Text style={styles.buttonText}>ورود</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

//-----------------------------------------------------------------------------------------------------------------------------
export default LoginScreen;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        // alignItems: "center",
        backgroundColor: "white",
    },
    infoContainer: {
        alignItems: "center",
        width: "100%",
        height: 150,
        marginTop: 30,
    },
    inputContainer: {
        width: "90%",
        height: 60,
        borderRadius: 10,
        marginVertical: 20,
        padding: 10,
        backgroundColor: GlobalStyles.colors.background,
        elevation: 4,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        marginTop: 50,
    },

    buttonContainer: {
        width: "90%",
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: GlobalStyles.colors.darkblue,
        elevation: 4,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    imageContainer: { height: 370, marginTop: 10 },
    image: {
        width: 370,
        height: 300,
        marginTop: 20,
    },
});
