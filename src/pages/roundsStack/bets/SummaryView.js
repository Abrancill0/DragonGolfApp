import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Dictionary } from '../../../utils/Dictionary';
import Colors from '../../../utils/Colors';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import SummaryComponent from './SummaryComponent';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { ListadoAmigosRonda } from '../../../Services/Services'

class SummaryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'es',
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
                      Te_TeeColor: item.Te_TeeColor,
                      ghinnumber: item.usu_ghinnumber,
                      photo: item.usu_imagen,
                      handicap: item.usu_handicapindex,
                      strokes: item.usu_golpesventaja,
                      ScoreIn: item.ScoreIn,
                      ScoreOut: item.ScoreOut,
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
                      1: item.ScoreHole1,
                      2: item.ScoreHole2,
                      3: item.ScoreHole3,
                      4: item.ScoreHole4,
                      5: item.ScoreHole5,
                      6: item.ScoreHole6,
                      7: item.ScoreHole7,
                      8: item.ScoreHole8,
                      9: item.ScoreHole9,
                      10: item.ScoreHole10,
                      11: item.ScoreHole11,
                      12: item.ScoreHole12,
                      13: item.ScoreHole13,
                      14: item.ScoreHole14,
                      15: item.ScoreHole15,
                      16: item.ScoreHole16,
                      17: item.ScoreHole17,
                      18: item.ScoreHole18,
                      ScoreHole1: item.ScoreHole1,
                      ScoreHole2: item.ScoreHole2,
                      ScoreHole3: item.ScoreHole3,
                      ScoreHole4: item.ScoreHole4,
                      ScoreHole5: item.ScoreHole5,
                      ScoreHole6: item.ScoreHole6,
                      ScoreHole7: item.ScoreHole7,
                      ScoreHole8: item.ScoreHole8,
                      ScoreHole9: item.ScoreHole9,
                      ScoreHole10: item.ScoreHole10,
                      ScoreHole11: item.ScoreHole11,
                      ScoreHole12: item.ScoreHole12,
                      ScoreHole13: item.ScoreHole13,
                      ScoreHole14: item.ScoreHole14,
                      ScoreHole15: item.ScoreHole15,
                      ScoreHole16: item.ScoreHole16,
                      ScoreHole17: item.ScoreHole17,
                      ScoreHole18: item.ScoreHole18,
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
                    keyExtractor={item => item.id.toString()}
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