import { StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors';

const styles = StyleSheet.create({
    courseView: {
        flex: 1,
        backgroundColor: Colors.White,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.Gray,
        paddingVertical: 5
    },
    arrowView: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoView: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingHorizontal: 10,
    },
    shortNameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.Black,
    },
    nameText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors.Primary,
    },
    placeText: {
        fontSize: 15,
        color: Colors.Black
    }
});

export default styles;