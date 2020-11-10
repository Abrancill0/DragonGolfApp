import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import store from '../../../store/store';
import { Dictionary } from '../../../utils/Dictionary';
import HeaderButton from './HeaderButton';
import ViewPager from '@react-native-community/viewpager';
import PlayersScore from './PlayersScore';
import { NavigationEvents } from 'react-navigation';
import HorizontalScoreView from './HorizontalScoreView';

class ScoreView extends Component {
  constructor(props) {
    super(props);

    let isLandscape = false;
    if (Dimensions.get('window').width > Dimensions.get('window').height) {
      isLandscape = true;
    }

    props.navigation.setParams({isLandscape});

    this.state = {
      isLandscape
    };

    this.holes = [];
    for (let index = 0; index < 18; index++) {
      this.holes.push({ key: `${index}`, hole: `${index + 1}` });
    }

    props.getHole({ roundId: props.roundId });
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: () => this.pager.setPage(1),
      onPressLeft: () => this.pager.setPage(17),
    });

    Dimensions.addEventListener('change', (dimensions) => {
      const { width, height } = dimensions.window;
      this.setState({ isLandscape: width > height });
      this.props.navigation.setParams({isLandscape: width > height});
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.initHole !== this.props.initHole) {
      if (nextProps.initHole) {
        this.pager.setPage(nextProps.initHole - 1);
      }
    }
  }

  static navigationOptions = ({ navigation }) => {
    const state = store.getState();
    const language = state.reducerLanguage;

    if (navigation.getParam('isLandscape')) {
      return {
        header: null
      }
    }

    return {
      title: `${Dictionary.hole[language]} ${navigation.getParam('hole', '1')}`,
      headerLeft: (
        <HeaderButton
          title={`${Dictionary.hole[language]} ${navigation.getParam('leftButton', '18')}`}
          onPress={navigation.getParam('onPressLeft', () => { })}
        />
      ),
      headerRight: (
        <HeaderButton
          title={`${Dictionary.hole[language]} ${navigation.getParam('rightButton', '2')}`}
          onPress={navigation.getParam('onPressRight', () => { })}
        />
      )
    }
  };

  render() {

    const { isLandscape } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents
          onWillFocus={this.changeTitleText}
        />
        {isLandscape ?
          <HorizontalScoreView holes={this.holes} /> :
          <ViewPager
            initialPage={this.props.initHole - 1}
            ref={ref => this.pager = ref}
            onPageSelected={(e) => this.onChangePage(e.nativeEvent.position)}
            style={{ flex: 1 }}
          >
            {this.holes.map(item => (
              <View style={{ flex: 1 }} key={item.hole.toString()} >
                <PlayersScore item={item.hole} />
              </View>
            ))}
          </ViewPager>
        }
      </View>
    );
  }

  onChangePage = (page) => {
    this.props.navigation.setParams({
      hole: page + 1,
      leftButton: page ? page : 18,
      rightButton: page + 1 > 17 ? 1 : page + 2,
      onPressLeft: () => this.pager.setPage((page - 1) >= 0 ? page - 1 : 17),
      onPressRight: () => this.pager.setPage((page + 1) <= 17 ? page + 1 : 0),
    });
  }

  changeTitleText = () => {
    this.props.navigation.setParams({
      Title: `${Dictionary.hole[this.props.language]} ${this.props.navigation.getParam('hole', '1')}`,
    });
  }
}


export default ScoreView;
