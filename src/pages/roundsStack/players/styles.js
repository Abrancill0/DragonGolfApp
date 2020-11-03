import { StyleSheet, Platform } from 'react-native';
import Colors from '../../../utils/Colors';

const styles = StyleSheet.create({
    playerView: {
        height: 70,
        flex: 1,
        backgroundColor: Colors.White,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.Gray
    },
    arrowView: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameView: {
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'flex-end',
        paddingBottom: 5
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.Black
    },
    lastnameText: {
        fontSize: 15,
        color: Colors.Black
    },
    infoView: {
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    handicapView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    shortName: {
        fontSize: 17,
        color: Colors.Primary
    },
    handicapText: {
        fontSize: 13,
        color: Colors.Black,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    handicapNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.Black
    },
    imageView: {
        width: 60,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
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
    roundPlayerNameView: {
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingVertical: 5,
    },
    roundPlayerImageView: {
        width: 25,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    hcpInfoView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(1,1,1,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '90%',
        height: '70%',
        paddingBottom: 10,
        backgroundColor: Colors.White,
        borderRadius: 10
    },
    closeModalView: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    closeModalButton: {
        paddingHorizontal: 10
    },
    teeView: {
        flex: 1,
        backgroundColor: Colors.White,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.Gray,
        paddingVertical: 5
    },
    infoTeeView: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    valueText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.Black,
    },
    infoParView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoParText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.Black
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.Black,
        paddingLeft: 10
    },
    input: {
        width: 50,
        height: 30,
        borderBottomWidth: 1,
        borderColor: Colors.Gray,
        textAlign: 'center',
        marginRight: 20,
        fontWeight: 'bold'
    },
    operatorButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: Platform.OS === 'ios' ? 'lightgray' : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        margin: 3,
        borderWidth: Platform.OS === 'ios' ? 0 : 0.8,
        borderColor: Colors.Gray,
    },
    operatorButtonBlur: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 15
    },
    dragView: {
        width: 30,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;