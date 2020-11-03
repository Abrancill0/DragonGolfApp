import { StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors';

const styles = StyleSheet.create({
    teeView: {
        flex: 1,
        backgroundColor: Colors.White,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.Gray,
        paddingVertical: 5
    },
    colorSquare: {
        width: 15,
        height: 15,
        marginLeft: 10
    },
    teeColorView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    teeNameView: {
        width: 70,
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: Colors.Secondary,
        marginLeft: 5,
        padding: 5
    },
    teeNameText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.White
    },
    arrowView: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoView: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    infoParView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    infoText: {
        fontSize: 15,
        color: Colors.Black,
    },
    valueText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.Black,
    },
    infoParText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.Black
    },
    yardsText: {
        fontSize: 12,
        color: Colors.Black,
    }
});

export default styles;