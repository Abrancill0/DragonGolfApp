import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, ScrollView } from 'react-native';
import ScoreHorizontalComponent from './ScoreHorizontalComponent';
import ScoreVerticalComponent from './ScoreVerticalComponent';
import ListEmptyComponent from '../../../global/ListEmptyComponent';
import { Dictionary } from '../../../../utils/Dictionary';
import { NavigationEvents } from 'react-navigation';
import CalculatePressesTeam from '../../../../utils/CalculatePressesTeam';
import Database from '../../../../database/database';

const database = new Database();

class TNScoreCardView extends Component {
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
      Title: `${this.item.member_a} ${this.item.member_b} vs ${this.item.member_c} ${this.item.member_d}`,
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam('Title', 'Score Card')}`,
      headerTitleStyle: {
        fontSize: navigation.getParam('Title', 'Score Card') === 'Score Card' ? 20 : 14
      }
    }
  }

  async componentDidMount() {
      this.destructureHoles(this.props.holeInfo);
      await this.calculateAdvStrokes();
      this.calculatePresses(this.props.switchAdv, 'componet Did mount');
      Dimensions.addEventListener('change', (dimensions) => {
        const { width, height } = dimensions.window;
        this.setState({ horizontal: width > height });
      });
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.holeInfo !== this.props.holeInfo) {
        this.destructureHoles(nextProps.holeInfo);
        await this.calculateAdvStrokes();
        this.calculatePresses(this.props.switchAdv, 'componentWillReceiveProps');
    }

    if (nextProps.switchAdv !== this.props.switchAdv) {
        this.destructureHoles(this.props.holeInfo);
        await this.calculateAdvStrokes();
        this.calculatePresses(nextProps.switchAdv, 'componentWillReceiveProps 2');
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
          onWillFocus={ async () => {
            this.destructureHoles(this.props.holeInfo);
            await this.calculateAdvStrokes();
            this.calculatePresses(switchAdv, 'onWillFocus');
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
      const areMember = (element.id == this.item.member_a_id || element.id == this.item.member_b_id ||
        element.id == this.item.member_c_id || element.id == this.item.member_d_id);
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
    for (let index = 0; index < this.props.holeInfo.length; index++) {
      if (this.props.holeInfo[index].id === this.item.member_c_id) {
        holeInfo.push(this.props.holeInfo[index]);
        break;
      }
    }
    for (let index = 0; index < this.props.holeInfo.length; index++) {
      if (this.props.holeInfo[index].id === this.item.member_d_id) {
        holeInfo.push(this.props.holeInfo[index]);
        break;
      }
    }

    this.setState({ tees: diffTees, totalScore, holeInfo });
    this.holeInfo = holeInfo;
  }

  calculateAdvStrokes = async () => {
    let advStrokesArray = [];
    let advTotalStrokes = [];
    let strokes = this.item.adv_strokes;
    let totalStrokesf9 = 0;
    let totalStrokesb9 = 0;
    let advStrokes = [];
    let advStrokesToAssign = [];
    let absStrokes = 0;
    let team1 = {};
    let team2 = {};
    switch (this.item.who_gets_the_adv_strokes) {
      case 'automatic':
          let maxStrokes = 0;
          let maxStrokesIdx = 0;
          let courseHcp = 0;
          const configureStrokes = await database.listTeamNassauPlayersConfrontations(this.item.member_a_id, this.item.member_b_id, this.item.member_c_id, this.item.member_d_id);
          this.holeInfo.forEach((item, index) => {
            if (configureStrokes[item.id]) {
              if (configureStrokes[item.id] > maxStrokes) {
                maxStrokes = configureStrokes[item.id];
                maxStrokesIdx = index;
              }
            } else {
              courseHcp = parseInt((item.handicap * item.tee.slope / 113).toFixed(0));
              if (courseHcp > maxStrokes) {
                maxStrokes = courseHcp;
                maxStrokesIdx = index;
              }
            }
          });
          advStrokes = [];
          for (let index = 0; index < 18; index++) {
            advStrokes.push(0);
          }

          for (let index = 0; index < 4; index++) {
            advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
            advStrokesArray.push(advStrokes);
          }

          advStrokesToAssign = [];
          for (let index = 0; index < 18; index++) {
            advStrokesToAssign.push(0);
          }

          absStrokes = Math.abs(strokes);
          while (absStrokes > 0) {
            for (let index = 0; index < advStrokesToAssign.length; index++) {
              if (absStrokes > 0) {
                if (index < 9) totalStrokesf9++;
                else totalStrokesb9++;
                // advStrokesToAssign[index]++;
                // absStrokes--;
                if (absStrokes == 0.5) advStrokesToAssign[index] += 0.5;
                else advStrokesToAssign[index]++;
                absStrokes -= 1;
              } else {
                break;
              }
            }
          }
          advTotalStrokes[maxStrokesIdx] = { totalStrokesf9, totalStrokesb9 };
          advStrokesArray[maxStrokesIdx] = advStrokesToAssign;
        break;
      case 'hihcp':
        let max = 0;
        let maxIdx = 0;
        this.holeInfo.forEach((item, index) => {
          const hcp = parseInt((item.handicap * item.tee.slope / 113).toFixed(0));
          if (strokes < 0) {
            if (index >= 2) {
              if (hcp > max) {
                max = hcp;
                maxIdx = index;
              }
            }
          } else {
            if (index < 2) {
              if (hcp > max) {
                max = hcp;
                maxIdx = index;
              }
            }
          }
        });

        advStrokes = [];
        for (let index = 0; index < 18; index++) {
          advStrokes.push(0);
        }

        for (let index = 0; index < 4; index++) {
          advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
          advStrokesArray.push(advStrokes);
        }

        advStrokesToAssign = [];
        for (let index = 0; index < 18; index++) {
          advStrokesToAssign.push(0);
        }

        absStrokes = Math.abs(strokes);
        while (absStrokes > 0) {
          for (let index = 0; index < advStrokesToAssign.length; index++) {
            if (absStrokes > 0) {
              if (index < 9) totalStrokesf9++;
              else totalStrokesb9++;
              // advStrokesToAssign[index]++;
              // absStrokes--;
              if (absStrokes == 0.5) advStrokesToAssign[index] += 0.5;
              else advStrokesToAssign[index]++;
              absStrokes -= 1;
            } else {
              break;
            }
          }
        }
        advTotalStrokes[maxIdx] = { totalStrokesf9, totalStrokesb9 };
        advStrokesArray[maxIdx] = advStrokesToAssign;
        break;
      case 'lowhcp':
        let min = Number.POSITIVE_INFINITY;
        let minIdx = 0;
        this.holeInfo.forEach((item, index) => {
          const hcp = parseInt((item.handicap * item.tee.slope / 113).toFixed(0));
          if (strokes < 0) {
            if (index >= 2) {
              if (hcp < min) {
                min = hcp;
                minIdx = index;
              }
            }
          } else {
            if (index < 2) {
              if (hcp < min) {
                min = hcp;
                minIdx = index;
              }
            }
          }
        });

        advStrokes = [];
        for (let index = 0; index < 18; index++) {
          advStrokes.push(0);
        }

        for (let index = 0; index < 4; index++) {
          advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
          advStrokesArray.push(advStrokes);
        }

        advStrokesToAssign = [];
        for (let index = 0; index < 18; index++) {
          advStrokesToAssign.push(0);
        }

        absStrokes = Math.abs(strokes);
        while (absStrokes > 0) {
          for (let index = 0; index < advStrokesToAssign.length; index++) {
            if (absStrokes > 0) {
              if (index < 9) totalStrokesf9++;
              else totalStrokesb9++;
              // advStrokesToAssign[index]++;
              // absStrokes--;
              if (absStrokes == 0.5) advStrokesToAssign[index] += 0.5;
              else advStrokesToAssign[index]++;
              absStrokes -= 1;
            } else {
              break;
            }
          }
        }
        advTotalStrokes[minIdx] = { totalStrokesf9, totalStrokesb9 };
        advStrokesArray[minIdx] = advStrokesToAssign;
        break;
      case 'each':
        let maxEach = 0;
        let eachMaxIdx = 0;
        let minEach = Number.POSITIVE_INFINITY;
        let eachMinIdx = 0;
        team1 = { max: 0, maxIdx: 0, min: Number.POSITIVE_INFINITY, minIdx: 0 };
        team2 = { max: 0, maxIdx: 0, min: Number.POSITIVE_INFINITY, minIdx: 0 };
        this.holeInfo.forEach((item, index) => {
          const hcp = parseInt((item.handicap * item.tee.slope / 113).toFixed(0));
          if (hcp > maxEach) {
            maxEach = hcp;
            eachMaxIdx = index;
          }
          if (hcp < minEach) {
            minEach = hcp;
            eachMinIdx = index;
          }
          if (index < 2) {
            if (hcp > team1.max) {
              team1.max = hcp;
              team1.maxIdx = index;
            }
            if (hcp < team1.min) {
              team1.min = hcp;
              team1.minIdx = index;
            }
          } else {
            if (hcp > team2.max) {
              team2.max = hcp;
              team2.maxIdx = index;
            }
            if (hcp < team2.min) {
              team2.min = hcp;
              team2.minIdx = index;
            }
          }
        });

        advStrokes = [];
        for (let index = 0; index < 18; index++) {
          advStrokes.push(0);
        }

        for (let index = 0; index < 4; index++) {
          advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
          advStrokesArray.push(advStrokes);
        }

        let advStrokesToAssign1 = [];
        let advStrokesToAssign2 = [];
        for (let index = 0; index < 18; index++) {
          advStrokesToAssign1.push(0);
          advStrokesToAssign2.push(0);
        }

        if (eachMinIdx < 2) {
          strokes = team2.min - minEach;
          idxEach = team2.minIdx;
        } else {
          strokes = team1.min - minEach;
          idxEach = team1.minIdx;
        }

        if (strokes !== Number.POSITIVE_INFINITY) {
          while (strokes > 0) {
            for (let index = 0; index < advStrokesToAssign2.length; index++) {
              if (strokes > 0) {
                if (index < 9) totalStrokesf9++;
                else totalStrokesb9++;
                advStrokesToAssign2[index]++;
                strokes--;
              } else {
                break;
              }
            }
          }
        } else {
          console.warn('Bucle Infinito: TNScoreCardView 363');
        }
        advTotalStrokes[idxEach] = { totalStrokesf9, totalStrokesb9 };
        advStrokesArray[idxEach] = advStrokesToAssign2;

        let idxEach = eachMaxIdx;
        if (eachMaxIdx < 2) {
          strokes = maxEach - team2.max;
        } else {
          strokes = maxEach - team1.max;
        }

        if (strokes !== Number.POSITIVE_INFINITY) {
          while (strokes > 0) {
            for (let index = 0; index < advStrokesToAssign1.length; index++) {
              if (strokes > 0) {
                if (index < 9) totalStrokesf9++;
                else totalStrokesb9++;
                advStrokesToAssign1[index]++;
                strokes--;
              } else {
                break;
              }
            }
          }
        } else {
          console.warn('Bucle Infinito: TNScoreCardView 389');
        }
        advTotalStrokes[idxEach] = { totalStrokesf9, totalStrokesb9 };
        advStrokesArray[idxEach] = advStrokesToAssign1;
        break;
      case 'slidhi':
        let hiIdx = 0;
        team1 = { prom: 0, idx: 0, max: 0 };
        team2 = { prom: 0, idx: 0, max: 0 };
        this.holeInfo.forEach((item, index) => {
          const hcp = parseInt((item.handicap * item.tee.slope / 113).toFixed(0));
          if (index < 2) {
            team1.prom += hcp;
            if (hcp > team1.max) {
              team1.max = hcp;
              team1.idx = index;
            }
          }
          else {
            team2.prom += hcp;
            if (hcp > team2.max) {
              team2.max = hcp;
              team2.idx = index;
            }
          }
        });
        team1.prom /= 2;
        team2.prom /= 2;
        if (team1.prom >= team2.prom) {
          hiIdx = team1.idx;
        } else {
          hiIdx = team2.idx;
        }

        advStrokes = [];
        for (let index = 0; index < 18; index++) {
          advStrokes.push(0);
        }

        for (let index = 0; index < 4; index++) {
          advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
          advStrokesArray.push(advStrokes);
        }

        advStrokesToAssign = [];
        for (let index = 0; index < 18; index++) {
          advStrokesToAssign.push(0);
        }

        if (strokes !== Number.POSITIVE_INFINITY) {
          absStrokes = Math.abs(strokes);
          while (absStrokes > 0) {
            for (let index = 0; index < advStrokesToAssign.length; index++) {
              if (absStrokes > 0) {
                if (index < 9) totalStrokesf9++;
                else totalStrokesb9++;
                // advStrokesToAssign[index]++;
                // absStrokes--;
                if (absStrokes == 0.5) advStrokesToAssign[index] += 0.5;
                else advStrokesToAssign[index]++;
                absStrokes -= 1;
              } else {
                break;
              }
            }
          }
        } else {
          console.warn('Bucle Infinito: TNScoreCardView 451');
        }
        advTotalStrokes[hiIdx] = { totalStrokesf9, totalStrokesb9 };
        advStrokesArray[hiIdx] = advStrokesToAssign;
        break;
      case 'slidlow':
        let lowIdx = 0;
        team1 = { prom: 0, idx: 0, min: Number.POSITIVE_INFINITY };
        team2 = { prom: 0, idx: 0, min: Number.POSITIVE_INFINITY };
        this.holeInfo.forEach((item, index) => {
          const hcp = parseInt((item.handicap * item.tee.slope / 113).toFixed(0));
          if (index < 2) {
            team1.prom += hcp;
            if (hcp < team1.min) {
              team1.max = hcp;
              team1.idx = index;
            }
          }
          else {
            team2.prom += hcp;
            if (hcp < team2.min) {
              team2.max = hcp;
              team2.idx = index;
            }
          }
        });
        team1.prom /= 2;
        team2.prom /= 2;
        if (team1.prom <= team2.prom) {
          lowIdx = team1.idx;
        } else {
          lowIdx = team2.idx;
        }

        advStrokes = [];
        for (let index = 0; index < 18; index++) {
          advStrokes.push(0);
        }

        for (let index = 0; index < 4; index++) {
          advTotalStrokes.push({ totalStrokesf9, totalStrokesb9 });
          advStrokesArray.push(advStrokes);
        }

        advStrokesToAssign = [];
        for (let index = 0; index < 18; index++) {
          advStrokesToAssign.push(0);
        }

        if (strokes !== Number.POSITIVE_INFINITY) {
          absStrokes = Math.abs(strokes);
          while (absStrokes > 0) {
            for (let index = 0; index < advStrokesToAssign.length; index++) {
              if (absStrokes > 0) {
                if (index < 9) totalStrokesf9++;
                else totalStrokesb9++;
                // advStrokesToAssign[index]++;
                // absStrokes--;
                if (absStrokes == 0.5) advStrokesToAssign[index] += 0.5;
                else advStrokesToAssign[index]++;
                absStrokes -= 1;
              } else {
                break;
              }
            }
          }
        } else {
          console.warn('Bucle Infinito: TNScoreCardView 515');
        }
        advTotalStrokes[lowIdx] = { totalStrokesf9, totalStrokesb9 };
        advStrokesArray[lowIdx] = advStrokesToAssign;
        break;
    }

    this.advStrokesArray = advStrokesArray;
    this.setState({ advStrokes: advStrokesArray, advTotalStrokes });
  }

  calculatePresses = (switchAdv, laFuncion) => {
    const holesMA = ChangeStartingHole(this.props.initHole, this.holeInfo[0].holes);
    const holesMB = ChangeStartingHole(this.props.initHole, this.holeInfo[1].holes);
    const holesMC = ChangeStartingHole(this.props.initHole, this.holeInfo[2].holes);
    const holesMD = ChangeStartingHole(this.props.initHole, this.holeInfo[3].holes);
    console.log('La funcion: ',laFuncion);
    console.log('========ADV STROKES ARRAY =======', this.advStrokesArray);

    const pressesF9 = CalculatePressesTeam(holesMA.front9, holesMB.front9, holesMC.front9, holesMD.front9, this.advStrokesArray, this.item.automatic_press_every, switchAdv);
    const pressesB9 = CalculatePressesTeam(holesMA.back9, holesMB.back9, holesMC.back9, holesMD.back9, this.advStrokesArray, this.item.automatic_press_every, switchAdv);

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

export default connect(mapStateToProps, mapDispatchToProps)(TNScoreCardView);
