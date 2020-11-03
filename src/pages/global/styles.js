import { StyleSheet, Dimensions, Platform } from 'react-native'
import Colors from '../../utils/Colors';
import { Fonts } from '../../utils/Fonts';

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    circleLoading: {
        width: 50,
        height: 50,
        backgroundColor: Colors.White,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    headerButton: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    roundRipple: {
        width: 40,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dragonButton: {
        flex: 1,
        backgroundColor: Colors.Primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        borderRadius: 6
    },
    dragonButtonText: {
        fontSize: 16,
        color: Colors.White,
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
    topProgressView: {
        width: '100%',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 56
    },
    hideView: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.8,
        borderColor: Colors.Gray,
    },
    hideItemView: {
        flex: 1,
    },
    hideItem: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hideKeyboardView: {
        position: 'absolute',
        elevation: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        right: 10
    },
    hideKeyboardButton: {
        width: 40,
        height: 30,
        borderRadius: 5,
        backgroundColor: Colors.White,
        marginBottom: -7,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    }
});

export default styles;