import {StyleSheet} from 'react-native';
import Colors from '../../../utils/Colors';

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        height: 70,
        justifyContent: 'center',
        marginTop: 5,
    },
    titles: {
        fontSize: 16,
        color: Colors.Black,
        marginBottom: 10
    },
    startHoleView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    holeNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    question: {
        maxWidth: '80%',
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.Black,
        textAlign: 'left'
    },
    switchView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        marginBottom: 10
    },
    titleView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 10
    },
    courseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    editView: {
        position: 'absolute',
        right: 5,
        bottom: 15
    },
    checkView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 5
    }
});

export default styles;