import { StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors';

const styles = StyleSheet.create({
    playerView: {
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
    emptyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 80
    },
    emptyText: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',
        marginTop: 10
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
        fontSize: 14,
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
        fontSize: 16,
        color: Colors.Primary
    },
    handicapText: {
        fontSize: 13,
        color: Colors.Black
    },
    handicapNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.Black
    },
    imageView: {
        width: 60,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;