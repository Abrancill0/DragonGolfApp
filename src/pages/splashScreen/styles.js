import { StyleSheet, Dimensions } from 'react-native'
import Colors from '../../utils/Colors';
import { Fonts } from '../../utils/Fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 35,
        height: 35,
        marginHorizontal: 20
    },
    textView: {
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontFamily: Fonts.BankGothic,
        fontSize: 18,
        color: Colors.Primary,
        marginRight: 5
    }
});

export default styles;