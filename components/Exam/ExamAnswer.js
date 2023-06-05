import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
//------------------------------------------------------------------------------------------------------------
const ExamAnswer = ({ item, index, checked, setChecked }) => {
    //---------------------------------------------
    return (
        <View style={styles.answerContainer}>
            <RadioButton value={`${index}`} status={checked === `${index}` ? "checked" : "unchecked"} onPress={() => setChecked(`${index}`)} />
            <View style={{ flexDirection: "row" }}>
                <Text style={{ marginTop: 2, fontSize: 18 }}>{` -${index}`}</Text>
                <Text style={{ marginTop: 7 }}>{item.answerText}</Text>
            </View>
        </View>
    );
};
//------------------------------------------------------------------------------------------------------------
export default ExamAnswer;

const styles = StyleSheet.create({
    answerContainer: {
        flexDirection: "row",
        marginTop: 20,
    },
});
