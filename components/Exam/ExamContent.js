import { GlobalStyles } from "../../constants/colors";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { fethQuestionAnswers } from "../../data/database";
import LoadingOverlay from "../UI/LoadingOverlay";
import ExamAnswer from "./ExamAnswer";
//-------------------------------------------------------------------------------------------------------
const ExamContent = ({ questions, index }) => {
    //----------------------------------------------
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState();

    //----------------------------------------------
    useEffect(() => {
        const getAnswers = async () => {
            setIsLoading(true);
            const answers = await fethQuestionAnswers(questions.questionId);
            setAnswers(answers);
            setIsLoading(false);
        };
        getAnswers();
    }, []);
    //----------------------------------------------
    if (isLoading) {
        return <LoadingOverlay message="صبر کنید" />;
    }
    //----------------------------------------------
    return (
        <ScrollView style={{ marginTop: 30, height: "100%" }}>
            <View style={styles.counter}>
                <Text style={styles.count}>{index + 1}</Text>
            </View>
            <View style={{ padding: 0 }}>
                <Text style={{ marginLeft: 55, fontSize: 16, fontWeight: "bold" }}>{questions.questionText}</Text>
            </View>
            <View style={styles.answersContainer}>
                <FlatList
                    style={{ marginTop: 50 }}
                    data={answers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => <ExamAnswer item={item} index={index + 1} checked={checked} setChecked={setChecked} />}
                />
            </View>
        </ScrollView>
    );
};
//-------------------------------------------------------------------------------------------------------
export default ExamContent;
const styles = StyleSheet.create({
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
        position: "absolute",
    },
    count: {
        color: "white",
        fontSize: 20,
    },
    answersContainer: { flex: 1 },
});
