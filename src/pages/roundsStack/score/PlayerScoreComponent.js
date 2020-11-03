import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { actionSaveScore } from '../../../store/actions';
import * as Validations from '../../../utils/Validations';
import moment from 'moment';

class PlayerScoreComponent extends Component {
    constructor(props) {
        super(props);

        let holeScore = '';

        const { holeInfo, index, hole } = props;
        if (holeInfo) {
            if (holeInfo.length > 0) {
                try {
                    if (holeInfo[index].holes[hole - 1].strokes) {
                        holeScore = holeInfo[index].holes[hole - 1].strokes.toString();
                    }
                } catch (error) {

                }
            }
        }
        this.state = {
            buttonIndex: null,
            holeScore,
            par: 0,
            adv: 0,
            inputStyle: styles.input,
            inputBorder: {},
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.holeInfo !== this.props.holeInfo) {
            const { index, hole } = this.props;
            const { holeInfo } = nextProps;
            if (holeInfo) {
                if (holeInfo.length > 0) {
                    this.setHoleData(holeInfo, this.props.switchAdv);
                    if (!this.state.holeScore) {
                        try {
                            if (holeInfo[index].holes[hole - 1].strokes) {
                                this.setState({ holeScore: holeInfo[index].holes[hole - 1].strokes.toString() });
                            }
                        } catch (error) {

                        }
                    }
                }
            }
        }

        if (nextProps.switchAdv !== this.props.switchAdv) {
            this.setHoleData(this.props.holeInfo, nextProps.switchAdv);
        }
    }

    componentDidMount() {
        const { index, hole, holeInfo} = this.props;
        if (holeInfo) {
            if (holeInfo.length > 0) {
                this.setHoleData(holeInfo, this.props.switchAdv);
                if (!this.state.holeScore) {
                    try {
                        if (holeInfo[index].holes[hole - 1].strokes) {
                            this.setState({ holeScore: holeInfo[index].holes[hole - 1].strokes.toString() });
                        }
                    } catch (error) {

                    }
                }
            }
        }
    }

    render() {

        const {
            holeScore,
            par,
            adv,
            inputStyle,
            inputBorder
        } = this.state;

        const {
            item,
        } = this.props;

        return (
            <>
                <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                    <Text>PAR: </Text>
                    <Text style={styles.dataValues}>{par}</Text>
                    <Text>ADV: </Text>
                    <Text style={styles.dataValues}>{adv}</Text>
                </View>
                <View style={styles.playerScoreView}>
                    <View style={styles.playerScoreNameView}>
                        <Text style={styles.playerScoreNameText} numberOfLines={1} adjustsFontSizeToFit >{item.nick_name}</Text>
                    </View>
                    <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                style={inputStyle}
                                maxLength={2}
                                value={holeScore}
                                onChangeText={this.onChangeScore}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                    <View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }

    setHoleData = (holeInfo, switchAdv) => {
        const { index, hole } = this.props;

        try {
            const score = holeInfo[index].holes[hole - 1].strokes;
            const par = holeInfo[index].holes[hole - 1].par;
            let adv = holeInfo[index].holes[hole - 1].adv;
            const buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
            if (switchAdv) {
                if (adv % 2 === 0) adv--;
                else adv++;
            }
            const inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
            const inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
            this.setState({
                par,
                adv,
                buttonIndex,
                inputStyle,
                inputBorder
            });

        } catch (error) {
            console.log('====================================');
            console.log(error + ' file: PlayerScoreComponent, line: 30');
            console.log('====================================');
        }
    }

    onPressButtonGroup = (value) => {
        const { holeScore } = this.state;
        const { holeInfo, index, hole } = this.props;
        this.setState({ buttonIndex: value });
        let par = 0;
        let bogy = 0;
        let score = 0;
        if (holeInfo) {
            if (holeInfo[index].holes[hole - 1].par)
                par = parseInt(holeInfo[index].holes[hole - 1].par);
        }
        if (par) {
            bogy = par + 1;
        }
        switch (value) {
            case 0:
                score = (parseInt(holeScore) <= (par - 1) && parseInt(holeScore) > 1 ? parseInt(holeScore) - 1 : (par - 1));
                break;
            case 1:
                score = par;
                break;
            case 2:
                score = bogy;
                break;
            case 3:
                score = (parseInt(holeScore) >= (bogy + 1) && parseInt(holeScore) < 99 ? parseInt(holeScore) + 1 : (bogy + 1));
                break;
        }
        const buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
        const inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
        const inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
        this.setState({ holeScore: score.toString(), buttonIndex, inputStyle, inputBorder });
        this.saveScore(score);
    }

    onChangeScore = (score) => {
        const scoreOk = Validations.intNumberValidation(score ? score : 1);
        if (scoreOk.ok) {

            if (parseInt(score ? score : 1) > 0) {
                const { holeInfo, index, hole } = this.props;
                const par = holeInfo[index].holes[hole - 1].par;
                score = score ? parseInt(score) : '';
                const buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                const inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                const inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ holeScore: score.toString(), buttonIndex, inputStyle, inputBorder });
                this.saveScore(score);
            }
        }
    }

    saveScore = (score) => {
        const member = {
            strokes: score,
            id_sync: '',
            ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
            id: this.props.item.id
        }
        this.props.saveScore({ hole: parseInt(this.props.hole), member, roundId: this.props.roundId });
    }
}

const mapStateToProps = state => ({
    holeInfo: state.reducerHole,
    roundId: state.reducerRoundId,
    switchAdv: state.reducerSwitchAdv
});

const mapDispatchToProps = dispatch => ({
    saveScore: (values) => {
        dispatch(actionSaveScore(values));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerScoreComponent);
