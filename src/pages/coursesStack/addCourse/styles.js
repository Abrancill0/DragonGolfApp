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
    countryPickerView: {
        width: '80%',
        height: 60,
        marginVertical: 20,
    },
    countryText: {
        fontSize: 16,
        color: Colors.Black,
        marginBottom: 10
    },
    bottomButtom: {
        width: '100%',
        height: 55,
        paddingVertical: 10,
        paddingHorizontal: 20
    }
});

export default styles;