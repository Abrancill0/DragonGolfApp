import { StyleSheet, Platform } from 'react-native';
import Colors from '../../../utils/Colors';

const styles = StyleSheet.create({
    betsView: {
        flexDirection: 'row',
        flex: 1,
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 5,
        marginLeft: 0
    },
    betTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.Black,
        textTransform: 'uppercase'
    },
    betListView: {
        width: '100%',
        minHeight: 110,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomWidth: 0.8,
        borderBottomColor: Colors.Gray,
    },
    betIndexView: {
        width: 20,
        height: 20,
        backgroundColor: Colors.Primary,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    betIndexText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.White
    },
    betGeneralInfoView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    advInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.Black
    },
    vsInfo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.Black
    },
    profitText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    betInfoView: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    betField: {
        width: '100%',
        height: 40,
        paddingHorizontal: 15,
        flexDirection: 'row',
    },
    betRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    betText: {
        fontSize: Platform.OS === 'ios' ? 15 : 18,
        width: 60,
    },
    dollarSym: {
        fontSize: 18,
        fontWeight: 'bold',
        minWidth: 16
    },
    betInput: {
        minWidth: 50,
        fontSize: 14,
        color: Colors.Black,
        marginVertical: 0,
        paddingVertical: 0,
        paddingHorizontal: 5,
        borderBottomWidth: 0.8,
        borderColor: Colors.Gray
    },
    switchView: {
        width: 50,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomButtom: {
        width: '100%',
        height: 55,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    pickerView: {
        width: '100%',
        height: Platform.OS === 'ios' ? null : 80,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profitView: {
        width: '100%',
        borderBottomWidth: 0.8,
        borderColor: Colors.Gray,
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profitNameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.Black
    },
    resumeView: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: 'gray'
    },
    betValueView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    useFactorView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    playerView: {
        height: 70,
        flex: 1,
        backgroundColor: Colors.White,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.Gray
    },
    imageView: {
        width: 60,
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
    checkView: {
        height: '100%',
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInput: {
        width: '95%',
        height: 40,
        alignSelf: 'center',
        marginHorizontal: 10,
        marginVertical:8,
        paddingHorizontal: 10,
        fontSize: 16,
        borderRadius: 10,
        backgroundColor: Colors.White,
        textTransform: 'uppercase'
    }
});

export default styles;