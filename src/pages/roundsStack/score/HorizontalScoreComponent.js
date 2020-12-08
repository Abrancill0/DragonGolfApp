import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import moment from 'moment';
import styles from './styles';

class HorizontalScoreComponent extends Component {
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
        const { index, hole, holeInfo } = this.props;
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
            <View>
                <View style={{ width: '100%', height: 15, alignItems: 'center' }}>
                    <Text style={styles.advText}>{adv}</Text>
                </View>
                <View style={[styles.inputView, { height: 40 }]}>
                    <View style={inputBorder}>
                        <TextInput
                            style={inputStyle}
                            maxLength={2}
                            value={holeScore.toString()}
                            onChangeText={this.onChangeScore}
                            keyboardType='number-pad'
                        />
                    </View>
                </View>
            </View>
        );
    }

    setHoleData = (holeInfo, switchAdv) => {
        const { index, hole } = this.props;

        try {
            const score = holeInfo[index].holes[hole - 1].strokes;
            const par = holeInfo[index].holes[hole - 1].par;
            let adv = holeInfo[index].holes[hole - 1].adv;
            if (switchAdv) {
                if (adv % 2 === 0) adv--;
                else adv++;
            }
            const inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
            const inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
            this.setState({
                par,
                adv,
                inputStyle,
                inputBorder
            });

        } catch (error) {
            console.log('====================================');
            console.log(error + ' file: PlayerScoreComponent, line: 30');
            console.log('====================================');
        }
    }

    onChangeScore = (score) => {
        this.setState({ holeScore: score.toString()});
            /*if (parseInt(score ? score : 1) > 0) {
                const { holeInfo, index, hole } = this.props;
                const par = holeInfo[index].holes[hole - 1].par;
                score = score ? parseInt(score) : '';
                const inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                const inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ holeScore: score.toString(), inputStyle, inputBorder });
                this.saveScore(score);
            }*/
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

export default HorizontalScoreComponent;