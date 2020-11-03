import { StyleSheet } from "react-native";
import Colors from "../../../../utils/Colors";

const styles = StyleSheet.create({
    infoView: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.7,
        borderColor: Colors.Gray
    },
    nickname: {
        fontSize: 15,
        color: Colors.Primary,
        fontWeight: 'bold',
        minWidth: 60
    },
    hcpText: {
        fontSize: 11,
        color: 'gray'
    },
    hcp: {
        fontSize: 15,
        color: Colors.Primary
    },
    typeText: {
        fontSize: 14,
        color: 'gray',
        marginRight: 10
    },
    strokes: {
        fontSize: 13,
        color: 'darkgray',
    },
    advStrokes: {
        fontSize: 16,
        color: Colors.Black,
    },
    winner: {
        fontSize: 10,
        color: Colors.Primary,
        alignSelf: 'flex-end'
    }
});

export default styles;