import { StyleSheet } from "react-native";
import Colors from "../../../utils/Colors";

const styles = StyleSheet.create({
    headersView: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    headers: {
        flex: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: Colors.Gray,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0,
        justifyContent: 'center',
        backgroundColor: Colors.White
    },
    headers2: {
        flex: 0.5,
        borderBottomWidth: 1,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: Colors.Gray,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0,
        justifyContent: 'center',
        backgroundColor: Colors.White
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: Colors.Black,
        textAlign: 'center'
    },
    rowView: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
    },
    rowText: {
        fontSize: 10,
        color: Colors.Black,
        textAlign: 'center'
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: Colors.Black,
        padding: 10,
        fontWeight: '300',
        textAlignVertical: 'top'
    }
});

export default styles;