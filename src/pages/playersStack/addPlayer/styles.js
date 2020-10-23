import { StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors';

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
    emptyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 80
    },
    emptyText: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',
        marginTop: 10
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
        paddingHorizontal: 20,
    },
    imagePicker: {
        marginTop: 20,
        width: 90,
        height: 90,
        backgroundColor: Colors.Dark,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    imagePickerText: {
        color: Colors.White,
        fontSize: 16,
        position: 'absolute',
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    phoneInputContainer: {
        width: '80%',
        height: 70,
        justifyContent: 'center',
        marginTop: 15,
        flexDirection: 'row'
    },
    asButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        paddingHorizontal: 5,
        paddingVertical: 5,
        alignSelf: 'center',
        marginTop: 20,
    },
    asButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.Black
    },
    asView: {
        width: '80%',
        alignSelf: 'center',
        paddingTop: 10
    },
    radioButtonView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        margin: 5
    },
    radioGroupView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottomWidth: 0.8,
        borderBottomColor: Colors.Gray,
        marginBottom: 10
    },
    radioButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.Primary
    },
    question: {
        maxWidth: '80%',
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.Black,
        textAlign: 'left'
    },
    switchView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomWidth: 0.8,
        borderBottomColor: Colors.Gray,
        marginBottom: 10
    },
    costInput: {
        minWidth: 50,
        fontSize: 14,
        color: Colors.Black,
        marginVertical: 0,
        paddingVertical: 0,
        paddingHorizontal: 5,
        borderBottomWidth: 0.8,
        borderColor: Colors.Gray
    },
    costInputView: {
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 70,
        height: 40,
    },
    switchText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.Black
    },
    dollarText: {
        fontSize: 14,
        color: Colors.Black,
        borderBottomWidth: 0.8,
        borderColor: Colors.Gray,
        paddingLeft: 5
    }
});

export default styles;