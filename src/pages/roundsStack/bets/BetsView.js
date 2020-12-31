import React, { Component } from 'react';
import { View, TextInput, KeyboardAvoidingView } from 'react-native';
import moment from 'moment';
import BetsComponent from './BetsComponent';
import { Dictionary } from '../../../utils/Dictionary';
import { NavigationEvents, FlatList } from 'react-navigation';
import HeaderButton from '../../global/HeaderButton';
import Collapsible from 'react-native-collapsible';
import styles from './styles';
import Colors from '../../../utils/Colors';

class BetsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: true,
      collapsedSearch: true,
      query: '',
      collapsed: {
        bestBall: true,
        medal: true,
        rabbit: true,
        singleNassau: true,
        skins: true,
        teamNassau: true,
        units: true,
      },
      medalFilter: undefined,
      snFilter: undefined,
      tnFilter: undefined
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

      title = 'Pruebas'//props.course.short_name + ` ${month} ${day}`;
    }

    /*props.navigation.setParams({
      Title: title,
    });*/

    /*props.getSNBet(props.roundId);
    props.getTNBet(props.roundId);
    props.getMedalBet(props.roundId);*/

    this.snBetProfits = [];
    this.tnBetProfits = [];
  }

  /*static navigationOptions = ({ navigation }) => {

    return {
      title: `${navigation.getParam('Title')}`,
      headerLeft: (
        <HeaderButton
          iconName="md-list"
          onPress={_ => navigation.navigate('SummaryView')}
        />
      ),
      headerRight: (
        <HeaderButton
          iconName="ios-search"
          onPress={navigation.getParam('showSeatchInput')}
        />
      )
    }
  };*/

  componentDidMount() {
    /*this.props.navigation.setParams({
      showSeatchInput: this.showSearchInput
    });*/
  }

  UNSAFE_componentWillReceiveProps(nextProps) {/*
    if (nextProps.snBet !== this.props.snBet) {
      this.snBetProfits = [];
      nextProps.snBet.forEach(_ => this.snBetProfits.push(0));
      this.props.snBetSummary(this.snBetProfits);
      this.setState({ render: false });
      setTimeout(_ => this.setState({ render: true }), 50);
    }

    if (nextProps.tnBet !== this.props.snBet) {
      this.tnBetProfits = [];
      nextProps.tnBet.forEach(item => this.tnBetProfits.push(0));
      this.props.tnBetSummary(this.tnBetProfits);
    }

    if (nextProps.medalBet !== this.props.medalBet) {
      this.medalBetProfits = [];
      nextProps.medalBet.forEach(_ => this.medalBetProfits.push(0));
      this.props.medalBetSummary(this.medalBetProfits);
    }
  */}

  render() {

    const {
      render,
      collapsed,
      collapsedSearch,
      query,
      medalFilter,
      snFilter,
      tnFilter
    } = this.state;

    const {
      navigation,
      snBet,
      tnBet,
      medalBet
    } = this.props;

    const bets = [
      {
        header: true,
        key: 'bestBallHeader',
        title: 'Best Ball',
      },
      {
        header: false,
        key: 'bestBall',
        data: []
      },
      {
        header: true,
        key: 'medalHeader',
        title: 'Medal',
        onPress: _ => navigation.navigate('MedalBetView')
      },
      {
        header: false,
        key: 'medal',
        profits: this.medalBetProfits,
        data: medalFilter !== undefined ? medalFilter : medalBet
      },
      {
        header: true,
        key: 'rabbitHeader',
        title: 'Rabbit Bets',
      },
      {
        header: false,
        key: 'rabbit',
        data: []
      },
      {
        header: true,
        key: 'singleNassauHeader',
        title: 'Single Nassau',
        onPress: _ => navigation.navigate('SNBetView')
      },
      {
        header: false,
        key: 'singleNassau',
        data: snFilter !== undefined ? snFilter : snBet,
        profits: this.snBetProfits,
      },
      {
        header: true,
        key: 'skinsHeader',
        title: 'Skins Bets',
      },
      {
        header: false,
        key: 'skins',
        data: []
      },
      {
        header: true,
        key: 'teamNassauHeader',
        title: 'Team Nassau',
        onPress: _ => navigation.navigate('TNBetView')
      },
      {
        header: false,
        key: 'teamNassau',
        data: tnFilter !== undefined ? tnFilter : tnBet,
        profits: this.tnBetProfits,
      },
      {
        header: true,
        key: 'unitsHeader',
        title: 'Units Bets',
      },
      {
        header: false,
        key: 'units',
        data: []
      },
    ];

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={140} enabled={Platform.OS === 'ios'}>
        {render &&
          <View>
            <Collapsible collapsed={collapsedSearch}>
              <View style={{ backgroundColor: Colors.Gray }}>
                <TextInput
                  style={styles.searchInput}
                  returnKeyType='search'
                  autoCapitalize='characters'
                  value={query}
                  onChangeText={query => this.setState({ query })}
                  onSubmitEditing={_ => this.filterBets(bets)}
                />
              </View>
            </Collapsible>
            {/*<FlatList
              keyboardShouldPersistTaps='handled'
              data={bets}
              keyExtractor={item => item.key}
              stickyHeaderIndices={[0, 2, 4, 6, 8, 10, 12]}
              /*renderItem={({ item, index }) => <BetsComponent
                header={item.header}
                betTitle={item.title}
                type={item.key}
                betData={item.data}
                betProfits={item.profits}
                onPress={item.onPress}
                collapsed={collapsed}
                setCollapsed={this.setCollapsed}
                bets={bets}
                index={index}
              />}
            />*/}
          </View>
        }
      </KeyboardAvoidingView>
    );
  }

  setCollapsed = (type, collapsed) => {
    const newCollapsed = { ...this.state.collapsed };
    newCollapsed[type] = collapsed;
    this.setState({ collapsed: newCollapsed });
  }

  showSearchInput = () => {
    const { collapsedSearch } = this.state;
    if (!collapsedSearch) {
      this.setState({
        query: '',
        medalFilter: undefined,
        snFilter: undefined,
        tnFilter: undefined
      });
    }
    this.setState({ collapsedSearch: !collapsedSearch });
  }

  filterBets = bets => {
    const { query } = this.state;
    const { medalBet, snBet, tnBet } = this.props;
    let temp = [];

    for (let idx = 0; idx < bets.length; idx++) {
      if (bets[idx].key === 'medal') {
        temp = medalBet.filter(item => {
          const index = item.players.findIndex(element => element.nick_name.includes(query));
          if (index >= 0) return true;

          return false;
        });
        this.setState({ medalFilter: temp });
      }

      if (bets[idx].key === 'singleNassau') {
        temp = snBet.filter(item => (item.member_a.includes(query) || item.member_b.includes(query)));
        this.setState({ snFilter: temp });
      }

      if (bets[idx].key === 'teamNassau') {
        temp = tnBet.filter(item => (
          item.member_a.includes(query)
          || item.member_b.includes(query)
          || item.member_c.includes(query)
          || item.member_d.includes(query)
        ));
        this.setState({ tnFilter: temp });
      }
    }
  }
}

export default BetsView;