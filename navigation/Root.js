import { useState, useContext, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../data/auth-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import Navigation from "./Navigation";
import * as FileSystem from "expo-file-system";
import * as Asset from "expo-asset";
import * as SQLite from "expo-sqlite";

//-----------------------------------------------------------------------------------------------------------------
const Root = () => {
    //---------------------------------------------------------
    const authCtx = useContext(AuthContext);
    const [isLoading, setISLoading] = useState(false);
    //--------------------------------------------------------
    useEffect(() => {
        const fetchToken = async () => {
            setISLoading(true);
            const storedToken = await AsyncStorage.getItem("token");
            const userId = await AsyncStorage.getItem("userId");
            if (storedToken) {
                authCtx.authenticate(storedToken, userId);
            }
            setISLoading(false);
        };
        fetchToken();
    }, []);
    // -----------------------------------------------------------
    useEffect(() => {
        const openDatabase = async () => {
            if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")).exists) {
                await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite");
            }
            await FileSystem.downloadAsync(Asset.Asset.fromModule(require("../data/Exams.db")).uri, FileSystem.documentDirectory + "SQLite/Exams.db");
            return SQLite.openDatabase("Exams.db");
        };
        openDatabase();
    }, []);
    //--------------------------------------------------------
    if (isLoading) {
        return <LoadingOverlay message="منتظر بمانید" />;
    }
    //--------------------------------------------------------
    return <Navigation />;
};
//-------------------------------------------------------------------------------------------------------------------
export default Root;
