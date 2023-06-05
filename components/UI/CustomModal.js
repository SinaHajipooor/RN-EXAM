import { View, StyleSheet, Modal, Animated } from "react-native";
import { useState, useEffect, useRef } from "react";
//------------------------------------------------------------------------------------------------------------------------
const ModalPoup = ({ visible, children }) => {
    //------------------------------------------------------------------
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(0)).current;
    //------------------------------------------------------------------
    useEffect(() => {
        toggleModal();
    }, [visible]);
    //------------------------------------------------------------------
    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };
    //------------------------------------------------------------------
    return (
        <Modal transparent visible={showModal} onRequestClose={() => setShowModal(false)}>
            <View style={styles.modalBackGround}>
                <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>{children}</Animated.View>
            </View>
        </Modal>
    );
};
//------------------------------------------------------------------------------------------------------------------------
export default ModalPoup;

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "75%",
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        elevation: 20,
    },
    header: {
        width: "100%",
        // height: 40,
        alignItems: "flex-start",
        justifyContent: "center",
        // borderWidth: 1,
    },
});
