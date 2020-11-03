import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.Black,
        textAlign: 'center',
        marginBottom: 30
    },
    info: {
        fontSize: 16,
        color: Colors.Black,
        textAlign: 'justify',
        marginBottom: 50,
    },
    retrieved: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'gray'
    }
});

export default styles;