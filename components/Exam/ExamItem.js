import { View, StyleSheet, Platform, Text, Image, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/colors";
import { useEffect, useState } from "react";
import ModalPoup from "../UI/CustomModal";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { startUserExam } from "../../data/database";
import LoadingOverlay from "../UI/LoadingOverlay";
//-------------------------------------------------------------------------------------------------------------------
const ExamItem = ({ item }) => {
    //-------------------------------------------
    const [visible, setVisible] = useState(false);
    const [currentLocation, setCurrentLocation] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    //-------------------------------------------
    useEffect(() => {
        const getPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }
            let { coords } = await Location.getCurrentPositionAsync({});
            setCurrentLocation({
                lat: coords.latitude,
                lng: coords.longitude,
            });
        };
        getPermission();
    }, []);
    //-------------------------------------------
    let textColor;
    if (item?.examStatus === "در حال برگزاری") {
        textColor = GlobalStyles.colors.darkGreen;
    } else if (item?.examStatus === "پایان یافته") {
        textColor = GlobalStyles.colors.gray700;
    } else if (item?.examStatus === "در انتظار شروع") {
        textColor = GlobalStyles.colors.orange;
    } else {
        textColor = GlobalStyles.colors.red;
    }
    //-------------------------------------------
    // start exam
    const startExam = () => {
        const examStartTime = new Date().toISOString();
        const location = JSON.stringify(currentLocation);
        // startUserExam(examStartTime, location, "no photo", item.id);
        console.log(examStartTime);
        console.log(location);
        navigation.navigate("ExamQuestions", { examId: item.id, questionsCount: item.examQuestionsCount, courseName: item.courseName });
    };
    //-------------------------------------------
    if (isLoading) {
        return <LoadingOverlay message="منتطر بمانید" />;
    }

    //-------------------------------------------

    return (
        <>
            <ModalPoup visible={visible}>
                <View style={{ alignItems: "center" }}>
                    <Image source={require("../../assets/warning3.png")} style={{ height: 60, width: 60, marginVertical: 10 }} />
                </View>
                <Text style={{ marginVertical: 25, fontSize: 17, textAlign: "center", fontWeight: "bold" }}>آیا از شروع آزمون اطمینان دارید ؟</Text>
                <View style={styles.buttonsContainer}>
                    <Pressable style={[styles.modalButtons, { backgroundColor: GlobalStyles.colors.lightgreen }]} onPress={startExam}>
                        <Text style={{ fontWeight: "bold", fontSize: 12 }}>مطـمئنم</Text>
                    </Pressable>
                    <Pressable style={[styles.modalButtons, { backgroundColor: "lightcoral" }]} onPress={() => setVisible(false)}>
                        <Text style={{ fontWeight: "bold", fontSize: 12 }}>انصراف</Text>
                    </Pressable>
                </View>
            </ModalPoup>
            <View style={styles.examItem}>
                <View style={styles.itemPart1}>
                    <Text style={{ marginLeft: 10, fontWeight: "bold" }}>{`درس : ${item.lessonName}`}</Text>
                    <Text style={{ marginLeft: 10, fontWeight: "bold" }}>{`دوره : ${item.courseName}`}</Text>
                </View>
                <View style={styles.itemPart2}>
                    <Text style={{ marginLeft: 5, color: GlobalStyles.colors.darkGreen }}>
                        شروع : <Text style={{ fontSize: 11 }}>{`${item?.examStartTime}`}</Text>
                    </Text>
                    <Text style={{ marginLeft: 5, color: GlobalStyles.colors.red }}>
                        پایان : <Text style={{ fontSize: 11 }}>{`${item?.examEndTime}`}</Text>
                    </Text>
                </View>
                <View style={styles.itemPart3}>
                    <Text style={{ marginTop: 5, color: textColor, fontWeight: "bold" }}>{`${item?.examStatus}`}</Text>
                    {item?.examStatus === "در حال برگزاری" ? (
                        <Pressable style={styles.button} onPress={() => setVisible(true)}>
                            <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>شروع آزمون</Text>
                        </Pressable>
                    ) : null}
                </View>
            </View>
        </>
    );
};

//-------------------------------------------------------------------------------------------------------------------

export default ExamItem;

const styles = StyleSheet.create({
    examItem: {
        margin: 8,
        borderRadius: 8,
        overflow: Platform.OS === "android" ? "hidden" : "visible",
        backgroundColor: "white",
        elevation: 4,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        height: 120,
        flexDirection: "row",
    },
    itemPart1: {
        width: "34%",
        justifyContent: "space-around",
    },
    itemPart2: {
        width: "35%",
        marginLeft: 5,
        justifyContent: "space-around",
    },
    itemPart3: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },
    button: {
        width: "80%",
        height: "29%",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: GlobalStyles.colors.darkblue,
        elevation: 4,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
    },
    // modal
    buttonsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: 14,
        marginTop: 5,
    },
    modalButtons: {
        // marginHorizontal: 10,
        padding: 10,
        paddingHorizontal: 50,
        borderRadius: 10,
    },
});
