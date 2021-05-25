import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Dictionary } from '../../../utils/Dictionary';
import Colors from '../../../utils/Colors';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import SummaryComponent from './SummaryComponent';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { ListadoMontoPerdidoGanado } from '../../../Services/Services'

class SummaryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'en',
            playerProfit: [],
            players: []
        };
    }

    componentDidMount() {
        this.ListadoTodos()
    }

    ListadoTodos = async () => {
    let idUsu = await AsyncStorage.getItem('usu_id')
    let language = await AsyncStorage.getItem('language')
    let IDRound = await AsyncStorage.getItem('IDRound')
    this.setState({
        language:language
    })
    //console.warn(idUsu)
    //console.warn(IDRound)
    ListadoMontoPerdidoGanado(IDRound)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
                const list = res.Result.map(item => (
                    {
                      idUsu: item.IDUsuario,
                      nickname: item.usu_nickname,
                      MontoPerdidoGanado: item.MontoPerdidoGanadoSingle + item.MontoPerdidoGanadoTeam,
                      MontoPerdidoGanadoSingle: item.MontoPerdidoGanadoSingle,
                      MontoPerdidoGanadoTeam: item.MontoPerdidoGanadoTeam
                    }
                ))

                //this.llenaArreglo(list)

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

    render() {

        const { playerProfit, language, players } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                <View style={{ flex:0.2, justifyContent: 'flex-start' }}>
                  <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> this.props.navigation.goBack()}>
                    <MaterialIcon name={'arrow-back'} size={25} color={Colors.Primary} />
                  </TouchableOpacity>
                </View>
                <View style={{ flex:0.6, justifyContent: 'flex-start' }}>
                <Text style={{ margin:20, marginTop:40, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{Dictionary.result[language]}</Text>
                </View>
                {/*<View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
                  <TouchableOpacity style={{margin:20, marginTop:40, justifyContent:'flex-end'}} onPress={()=> navigation.navigate('SNBetView')}>
                    <MaterialIcon name={'add'} size={25} color={Colors.Primary} />
                  </TouchableOpacity>
                </View>*/}
              </View>
                <FlatList
                    style={{ flex: 1, paddingVertical: 5 }}
                    data={players}
                    extraData={players}
                    keyExtractor={item => item.idUsu.toString()}
                    renderItem={({ item, index }) => (
                        <SummaryComponent item={item} index={index} />
                    )}
                    ListEmptyComponent={
                        <ListEmptyComponent
                        text={Dictionary.emptyBets[language]}
                        iconName="money-bill-alt"
                        iconFamily='font-awesome'
                      />
                    }
                />
            </View>
        );
    }
}

export default SummaryView;