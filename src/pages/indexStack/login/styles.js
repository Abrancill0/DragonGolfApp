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
        fontSize: 30,
        letterSpacing: 3,
        marginHorizontal: 15,
        marginVertical: 20,
        fontFamily: Fonts.BankGothic
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 30
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
        paddingVertical: 20,
        marginTop: 20,

    },
    button: {
        paddingHorizontal: 15,
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
    selectlanguage: {
        width: 150,
        height: 50,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingRight: 0
    }
});

export default styles;