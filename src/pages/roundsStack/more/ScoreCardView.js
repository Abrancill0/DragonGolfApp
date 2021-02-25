import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import ScoreHorizontalComponent from './ScoreHorizontalComponent';
import ScoreVerticalComponent from './ScoreVerticalComponent';
import { Dictionary } from '../../../utils/Dictionary';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { ListadoAmigosRonda } from '../../../Services/Services'

class ScoreCardView extends Component {
    constructor(props) {
        super(props);

        let horizontal = false;
        if (Dimensions.get('window').width > Dimensions.get('window').height) {
            horizontal = true;
        }

        this.state = {
            language: 'es',
            horizontal,
            tees: [],
            totalScore: [],
            advStrokes: [],
            advTotalStrokes: [],
            holeInfo: []
        };

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

            title = 'props.course.short_name + ` ${month} ${day}`';
        }

        props.navigation.setParams({
            Title: title,
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.getParam('Title', 'Score Card')}`,
        }
    }

    componentDidMount() {
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
                  holeInfo:list,
                  carga:false
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
            holeInfo
        } = this.state;

        const {
            hcpAdj,
            initHole,
            switchAdv
        } = this.props;
        console.log('holeInfo: ', holeInfo);
        return (
            <View style={{ flex: 1 }}>
                {holeInfo.length > 0 ? <ScrollView style={{ width: '100%' }}>
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
