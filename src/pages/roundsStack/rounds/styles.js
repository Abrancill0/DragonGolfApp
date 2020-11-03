import { StyleSheet, Dimensions } from 'react-native'
import Colors from '../../../utils/Colors';
import { Fonts } from '../../../utils/Fonts';

const styles = StyleSheet.create({
    roundView: {
        backgroundColor: Colors.White,
        width: '100%',
        height: 70,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.Gray
    },
    dateView: {
        width: 80,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    monthText: {
        fontSize: 17,
        fontWeight: "bold",
        color: Colors.Primary
    },
    yearText: {
        fontSize: 13,
        color: Colors.Black
    },
    dayText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Colors.Black
    },
    dataView: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    titlesView: {
        flex: 1,
        justifyContent: 'center',
    },  
    roundName: {
        fontSize: 17,
        color: Colors.Black,
        fontWeight: 'bold'
    },
    courseName: {
        fontSize: 17,
        color: Colors.Primary,
        fontWeight: 'bold'
    },
    arrowView: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    onlineView: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    onlineText: {
        fontSize: 15,
        color: Colors.Blue
    }
});

export default styles;