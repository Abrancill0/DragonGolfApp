import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Dictionary } from '../../../utils/Dictionary';
import styles from './styles';
import PlayerScoreComponent from './PlayerScoreComponent';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import HorizontalScoreComponent from './HorizontalScoreComponent';
import { ListadoAmigosRonda } from '../../../Services/Services'
import AsyncStorage from '@react-native-community/async-storage';

class HorizontalScoreView extends Component {
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
            holes
        } = this.props;

        const {
            language,
            players
        } = this.state;

        const {
            emptyRoundPlayerList,
            hole: holeText
        } = Dictionary;

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.holeHeaderView}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {/*<Text style={styles.courseName}>{course.name}</Text>
                        <Text style={styles.cityName}>{course.city}</Text>*/}
                    </View>
                </View>
                <ScrollView keyboardShouldPersistTaps='handled' style={{ paddingTop: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ width: 70 }}>
                            <View style={{ height: 40 }} />
                            {players.map(item =>
                                <View key={item.id.toString()} style={[styles.playerScoreNameView, {height: 55, justifyContent: 'flex-end'}]}>
                                    <Text style={styles.playerScoreNameText} numberOfLines={1} adjustsFontSizeToFit >{item.nickname}</Text>
                                </View>
                            )}
                        </View>
                        <View style={{ flex: 1, paddingRight: 20}}>
                            <ScrollView keyboardShouldPersistTaps='handled' horizontal>
                                {holes.map(({ hole }) =>
                                    <View key={hole.toString()}>
                                        <View style={styles.horizontalHoleView}>
                                            <View style={{ alignItems: 'center', height: 40 }}>
                                                <Text style={styles.holeTitle}>{holeText[language]}</Text>
                                                <Text style={[styles.holeNumber, { fontSize: 16 }]}>{hole}</Text>
                                            </View>
                                            <View style={{ width: '100%', paddingVertical: 10 }}>
                                                {players.map((item, index) => <HorizontalScoreComponent key={index.toString()} item={item} hole={hole} index={index} />)}
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default HorizontalScoreView;
