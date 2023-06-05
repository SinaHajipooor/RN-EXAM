import { useState } from "react";
import { FlatList, View, Text, StyleSheet, Pressable, Dimensions, Image } from "react-native";
import ExamItem from "./ExamItem";
import { GlobalStyles } from "../../constants/colors";
import ModalPoup from "../UI/CustomModal";
//----------------------------------------------------------------------------------------------------------------------------
const ExamsList = ({ userExams }) => {
    //-------------------------------------------
    const [status, setStatus] = useState("همه");
    const [examsList, setExamsList] = useState(userExams);
    //-------------------------------------------
    const setListStatusFilter = (status) => {
        if (status !== "همه") {
            setExamsList([...userExams.filter((exam) => exam.examStatus === status)]);
        } else {
            setExamsList(userExams);
        }
        setStatus(status);
    };
    //-------------------------------------------
    const tabs = [
        {
            listStatus: "در انتظار شروع",
            key: 1,
        },
        {
            listStatus: "همه",
            key: 2,
        },
        {
            listStatus: "در حال برگزاری",
            key: 3,
        },
    ];
    //-------------------------------------------
    const renderExamItem = (itemData) => {
        const item = itemData.item;

        return <ExamItem item={item} />;
    };
    //-------------------------------------------
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.tabsContainer}>
                {tabs.map((tab) => (
                    <Pressable
                        style={[styles.tab, status === tab.listStatus && styles.activeTab]}
                        onPress={() => setListStatusFilter(tab.listStatus)}
                        key={tab.key}
                    >
                        <Text style={[status === tab.listStatus && styles.activeTabText]}>{tab.listStatus}</Text>
                    </Pressable>
                ))}
            </View>
            <FlatList data={examsList} keyExtractor={(item) => item.id} renderItem={renderExamItem} />
        </View>
    );
};
//----------------------------------------------------------------------------------------------------------------------------

export default ExamsList;

const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: 10,
        marginTop: 20,
        backgroundColor: "white",
        elevation: 4,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 12,
    },
    tab: {
        width: Dimensions.get("window").width / 3.1,
        flexDirection: "row",
        borderColor: "#ebebeb",
        padding: 12,
        justifyContent: "center",
    },
    activeTab: {
        backgroundColor: GlobalStyles.colors.darkblue,
        borderRadius: 10,
    },
    activeTabText: {
        color: GlobalStyles.colors.white,
    },
});
