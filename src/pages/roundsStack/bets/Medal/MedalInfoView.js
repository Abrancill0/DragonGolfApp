import React, { Component } from 'react';
import {connect} from 'react-redux';
import { FlatList } from 'react-native';
import CalculateAdvMedal from '../../../../utils/CalculateAdvMedal';
import MedalInfoComponent from './MedalInfoComponent';

class MedalInfoView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medalData: [],
        };

        this.item = props.navigation.getParam('item');
    }

    static navigationOptions = ({ navigation }) => {

        return {
            title: 'Medal',
        }
    };

    componentDidMount() {
        this.calculateStrokes();
    }

    render() {

        const {medalData} = this.state;

        const {language} = this.props;

        return (
            <FlatList
                style={{flex: 1}}
                keyExtractor={(_, idx) => idx.toString()}
                data={medalData}
                extraData={medalData}
                renderItem={({item}) => <MedalInfoComponent item={item} language={language} />}
            />
        );
    }

    calculateStrokes = async () => {
        const { holeInfo, initHole } = this.props;

        let minF9 = Number.POSITIVE_INFINITY;
        let minB9 = Number.POSITIVE_INFINITY;
        let min18 = Number.POSITIVE_INFINITY;

        const medalData = [];
        const advantages = await this.calculateAdvStrokes();
        this.item.players.forEach(player => {
            const data = {nickname: player.nick_name, handicap: advantages[player.nick_name].handicap};
            const idx = holeInfo.findIndex(item => item.id === player.member_id);
            if (idx >= 0) {
                const holes = ChangeStartingHole(initHole, holeInfo[idx].holes);
                let strokesF9 = 0;
                let strokesB9 = 0;
                holes.front9.forEach(hole => strokesF9 += hole.strokes);
                holes.back9.forEach(hole => strokesB9 += hole.strokes);
                data.strokesF9 = strokesF9;
                data.strokesB9 = strokesB9;
                data.total18 = strokesF9 + strokesB9;
                strokesF9 -= advantages[player.nick_name].totalStrokesf9;
                strokesB9 -= advantages[player.nick_name].totalStrokesb9;
                data.advStrokesF9 = strokesF9;
                data.advStrokesB9 = strokesB9;
                data.advTotal18 = strokesF9 + strokesB9;
                medalData.push(data);

                if (strokesF9 <= minF9) {
                    minF9 = strokesF9;
                }

                if (strokesB9 <= minB9) {
                    minB9 = strokesB9;
                }

                if (strokesF9 + strokesB9 <= min18) {
                    min18 = strokesF9 + strokesB9;
                }
            }
        });

        for (let idx = 0; idx < medalData.length; idx++) {
            if(medalData[idx].advStrokesF9 === minF9) medalData[idx].winnerF9 = true;
            if(medalData[idx].advStrokesB9 === minB9) medalData[idx].winnerB9 = true;
            if((medalData[idx].advStrokesF9 + medalData[idx].advStrokesB9) === min18) medalData[idx].winner18 = true;
        }

        this.setState({medalData});
    }

    calculateAdvStrokes = async () => {
        const { holeInfo: info, hcpAdj } = this.props;

        const advantages = {};
        for (let idx = 0; idx < info.length; idx++) {
            let totalStrokesf9 = 0;
            let totalStrokesb9 = 0;
            const handicap = parseInt(((info[idx].handicap * info[idx].tee.slope / 113) * hcpAdj).toFixed(0));
            const advStrokes = await CalculateAdvMedal(handicap, info[idx].tee.id);

            advStrokes.forEach((element, index) => {
                if (index < 9) {
                    totalStrokesf9 += element;
                } else {
                    totalStrokesb9 += element;
                }
            });
            advantages[info[idx].nick_name] = { totalStrokesf9, totalStrokesb9, handicap };
        }

        return advantages;
    }
}

const mapStateToProps = state => ({
    language: state.reducerLanguage,
    holeInfo: state.reducerHole,
    initHole: state.reducerInitHole,
    players: state.reducerRoundPlayers,
    hcpAdj: state.reducerHcpAdj,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MedalInfoView);