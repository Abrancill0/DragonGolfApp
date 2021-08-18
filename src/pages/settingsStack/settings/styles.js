import { StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors';

const styles = StyleSheet.create({
    profileCard: {
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 20,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        padding: 10,
        borderRadius: 10,
        marginBottom: 2.5
    },
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
        justifyContent: 'center',
        backgroundColor: Colors.White
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 11,
        color: Colors.Black,
        textAlign: 'center'
    },
    imageNameView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userInfoView: {
        paddingHorizontal: 10
    },
    infoGolfView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 20
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'gray'
    },
    cardInfo: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.Black
    },
    textLink: {
        fontSize: 11,
        color: Colors.Blue
    },
    optionSection: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 0.8,
        borderColor: Colors.Gray,
        marginBottom: 10
    },
    settingsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 10,
        marginTop: 30
    },
    optionsText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.Black,
        width: '75%',
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
    optionView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    bottomButtom: {
        width: '100%',
        height: 55,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    nicknameText: {
        fontSize: 10,
        color: 'gray',
        fontWeight: 'bold',
        marginLeft: 10,
        textTransform: 'uppercase'
    },
    dollarText: {
        fontSize: 14,
        color: Colors.Black,
        borderBottomWidth: 0.8,
        borderColor: Colors.Gray,
        paddingLeft: 5
    },
    radioButtonView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        margin: 5,
    },
    radioButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.Primary
    },
    whoGetButton: {
        width: '100%',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textButton: {
        fontSize: 16,
        marginTop: 30,
        color: Colors.Primary,
        textDecorationLine: 'underline'
    },
});

export default styles;