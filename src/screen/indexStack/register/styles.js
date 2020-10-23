import { StyleSheet, Dimensions } from 'react-native'
import Colors from '../../../utils/Colors';
import { Fonts } from '../../../utils/Fonts';

const styles = StyleSheet.create({
    header: {
        width: Dimensions.get('screen').width,
        height: 250,
        backgroundColor: 'black'
    },
    headerImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    headerText: {
        color: Colors.White,
        fontSize: 38,
        letterSpacing: 3,
        marginHorizontal: 15,
        marginVertical: 20,
        fontFamily: Fonts.BankGothic,
    },
    body: {
        flex: 1,
    },
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
    buttonsView: {
        alignSelf: 'center',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 20,
        marginTop: 20,
        paddingBottom: 50

    },
    bottomButtom: {
        width: '100%',
        height: 55,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 15,
        color: Colors.Black
    },
    imagePicker: {
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
    sheetView: {
        width: '100%',
        height: '90%',
        flexDirection: 'row'
    },
    sheetButton: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    phoneInputContainer: {
        width: '80%',
        height: 70,
        justifyContent: 'center',
        marginTop: 15,
        flexDirection: 'row'
    },
    showPasswordButton: {
        position: 'absolute',
        right: 10,
        bottom: 15
    }
});

export default styles;