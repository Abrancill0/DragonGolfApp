import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, ScrollView } from 'react-native';
import ScoreHorizontalComponent from './ScoreHorizontalComponent';
import ScoreVerticalComponent from './ScoreVerticalComponent';
import ListEmptyComponent from '../../../global/ListEmptyComponent';
import { Dictionary } from '../../../../utils/Dictionary';
import { NavigationEvents } from 'react-navigation';
import CalculatePresses from '../../../../utils/CalculatePresses';

class SNScoreCardView extends Component {
  constructor(props) {
    super(props);

    this.item = props.navigation.getParam('item');
    if (!this.item) props.navigation.goBack();

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
      holeInfo: [],
      pressesArray: [],
      render: true

    };

    props.navigation.setParams({
      Title: `${this.item.member_a} vs ${this.item.member_b}`,
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam('Title', 'Score Card')}`,
    }
  }

  componentDidMount() {
    this.destructureHoles(this.props.holeInfo);
    this.calculateAdvStrokes();
    this.calculatePresses(this.props.switchAdv);
    Dimensions.addEventListener('change', (dimensions) => {
      const { width, height } = dimensions.window;
      this.setState({ horizontal: width > height });
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.holeInfo !== this.props.holeInfo) {
      this.destructureHoles(nextProps.holeInfo);
      this.calculateAdvStrokes();
      this.calculatePresses(this.props.switchAdv);
    }

    if (nextProps.switchAdv !== this.props.switchAdv) {
      this.destructureHoles(this.props.holeInfo);
      this.calculateAdvStrokes();
      this.calculatePresses(nextProps.switchAdv);
    }

  }

  render() {

    const {
      horizontal,
      tees,
      totalScore,
      advStrokes,
      advTotalStrokes,
      holeInfo,
      pressesArray,
      render
    } = this.state;

    const {
      language,
      hcpAdj,
      initHole,
      switchAdv
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents
          onWillFocus={_ => {
            this.destructureHoles(this.props.holeInfo);
            this.calculateAdvStrokes();
            this.calculatePresses(switchAdv);
          }}
        />
        {holeInfo.length > 0 ? <ScrollView style={{ width: '100%' }}>
          {render && <>
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
                pressesArray={pressesArray}
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
                pressesArray={pressesArray}
              />
            }
          </>}
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
      const areMember = (element.id == this.item.member_a_id || element.id == this.item.member_b_id);
      if (areMember) {
        const index = diffTees.findIndex(item => item.id === element.tee.id);
        if (index < 0) {
          diffTees.push({ ...element.tee, holes: element.holes });
        }
      }
      element.holes.forEach(hole => {
        if (hole.hole_number <= 9) {
          scoref9 += hole.strokes;
        } else {
          scoreb9 += hole.strokes;
        }
      });
      totalScore.push({ scoref9, scoreb9 });
    });
    let holeInfo = [];
    for (let index = 0; index < this.props.holeInfo.length; index++) {
      if (this.props.holeInfo[index].id === this.item.member_a_id) {
        holeInfo.push(this.props.holeInfo[index]);
        break;
      }
    }
    for (let index = 0; index < this.props.holeInfo.length; index++) {
      if (this.props.holeInfo[index].id === this.item.member_b_id) {
        holeInfo.push(this.props.holeInfo[index]);
        break;
      }
    }

    this.setState({ tees: diffTees, totalScore, holeInfo });
    this.holeInfo = holeInfo;
  }

  calculateAdvStrokes = () => {
    let advStrokesArray = [];
    let advTotalStrokes = [];
    let strokes = this.item.adv_strokes;
    let totalStrokesf9 = 0;
    let totalStrokesb9 = 0;

    if (strokes > 0) {
      const advStrokes = [];
      for (let index = 0; index < 18; index++) {
        advStrokes.push(0);
      }

      while (strokes > 0) {
        for (let index = 0; index < advStrokes.length; index++) {
          if (strokes > 0) {
            if (index < 9) totalStrokesf9++;
            else totalStrokesb9++;
            // advStrokes[index]++;
            // strokes--;
            if (strokes == 0.5) advStrokes[index] += 0.5;
            else advStrokes[index]++;
            strokes -= 1;
          } else {
            break;
          }
        }
      }
      advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
      advStrokesArray.push(advStrokes);
      totalStrokesf9 = 0;
      totalStrokesb9 = 0;
      const advStrokesP2 = [];
      for (let index = 0; index < 18; index++) {
        advStrokesP2.push(0);
      }
      advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
      advStrokesArray.push(advStrokesP2);
    } else {
      const advStrokes = [];
      for (let index = 0; index < 18; index++) {
        advStrokes.push(0);
      }
      advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
      advStrokesArray.push(advStrokes);

      const advStrokesP2 = [];
      for (let index = 0; index < 18; index++) {
        advStrokesP2.push(0);
      }

      while (strokes < 0) {
        for (let index = 0; index < advStrokesP2.length; index++) {
          if (strokes < 0) {
            if (index < 9) totalStrokesf9++;
            else totalStrokesb9++;
            // advStrokesP2[index]++;
            // strokes++;
            if (strokes == -0.5) advStrokesP2[index] += 0.5;
            else advStrokesP2[index]++;
            strokes += 1;
          } else {
            break;
          }
        }
      }
      advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
      advStrokesArray.push(advStrokesP2);
    }

    this.advStrokesArray = advStrokesArray;
    this.setState({ advStrokes: advStrokesArray, advTotalStrokes });
  }

  calculatePresses = (switchAdv) => {
    const holesMA = ChangeStartingHole(this.props.initHole, this.holeInfo[0].holes);
    const holesMB = ChangeStartingHole(this.props.initHole, this.holeInfo[1].holes);

    const pressesF9 = CalculatePresses(holesMA.front9, holesMB.front9, this.advStrokesArray, this.item.automatic_press_every, switchAdv);
    const pressesB9 = CalculatePresses(holesMA.back9, holesMB.back9, this.advStrokesArray, this.item.automatic_press_every, switchAdv);

    const pressesArray = {
      front9: pressesF9.totalPresses,
      back9: pressesB9.totalPresses
    }

    this.setState({ pressesArray });
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

export default connect(mapStateToProps, mapDispatchToProps)(SNScoreCardView);
