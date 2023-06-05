import { View, StyleSheet, Text } from "react-native";
import Timer from "../UI/Timer";

//-------------------------------------------------------------------------------------------------------------------------------
const ExamHeader = ({ questionsCount, courseName }) => {
    //--------------------------------------------------------
    return (
        <View style={styles.container}>
            <View style={styles.part1}>
                <Text style={{ fontWeight: "bold", marginLeft: 7 }}>{`نام دوره : ${courseName}`}</Text>
                <Text style={{ fontWeight: "bold", marginLeft: 7 }}>{`تعداد سوالات : ${questionsCount}`}</Text>
            </View>
            <View style={styles.part2}>
                <Timer />
            </View>
        </View>
    );
};
//-------------------------------------------------------------------------------------------------------------------------------

export default ExamHeader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        // borderWidth: 1,
    },
    part1: {
        // borderWidth: 1,
        height: "100%",
        width: "60%",
        justifyContent: "space-around",
    },
    part2: {
        // borderWidth: 1,
        flex: 1,
        height: "100%",
        justifyContent: "center",
    },
});
