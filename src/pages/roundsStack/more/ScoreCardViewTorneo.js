import React, { Component } from 'react';
import { View, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native';
import ScoreHorizontalComponent from './ScoreHorizontalComponentTorneo';
import ScoreVerticalComponent from './ScoreVerticalComponentTorneo';
import { Dictionary } from '../../../utils/Dictionary';
import Colors from '../../../utils/Colors';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { ListadoStableFordStrokes, ListadoTeesRonda } from '../../../Services/Services'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';

class ScoreCardView extends Component {
    constructor(props) {
        super(props);

        let horizontal = false;
        if (Dimensions.get('window').width > Dimensions.get('window').height) {
            horizontal = true;
        }

        this.state = {
            language: 'en',
            horizontal,
            tees: [],
            totalScore: [],
            advStrokes: [],
            advTotalStrokes: [],
            holeInfo: [],
            carga: true
        };
    }

    componentDidMount = async () => {
        this.ListadoTodos()
        //this.destructureHoles(this.props.holeInfo);
        //this.calculateAdvStrokes(this.props.holeInfo, this.props.hcpAdj);
        Dimensions.addEventListener('change', (dimensions) => {
            const { width, height } = dimensions.window;
            this.setState({ horizontal: width > height });
        });
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
    ListadoStableFordStrokes(IDRound)
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
                      Te_TeeColor: item.PlayerTee,
                      ghinnumber: item.usu_ghinnumber,
                      photo: item.usu_imagen,
                      handicap: item.Strokes,
                      strokes: item.usu_golpesventaja,
                      ScoreIn: item.TotalScoreNetoFront,
                      ScoreOut: item.TotalScoreNetoBack,
                      ScoreInGP: item.TotalPuntosStableFordFront,
                      ScoreOutGP: item.TotalPuntosStableFordBack,
                      TotalScore: item.TotalScoreNeto,
                      TotalScoreGP: item.TotalPuntosStableFord,
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
                      1: item.ScoreNeto1,
                      2: item.ScoreNeto2,
                      3: item.ScoreNeto3,
                      4: item.ScoreNeto4,
                      5: item.ScoreNeto5,
                      6: item.ScoreNeto6,
                      7: item.ScoreNeto7,
                      8: item.ScoreNeto8,
                      9: item.ScoreNeto9,
                      10: item.ScoreNeto10,
                      11: item.ScoreNeto11,
                      12: item.ScoreNeto12,
                      13: item.ScoreNeto13,
                      14: item.ScoreNeto14,
                      15: item.ScoreNeto15,
                      16: item.ScoreNeto16,
                      17: item.ScoreNeto17,
                      18: item.ScoreNeto18,
                      GolpesVentaja1: item.PuntosHoyos1,
                      GolpesVentaja2: item.PuntosHoyos2,
                      GolpesVentaja3: item.PuntosHoyos3,
                      GolpesVentaja4: item.PuntosHoyos4,
                      GolpesVentaja5: item.PuntosHoyos5,
                      GolpesVentaja6: item.PuntosHoyos6,
                      GolpesVentaja7: item.PuntosHoyos7,
                      GolpesVentaja8: item.PuntosHoyos8,
                      GolpesVentaja9: item.PuntosHoyos9,
                      GolpesVentaja10: item.PuntosHoyos10,
                      GolpesVentaja11: item.PuntosHoyos11,
                      GolpesVentaja12: item.PuntosHoyos12,
                      GolpesVentaja13: item.PuntosHoyos13,
                      GolpesVentaja14: item.PuntosHoyos14,
                      GolpesVentaja15: item.PuntosHoyos15,
                      GolpesVentaja16: item.PuntosHoyos16,
                      GolpesVentaja17: item.PuntosHoyos17,
                      GolpesVentaja18: item.PuntosHoyos18,
                      GolpesVentaja1_tee: item.PuntosHoyos1,
                      GolpesVentaja2_tee: item.PuntosHoyos2,
                      GolpesVentaja3_tee: item.PuntosHoyos3,
                      GolpesVentaja4_tee: item.PuntosHoyos4,
                      GolpesVentaja5_tee: item.PuntosHoyos5,
                      GolpesVentaja6_tee: item.PuntosHoyos6,
                      GolpesVentaja7_tee: item.PuntosHoyos7,
                      GolpesVentaja8_tee: item.PuntosHoyos8,
                      GolpesVentaja9_tee: item.PuntosHoyos9,
                      GolpesVentaja10_tee: item.PuntosHoyos10,
                      GolpesVentaja11_tee: item.PuntosHoyos11,
                      GolpesVentaja12_tee: item.PuntosHoyos12,
                      GolpesVentaja13_tee: item.PuntosHoyos13,
                      GolpesVentaja14_tee: item.PuntosHoyos14,
                      GolpesVentaja15_tee: item.PuntosHoyos15,
                      GolpesVentaja16_tee: item.PuntosHoyos16,
                      GolpesVentaja17_tee: item.PuntosHoyos17,
                      GolpesVentaja18_tee: item.PuntosHoyos18,
                      Ho_Advantage1: item.ScoreHole1,
                      Ho_Advantage2: item.ScoreHole2,
                      Ho_Advantage3: item.ScoreHole3,
                      Ho_Advantage4: item.ScoreHole4,
                      Ho_Advantage5: item.ScoreHole5,
                      Ho_Advantage6: item.ScoreHole6,
                      Ho_Advantage7: item.ScoreHole7,
                      Ho_Advantage8: item.ScoreHole8,
                      Ho_Advantage9: item.ScoreHole9,
                      Ho_Advantage10: item.ScoreHole10,
                      Ho_Advantage11: item.ScoreHole11,
                      Ho_Advantage12: item.ScoreHole12,
                      Ho_Advantage13: item.ScoreHole13,
                      Ho_Advantage14: item.ScoreHole14,
                      Ho_Advantage15: item.ScoreHole15,
                      Ho_Advantage16: item.ScoreHole16,
                      Ho_Advantage17: item.ScoreHole17,
                      Ho_Advantage18: item.ScoreHole18,
                    }
                ))

                ListadoTeesRonda(IDRound)
                  .then((res2) => {
                    console.warn(res2)
                      if(res2.estatus == 1){
                        const list2 = res2.Result.map(item2 => (
                        {
                          id: item2.IDTees,
                          Te_TeeColor: item2.Te_TeeColor,
                          Par_Hole1: item2.Par_Hole1,
                          Par_Hole2: item2.Par_Hole2,
                          Par_Hole3: item2.Par_Hole3,
                          Par_Hole4: item2.Par_Hole4,
                          Par_Hole5: item2.Par_Hole5,
                          Par_Hole6: item2.Par_Hole6,
                          Par_Hole7: item2.Par_Hole7,
                          Par_Hole8: item2.Par_Hole8,
                          Par_Hole9: item2.Par_Hole9,
                          Par_Hole10: item2.Par_Hole10,
                          Par_Hole11: item2.Par_Hole11,
                          Par_Hole12: item2.Par_Hole12,
                          Par_Hole13: item2.Par_Hole13,
                          Par_Hole14: item2.Par_Hole14,
                          Par_Hole15: item2.Par_Hole15,
                          Par_Hole16: item2.Par_Hole16,
                          Par_Hole17: item2.Par_Hole17,
                          Par_Hole18: item2.Par_Hole18,
                        }
                    ))
                        this.setState({
                          tees:list2,
                          carga: false
                        })
                      }
                      else{
                        this.setState({
                          tees:[],
                          carga: false
                        })
                      }
                  })

                //this.llenaArreglo(list)

                this.setState({
                  holeInfo:list
                })
            }
            else{
              this.setState({
                holeInfo:[],
                carga:false
              })
            }
        })
  }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.holeInfo !== this.props.holeInfo) {
            this.destructureHoles(nextProps.holeInfo);
            //this.calculateAdvStrokes(nextProps.holeInfo, this.props.hcpAdj);
        }
    }

    render() {

        const {
            language,
            horizontal,
            tees,
            totalScore,
            advStrokes,
            advTotalStrokes,
            holeInfo,
            carga
        } = this.state;

        const {
            hcpAdj,
            initHole,
            switchAdv
        } = this.props;
        console.log('holeInfo: ', holeInfo);
        return (
            <View style={{ flex: 1 }}>
              <Spinner
                visible={carga}
                color={Colors.Primary} />
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
                {tees.length > 0 ? <ScrollView style={{ width: '100%' }}>
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
                        />
                    }
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
            const index = diffTees.findIndex(item => item.id === element.tee.id);
            if (index < 0) {
                diffTees.push({ ...element.tee, holes: element.holes });
            }
            element.holes.forEach(hole => {
                if(hole.hole_number <= 9){
                    scoref9 += hole.strokes;
                }else{
                    scoreb9 += hole.strokes;
                }
            });
            totalScore.push({scoref9, scoreb9});
        });
        this.setState({ tees: diffTees, totalScore });
    }

    calculateAdvStrokes = async (info, hcpAdj) => {
        let advStrokesArray = [];
        let advTotalStrokes = [];
        info.forEach(async element => {
            let totalStrokesf9 = 0;
            let totalStrokesb9 = 0;
            const handicap = parseInt(((element.handicap * element.tee.slope / 113) * hcpAdj).toFixed(0));
            const advStrokes = await CalculateAdv(handicap, element.tee.id);
            advStrokes.forEach((element, index) => {
                if(index < 9){
                    totalStrokesf9 += element;
                }else{
                    totalStrokesb9 += element;
                }
            });
            advTotalStrokes.push({totalStrokesf9, totalStrokesb9});
            advStrokesArray.push(advStrokes);
            this.setState({advStrokes: advStrokesArray, advTotalStrokes});
        });
        console.log('Adv Strokes Array: ', advStrokesArray);
    }
}

export default ScoreCardView;
