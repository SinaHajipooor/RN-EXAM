import { useEffect, useReducer, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { fetchExamsQuestions, fethQuestionAnswers } from "../data/database";
import { GlobalStyles } from "../constants/colors";
import ExamHeader from "../components/Exam/ExamHeader";
import ExamContent from "../components/Exam/ExamContent";
//--------------------------------------------------------------------------------------------------------------------
const ExamQuestionScreen = ({ navigation, route }) => {
    //-------------------------------------------------
    const examId = route.params.examId;
    const questionsCount = route.params.questionsCount;
    const courseName = route.params.courseName;
    //-------------------------------------------------
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const flatListRef = useRef();
    //-------------------------------------------------
    // get all thye questions
    useEffect(() => {
        const getQuestions = async () => {
            setIsLoading(true);
            const questions = await fetchExamsQuestions(examId);
            setQuestions(questions);
            setIsLoading(false);
        };
        getQuestions();
    }, []);
    //-------------------------------------------------
    const nextButtonHandler = () => {};

    //-------------------------------------------------

    if (isLoading) {
        return <LoadingOverlay message="منتظر بمانید" />;
    }

    //-------------------------------------------------
    return (
        <View style={styles.root}>
            <View style={styles.headerContainer}>
                <ExamHeader questionsCount={questionsCount} courseName={courseName} />
            </View>
            <View style={styles.contentContainer}>
                <FlatList
                    ref={flatListRef}
                    data={questions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => <ExamContent questions={item} index={index} />}
                />
                <View style={styles.footerContainer}>
                    <View style={styles.buttonsContainer}>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>قبلی</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={nextButtonHandler}>
                            <Text style={styles.buttonText}>بعدی</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};
//--------------------------------------------------------------------------------------------------------------------
export default ExamQuestionScreen;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    headerContainer: {
        width: "100%",
        height: "12%",
        marginTop: 25,
        borderRadius: 10,
        backgroundColor: "white",
        elevation: 8,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
    },
    contentContainer: {
        flex: 1,
        width: "100%",
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: "white",
        elevation: 8,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
    },
    counter: {
        paddingHorizontal: 12,
        borderRadius: 8,
        elevation: 3,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: GlobalStyles.colors.darkblue,
        marginLeft: 10,
    },
    count: {
        color: "white",
        fontSize: 20,
    },
    textsContainer: {
        justifyContent: "flex-start",
        marginHorizontal: 10,
    },
    tabsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        backgroundColor: "white",
        elevation: 4,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 8,
        height: "90%",
    },
    footerContainer: {
        width: "100%",
        height: "9%",
        // borderWidth: 1,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    paginate: {
        width: "90%",
        height: "90%",
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: GlobalStyles.colors.background,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        borderWidth: 0.5,
        borderColor: "gray",
    },
    buttonsContainer: {
        height: "100%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        backgroundColor: GlobalStyles.colors.darkblue,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 8,
        marginHorizontal: 15,
    },
    buttonText: {
        color: "white",
    },
});
