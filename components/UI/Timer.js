import { Pressable, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { GlobalStyles } from "../../constants/colors";

const Timer = () => {
    //----------------------------------------------------------
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);
    //----------------------------------------------------------
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [seconds]);
    //------------------------------------------------------------
    return (
        <View
            style={{
                flexDirection: "row",
                width: "100%",
                marginTop: 15,
                height: "30%",
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                justifyContent: "center",
                alignItems: "baseline",
            }}
        >
            <Text style={{ color: GlobalStyles.colors.darkblue }}>
                {minutes < 10 ? `0${minutes} : ` : minutes}
                {`${seconds < 10 ? `0${seconds}` : seconds} `}
            </Text>
        </View>
    );
};

export default Timer;
