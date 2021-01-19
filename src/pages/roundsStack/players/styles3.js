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
    imageNameView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfoView: {
        paddingHorizontal: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    nicknameText: {
        fontSize: 10,
        color: 'gray',
        fontWeight: 'bold',
        marginLeft: 10,
        textTransform: 'uppercase'
    },
    textLink: {
        fontSize: 13,
        color: Colors.Blue,
        marginBottom: 3
    },
    infoGolfView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 20,
        justifyContent: 'space-between'
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
        fontSize: 16,
        color: Colors.Black,
        marginVertical: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
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
    },
    bottomButtom: {
        width: '100%',
        height: 55,
        paddingVertical: 10,
        paddingHorizontal: 20,
    }
});

export default styles;