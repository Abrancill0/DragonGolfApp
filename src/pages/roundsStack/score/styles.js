import {StyleSheet, Platform} from 'react-native';
import Colors from '../../../utils/Colors';

const styles = StyleSheet.create({
    headerButton: {
        width: 75,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    roundRipple: {
        width: 55,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonText: {
        fontSize: 13,
        color: Colors.Primary
    },
    playerScoreView: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        borderBottomWidth: 0.8,
        borderColor: Colors.Gray,
    },
    playerScoreNameView: {
        width: 70,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerScoreNameText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.Black
    },
    inputView: {
        width: 60,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: 45,
        height: 30,
        borderRadius: 5,
        borderWidth: 0.8,
        borderColor: Colors.Primary,
        textAlign: 'center',
        padding: 5,
        fontSize: Platform.OS === 'ios' ? 15 : 18,
        fontWeight: 'bold'
    },
    buttonGroupView: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    holeHeader: {
        width: '100%',
        height: 10,
    },
    holeView: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    holeTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.Black
    },
    holeNumberView: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.8,
        borderRadius: 12.5,
        marginTop: 5,
        borderColor: Colors.Secondary,
    },
    holeNumber: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.Black,
    },
    courseName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.Primary,
        paddingLeft: 15,
        paddingVertical: 5
    },
    cityName: {
        fontSize: 16,
        color: Colors.Black,
        paddingLeft: 15,
    },
    dataValues: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.Primary,
        marginLeft: 5,
        marginRight: 15
    },
    holeHeaderView: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 0.8,
        borderColor: Colors.Gray,
        paddingBottom: 10
    },
    birdieButtonView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2.5,
        borderWidth: 1,
        borderColor: Colors.Black,
        backgroundColor: Colors.Birdie,
        borderRadius: 20,
        paddingHorizontal: 3
    },
    parButtonView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2.5,
        borderWidth: 1,
        borderColor: Colors.Black,
        backgroundColor: Colors.Par,
        paddingHorizontal: 3
    },
    bogeyButtonView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2.5,
        borderWidth: 1,
        borderColor: Colors.Black,
        backgroundColor: Colors.Bogey,
        paddingHorizontal: 3
    },
    dblButtonView1: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2.5,
        borderWidth: 1,
        borderColor: Colors.Black,
    },
    dblButtonView2: {
        width: 36.5,
        height: 36.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.Black,
        backgroundColor: Colors.DBL,
        paddingHorizontal: 3
    },
    eagleInput1: {
        width: 32,
        height: 32,
        borderRadius: 15,
        borderWidth: 0.8,
        borderColor: Colors.Black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eagleInput2: {
        width: 27,
        height: 27,
        borderRadius: 15,
        borderWidth: 0.8,
        borderColor: Colors.Black,
        textAlign: 'center',
        fontSize: Platform.OS === 'ios' ? 15 : 18,
        fontWeight: 'bold'
    },
    birdieInput: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 0.8,
        borderColor: Colors.Black,
        textAlign: 'center',
        padding: 5,
        fontSize: Platform.OS === 'ios' ? 15 : 18,
        fontWeight: 'bold'
    },
    parInput: {
        width: 30,
        height: 30,
        borderWidth: 0.3,
        borderColor: Colors.Par,
        textAlign: 'center',
        padding: 5,
        fontSize: Platform.OS === 'ios' ? 15 : 18,
        fontWeight: 'bold'
    },
    bogeyInput: {
        width: 30,
        height: 30,
        borderWidth: 0.3,
        borderColor: Colors.Bogey,
        textAlign: 'center',
        padding: 5,
        fontSize: Platform.OS === 'ios' ? 15 : 18,
        fontWeight: 'bold'
    },
    dblInput1: {
        width: 35,
        height: 35,
        borderWidth: 0.5,
        borderColor: Colors.Black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dblInput2: {
        width: 30,
        height: 30,
        borderWidth: 0.5,
        borderColor: Colors.Black,
        textAlign: 'center',
        padding: 5,
        fontSize: Platform.OS === 'ios' ? 13 : 18,
        fontWeight: 'bold'
    },
    horizontalHoleView: {
        width: 60,
        marginHorizontal: 5
    },
    advText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: Colors.Primary
    }
});

export default styles;