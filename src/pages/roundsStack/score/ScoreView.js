import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Dictionary } from '../../../utils/Dictionary';
import HeaderButton from './HeaderButton';
import ViewPager from '@react-native-community/viewpager';
import PlayersScore from './PlayersScore';
import { NavigationEvents } from 'react-navigation';
import HorizontalScoreView from './HorizontalScoreView';
import { ListadoAmigosRonda } from '../../../Services/Services'
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../../../utils/Colors';

class ScoreView extends Component {
  constructor(props) {
    super(props);

    let isLandscape = false;
    if (Dimensions.get('window').width > Dimensions.get('window').height) {
      isLandscape = true;
    }

    props.navigation.setParams({isLandscape});

    this.state = {
      isLandscape,
      players: [],
      playerHole: [],
      carga:true
    };

    this.holes = [];
    for (let index = 0; index < 18; index++) {
      this.holes.push({ key: `${index}`, hole: `${index + 1}` });
    }

    //props.getHole({ roundId: props.roundId });
  }

  componentDidMount() {
    this.ListadoTodos()
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

  llenaArreglo = async (players) => {
    //console.warn('Entró')
    let language = await AsyncStorage.getItem('language')
    let playersHoleAux = []
    for (var i = 0; i <= players.length - 1; i++) {
        let HolesAux = []
        HolesAux.push('['+players[i].id)
        for (var j = 0; j <= 17; j++) {
            HolesAux.push(0)
        }
        playersHoleAux.push(HolesAux + ']')
    }

    this.setState({
        language:language,
        playerHole:playersHoleAux
    })
    }

  ListadoTodos = async () => {
    let idUsu = await AsyncStorage.getItem('usu_id')
    let language = await AsyncStorage.getItem('language')
    let IDRound = await AsyncStorage.getItem('IDRound')
    this.setState({
        language:language
    })
    console.warn(idUsu)
    console.warn(IDRound)
    ListadoAmigosRonda(idUsu, IDRound)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      idUsu: item.IDUsuario,
                      id: item.PlayerId,
                      nombre: item.usu_nombre,
                      apellido: item.usu_apellido_paterno,
                      nickname: item.usu_nickname,
                      ghinnumber: item.usu_ghinnumber,
                      photo: item.usu_imagen,
                      handicap: item.usu_handicapindex,
                      strokes: item.usu_golpesventaja,
                      ho_par1: item.ho_par1,
                      ho_par2: item.ho_par2,
                      ho_par3: item.ho_par3,
                      ho_par4: item.ho_par4,
                      ho_par5: item.ho_par5,
                      ho_par6: item.ho_par6,
                      ho_par7: item.ho_par7,
                      ho_par8: item.ho_par8,
                      ho_par9: item.ho_par9,
                      ho_par10: item.ho_par10,
                      ho_par11: item.ho_par11,
                      ho_par12: item.ho_par12,
                      ho_par13: item.ho_par13,
                      ho_par14: item.ho_par14,
                      ho_par15: item.ho_par15,
                      ho_par16: item.ho_par16,
                      ho_par17: item.ho_par17,
                      ho_par18: item.ho_par18,
                      ScoreHole1: item.ScoreHole1,
                      ScoreHole1: item.ScoreHole2,
                      ScoreHole1: item.ScoreHole3,
                      ScoreHole1: item.ScoreHole4,
                      ScoreHole1: item.ScoreHole5,
                      ScoreHole1: item.ScoreHole6,
                      ScoreHole1: item.ScoreHole7,
                      ScoreHole1: item.ScoreHole8,
                      ScoreHole1: item.ScoreHole9,
                      ScoreHole1: item.ScoreHole10,
                      ScoreHole1: item.ScoreHole11,
                      ScoreHole1: item.ScoreHole12,
                      ScoreHole1: item.ScoreHole13,
                      ScoreHole1: item.ScoreHole14,
                      ScoreHole1: item.ScoreHole15,
                      ScoreHole1: item.ScoreHole16,
                      ScoreHole1: item.ScoreHole17,
                      ScoreHole1: item.ScoreHole18,
                      Ho_Advantage1: item.Ho_Advantage1,
                      Ho_Advantage2: item.Ho_Advantage2,
                      Ho_Advantage3: item.Ho_Advantage3,
                      Ho_Advantage4: item.Ho_Advantage4,
                      Ho_Advantage5: item.Ho_Advantage5,
                      Ho_Advantage6: item.Ho_Advantage6,
                      Ho_Advantage7: item.Ho_Advantage7,
                      Ho_Advantage8: item.Ho_Advantage8,
                      Ho_Advantage9: item.Ho_Advantage9,
                      Ho_Advantage10: item.Ho_Advantage10,
                      Ho_Advantage11: item.Ho_Advantage11,
                      Ho_Advantage12: item.Ho_Advantage12,
                      Ho_Advantage13: item.Ho_Advantage13,
                      Ho_Advantage14: item.Ho_Advantage14,
                      Ho_Advantage15: item.Ho_Advantage15,
                      Ho_Advantage16: item.Ho_Advantage16,
                      Ho_Advantage17: item.Ho_Advantage17,
                      Ho_Advantage18: item.Ho_Advantage18,
                    }
                ))

                this.llenaArreglo(list)

                this.setState({
                  players:list,
                  carga:false
                })
            }
            else{
              this.setState({
                players:[],
                carga:false
              })
            }
        })
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

    const { isLandscape, players, playerHole, carga } = this.state;

    return (
      <View style={{ flex: 1 }}>
      <Spinner
            visible={carga}
            color={Colors.Primary} />
        {isLandscape ?
          <HorizontalScoreView holes={this.holes} players={players} /> :
          <ViewPager
            initialPage={0/*this.props.initHole - 1*/}
            ref={ref => this.pager = ref}
            onPageSelected={(e) => this.onChangePage(e.nativeEvent.position)}
            style={{ flex: 1 }}
          >
            {this.holes.map(item => (
              <View style={{ flex: 1 }} key={item.hole.toString()} >
                <PlayersScore item={item.hole} players={players} playerHole={playerHole} />
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
