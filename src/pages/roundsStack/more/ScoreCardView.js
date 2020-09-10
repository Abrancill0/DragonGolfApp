import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ScoreHorizontalComponent from './ScoreHorizontalComponent';
import ScoreVerticalComponent from './ScoreVerticalComponent';
import { Dictionary } from '../../../utils/Dictionary';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import CalculateAdv from '../../../utils/CalculateAdv';
import moment from 'moment';

class ScoreCardView extends Component {
    constructor(props) {
        super(props);

        let horizontal = false;
        if (Dimensions.get('window').width > Dimensions.get('window').height) {
            horizontal = true;
        }

        this.state = {
            horizontal,
            tees: [],
            totalScore: [],
            advStrokes: [],
            advTotalStrokes: [],
        };

        const { language } = props;
        let numMonth = '';
        let day = '';
        let title = '';
        if (props.round) {
            title = props.round.name;
        } else {
            numMonth = moment().format('M');
            day = moment().format('DD');

            let month = '';
            switch (numMonth) {
                case '1':
                    month = Dictionary.january[language];
                    break;
                case '4':
                    month = Dictionary.april[language];
                    break;
                case '8':
                    month = Dictionary.august[language];
                    break;
                case '12':
                    month = Dictionary.december[language];
                    break;
                default:
                    month = moment().format('MMM');
                    break;
            }

            title = props.course.short_name + ` ${month} ${day}`;
        }

        props.navigation.setParams({
            Title: title,
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.getParam('Title', 'Score Card')}`,
        }
    }

    componentDidMount() {
        this.destructureHoles(this.props.holeInfo);
        this.calculateAdvStrokes(this.props.holeInfo, this.props.hcpAdj);
        Dimensions.addEventListener('change', (dimensions) => {
            const { width, height } = dimensions.window;
            this.setState({ horizontal: width > height });
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.holeInfo !== this.props.holeInfo) {
            this.destructureHoles(nextProps.holeInfo);
            this.calculateAdvStrokes(nextProps.holeInfo, this.props.hcpAdj);
        }

        if(nextProps.hcpAdj !== this.props.hcpAdj){
            this.calculateAdvStrokes(this.props.holeInfo, nextProps.hcpAdj);
        }
    }

    render() {

        const {
            horizontal,
            tees,
            totalScore,
            advStrokes,
            advTotalStrokes
        } = this.state;

        const {
            language,
            holeInfo,
            hcpAdj,
            initHole,
            switchAdv
        } = this.props;
        console.log('Adv strokes array: ', advStrokes);
        return (
            <View style={{ flex: 1 }}>
                {holeInfo.length > 0 ? <ScrollView style={{ width: '100%' }}>
                    {horizontal ?
                        <ScoreHorizontalComponent
                            language={language}
                            tees={tees}
                            holeInfo={holeInfo}
                            hcpAdj={hcpAdj}
                            totalScore={totalScore}
                            advStrokes={advStrokes}
                            advTotalStrokes={advTotalStrokes}
                            initHole={initHole}
                            switchAdv={switchAdv}
                        />
                        :
                        <ScoreVerticalComponent
                            language={language}
                            tees={tees}
                            holeInfo={holeInfo}
                            hcpAdj={hcpAdj}
                            totalScore={totalScore}
                            advStrokes={advStrokes}
                            advTotalStrokes={advTotalStrokes}
                            initHole={initHole}
                            switchAdv={switchAdv}
                        />
                    }
                </ScrollView> : <ListEmptyComponent
                        text={Dictionary.emptyRoundPlayerList[language]}
                        iconName="user-friends"
                        iconFamily='font-awesome'
                    />}
            </View>
        );
    }

    destructureHoles = (info) => {
        let diffTees = [];
        let totalScore = [];
        info.forEach(element => {
            let scoref9 = 0;
            let scoreb9 = 0;
            const index = diffTees.findIndex(item => item.id === element.tee.id);
            if (index < 0) {
                diffTees.push({ ...element.tee, holes: element.holes });
            }
            element.holes.forEach(hole => {
                if(hole.hole_number <= 9){
                    scoref9 += hole.strokes;
                }else{
                    scoreb9 += hole.strokes;
                }
            });
            totalScore.push({scoref9, scoreb9});
        });
        this.setState({ tees: diffTees, totalScore });
    }

    calculateAdvStrokes = async (info, hcpAdj) => {
        let advStrokesArray = [];
        let advTotalStrokes = [];
        info.forEach(async element => {
            let totalStrokesf9 = 0;
            let totalStrokesb9 = 0;
            const handicap = parseInt(((element.handicap * element.tee.slope / 113) * hcpAdj).toFixed(0));
            const advStrokes = await CalculateAdv(handicap, element.tee.id);
            advStrokes.forEach((element, index) => {
                if(index < 9){
                    totalStrokesf9 += element;
                }else{
                    totalStrokesb9 += element;
                }
            });
            advTotalStrokes.push({totalStrokesf9, totalStrokesb9});
            advStrokesArray.push(advStrokes);
            this.setState({advStrokes: advStrokesArray, advTotalStrokes});
        });
        console.log('Adv Strokes Array: ', advStrokesArray);
    }
}

const mapStateToProps = state => ({
    language: state.reducerLanguage,
    userData: state.reducerUserData,
    course: state.reducerRoundCourse,
    round: state.reducerRound,
    holeInfo: state.reducerHole,
    hcpAdj: state.reducerHcpAdj,
    initHole: state.reducerInitHole,
    switchAdv: state.reducerSwitchAdv
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCardView);
