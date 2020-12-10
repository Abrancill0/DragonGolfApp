import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import { Dictionary } from '../../../utils/Dictionary';
import PlayerScoreComponent from './PlayerScoreComponent';
import styles from './styles';
import HoleHeader from './HoleHeader';
import { ListadoAmigosRonda } from '../../../Services/Services'
import AsyncStorage from '@react-native-community/async-storage';

class PlayersScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
      players: []
    };
  }

  async componentDidMount() {
    this.ListadoTodos()
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
                this.setState({
                  players:list
                })
            }
            else{
              this.setState({
                players:[]
              })
            }
        })
  }

  render() {

    const {
      item: hole
    } = this.props;

     const {
      language,
      players
    } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={<HoleHeader hole={hole} />}
          data={players}
          extraData={players}
          keyExtractor={item => item.id.toString()}
          style={{ flex: 1, paddingVertical: 5 }}
          renderItem={({ item, index }) => (
            <PlayerScoreComponent item={item} hole={hole} index={index} />
          )}
          ListEmptyComponent={
            <ListEmptyComponent
              text={Dictionary.emptyRoundPlayerList[language]}
              iconName="user-friends"
              iconFamily='font-awesome'
            />
          }
        />
      </View>
    );
  }
}

export default PlayersScore;