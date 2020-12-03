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
                      strokes: item.usu_golpesventaja
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

const mapStateToProps = state => ({
  language: state.reducerLanguage,
  players: state.reducerRoundPlayers
});

const mapDispatchToProps = dispatch => ({
});

export default PlayersScore;
