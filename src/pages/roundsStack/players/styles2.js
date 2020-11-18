import { StyleSheet, Platform } from 'react-native';
import Colors from '../../../utils/Colors';

const styles = StyleSheet.create({
    holesHeader: {
        flexDirection: 'row',
        padding: 10
    },
    rectangleElement: {
        width: 60,
        height: 30,
        marginHorizontal: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
    },
    holeText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: Colors.Primary
    },
    headerText: {
        fontSize: 16,
        color: Colors.Black
    },
    holeNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.Black
    },
    input: {
        width: '95%',
        height: '100%',
        borderWidth: 1,
        borderColor: Colors.Primary,
        borderRadius: 7,
        paddingVertical: 0,
        paddingHorizontal: 5,
        fontSize: Platform.OS === 'ios' ? 14 : 16,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 40
    },
    inputsView: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'center'
    },
    bottomButtom: {
        width: '100%',
        height: 55,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
});

export default styles;