import React, { Component } from 'react';
import { View, Text, Alert, ActionSheetIOS, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Colors from '../../../utils/Colors';
import Ripple from 'react-native-material-ripple';
import SNBetListComponent from './SingleNassau/SNBetListComponent';
import Icon from 'react-native-vector-icons';
import { actionDeleteSNBet, actionDeleteTNBet, actionDeleteMedalBet } from '../../../store/actions';
import { Dictionary } from '../../../utils/Dictionary';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import TNBetListComponent from './TeamNassau/TNBetListComponent';
import MedalBetListComponent from './Medal/MedalBetListComponent';
import Collapsible from 'react-native-collapsible';

class BetsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        const {
            header,
            betTitle,
            type,
            betData,
            onPress,
            betProfits,
            bets,
            index,
            collapsed,
            setCollapsed
        } = this.props;
        return (
            <View style={{ backgroundColor: Colors.White }}>
                {header ?
                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.8, borderColor: Colors.Gray }}>
                        {bets[index + 1]?.data?.length > 0 && <TouchableOpacity
                            style={{ width: 40, height: 50, justifyContent: 'center', alignItems: 'center', }}
                            onPress={_ => setCollapsed(bets[index + 1]?.key, !collapsed[bets[index + 1]?.key])}
                        >
                            <Ionicon name={collapsed[bets[index + 1]?.key] ? 'chevron-down' : 'chevron-up'} size={20} color={Colors.Black} />
                        </TouchableOpacity>}
                        <Ripple
                            style={styles.betsView}
                            rippleColor={Colors.Primary}
                            onPress={onPress}
                            onLongPress={this.showSheetView}
                        >
                            <Text style={styles.betTitle}>{betTitle}</Text>
                            <Ionicon name='ios-add-circle-outline' size={20} color={Colors.Primary} />
                        </Ripple>
                    </View>
                    :
                    <View style={{ paddingHorizontal: 10 }}>
                        <Collapsible collapsed={collapsed[type]}>
                            {betData && betData.map((item, index) => {
                                switch (type) {
                                    case 'singleNassau':
                                        return (<View key={type + index} style={{ marginBottom: 1 }}><SNBetListComponent item={item} index={index + 1} snBetProfits={betProfits} /></View>)
                                    case 'teamNassau':
                                        return (<View key={type + index} style={{ marginBottom: 1 }}><TNBetListComponent item={item} index={index + 1} tnBetProfits={betProfits} /></View>)
                                    case 'medal':
                                        return (<View key={type + index} style={{marginBottom: 1}}><MedalBetListComponent item={item} index={index + 1} medalBetProfits={betProfits} /></View>)
                                    default:
                                        return null;
                                }
                            })}
                            <View style={{height: 2}} />
                        </Collapsible>
                    </View>
                }
            </View>
        );
    }

    showSheetView = () => {

        const { language, betTitle, type } = this.props;
        const {
            clean,
            cancel,
            sureToDeleteAllBets
        } = Dictionary;

        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: [
                        `${clean[language]} ${betTitle}`,
                        cancel[language],
                    ],
                    destructiveButtonIndex: 0,
                    cancelButtonIndex: 1,
                },
                (index) => {
                    if (index !== 1) Alert.alert(
                        sureToDeleteAllBets[this.props.language],
                        '',
                        [
                            { text: cancel[this.props.language], style: 'cancel' },
                            {
                                text: Dictionary.delete[this.props.language], onPress: _ => {
                                    switch (type) {
                                        case 'singleNassau':
                                            this.props.deleteSNBet({ round_id: this.props.roundId, type: 'all' });
                                            break;
                                        case 'teamNassau':
                                            this.props.deleteTNBet({ round_id: this.props.roundId, type: 'all' });
                                            break;
                                    }
                                }, style: 'destructive'
                            }
                        ]
                    );
                },
            );
        } else {
            const removeIcon = <Icon name='md-trash' color={Colors.Primary} size={40} family={"Ionicons"} />;

            RNBottomActionSheet.SheetView.Show({
                title: betTitle,
                items: [
                    { title: `${clean[language]} ${betTitle}`, icon: removeIcon },
                ],
                onSelection: (index) => {
                    Alert.alert(
                        sureToDeleteAllBets[this.props.language],
                        '',
                        [
                            { text: cancel[this.props.language], style: 'cancel' },
                            {
                                text: Dictionary.delete[this.props.language], onPress: _ => {
                                    switch (type) {
                                        case 'singleNassau':
                                            this.props.deleteSNBet({ round_id: this.props.roundId, type: 'all' });
                                            break;
                                        case 'teamNassau':
                                            this.props.deleteTNBet({ round_id: this.props.roundId, type: 'all' });
                                            break;
                                        case 'medal':
                                            this.props.deleteMedalBet({ type: 'all' });
                                            break;
                                    }
                                }, style: 'destructive'
                            }
                        ]
                    );
                },
            });
        }
    }
}

const mapStateToProps = state => ({
    language: state.reducerLanguage,
    roundId: state.reducerRoundId,
});

const mapDispatchToProps = dispatch => ({
    deleteSNBet: (value) => {
        dispatch(actionDeleteSNBet(value));
    },
    deleteTNBet: (value) => {
        dispatch(actionDeleteTNBet(value));
    },
    deleteMedalBet: (value) => {
        dispatch(actionDeleteMedalBet(value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BetsComponent);