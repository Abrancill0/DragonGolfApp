import { StyleSheet } from 'react-native';
import Colors from '../../../../utils/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    optionButton: {
        width: '100%',
        height: 70,
        borderBottomWidth: 0.8,
        borderColor: Colors.Gray,
        flexDirection: 'row'
    },
    iconView: {
        width: 60,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonNameView: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.Black
    },
    holeHeader: {
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 0.4,
        borderColor: Colors.Gray
    },
    holeTextView: {
        alignItems: 'flex-end',
        width: 50,
        paddingVertical: 5,
        justifyContent: 'space-evenly'
    },
    holeText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.Black
    },
    parText: {
        fontSize: 13,
        color: Colors.Primary,
        marginRight: 5
    },
    holesView: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    holeInfoView: {
        minWidth: 22,
        minHeight: 35,
        borderWidth: 0.5,
        borderColor: Colors.Black,
        borderRadius: 8,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginHorizontal: 1.5,
        paddingHorizontal: 3,
        paddingVertical: 1
    },
    holeNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.Black
    },
    parNumber: {
        fontSize: 12,
        color: Colors.Primary
    },
    scoreView: {
        width: '100%',
        paddingVertical: 5,
        flexDirection: 'row',
        borderBottomWidth: 0.8,
        borderColor: Colors.Gray
    },
    nickName: {
        fontSize: 13,
        color: Colors.Black,
        fontWeight: '400'
    },
    hcpNumber: {
        fontSize: 13,
        color: Colors.Black,
        fontWeight: '400',
        marginLeft: 5
    },
    strokesView: {
        width: 25,
        height: 30,
        borderWidth: 0.5,
        borderColor: Colors.Black,
        alignItems: 'center',
    },
    strokesTotalView: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    strokesTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.Black
    },
    advText: {
        fontSize: 10,
        textAlign: 'center',
        color: 'gray'
    },
    advStrokes: {
        fontSize: 11,
        fontWeight: 'bold',
        color: Colors.Primary,
        position: 'absolute',
        bottom: -1,
        right: 2
    },
    strokesTotalAdv: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.Primary,
    },
    advView: {
        width: 25,
        height: '100%',
        borderWidth: 0.5,
        borderColor: Colors.Black,
        alignItems: 'center',
        paddingVertical: 2
    }
});

export default styles;