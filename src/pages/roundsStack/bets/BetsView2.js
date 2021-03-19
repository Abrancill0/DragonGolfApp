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
import AsyncStorage from '@react-native-community/async-storage';
import { ListaApuesta } from '../../../Services/Services'

class BetsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      language:'es',
      rondas: [],
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

    this.snBetProfits = [];
    this.tnBetProfits = [];
  }


  componentDidMount() {
    this.ListadoRondas()
  }

  ListadoRondas = async (players) => {
    let language = await AsyncStorage.getItem('language')
    this.setState({
        language:language,
        status:true
    })
    ListaApuesta()
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      id: item.IDBet,
                      nombre: item.Bet_Nombre,
                      fecha: moment(item.Bet_FechaCreacion).format('DD/MM/YYYY').toString()
                    }
                ))
                this.setState({
                  rondas:list.reverse(),
                  status:false
                })
            }
            else{
              this.setState({
                rondas:[],
                status:false
              })
            }
        })
  }

  render() {

    const {
      render,
      collapsed,
      collapsedSearch,
      query,
      medalFilter,
      snFilter,
      tnFilter,
      rondas
    } = this.state;

    /*const {
      navigation,
      snBet,
      tnBet,
      medalBet
    } = this.props;*/

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
        //onPress: _ => navigation.navigate('MedalBetView')
      },
      {
        header: false,
        key: 'medal',
        profits: this.medalBetProfits,
        data: medalFilter !== undefined ? medalFilter : []
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
        //onPress: _ => navigation.navigate('SNBetView')
      },
      {
        header: false,
        key: 'singleNassau',
        data: snFilter !== undefined ? snFilter : [],
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
        //onPress: _ => navigation.navigate('TNBetView')
      },
      {
        header: false,
        key: 'teamNassau',
        data: tnFilter !== undefined ? tnFilter : [],
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
            <FlatList
              keyboardShouldPersistTaps='handled'
              data={rondas}
              keyExtractor={item => item.key}
              stickyHeaderIndices={[0, 2, 4, 6, 8, 10, 12]}
              renderItem={({ item, index }) => <BetsComponent
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
            />
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