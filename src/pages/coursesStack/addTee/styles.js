import { StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors';

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        height: 70,
        justifyContent: 'center',
        marginTop: 5,
    },
    twoInputContainer: {
        width: '45%',
        height: 70,
        justifyContent: 'center',
    },
    bottomButtom: {
        width: '100%',
        height: 55,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    colorPickerView: {
        height: 250,
        width: '90%',
        paddingTop: 20,
        alignSelf: 'center',
    },
    teeColorText: {
        fontSize: 16,
        color: Colors.Black,
        fontWeight: 'bold'
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    modalColorPicker: {
        width: '80%',
        backgroundColor: Colors.White,
        height: 315,
        borderRadius: 20,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27
    },
    modalOkButton: {
        alignSelf: 'flex-end',
        paddingHorizontal: 25,
        paddingVertical: 30,
    },
    modalOkText: {
        fontSize: 20,
        color: Colors.Primary
    }
});

export default styles;