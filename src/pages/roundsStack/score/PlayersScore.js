import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import { Dictionary } from '../../../utils/Dictionary';
import PlayerScoreComponent from './PlayerScoreComponent';
import styles from './styles';
import HoleHeader from './HoleHeader';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../utils/Colors';
import { showMessage } from "react-native-flash-message";
import { ActualizarRondaHoyos } from '../../../Services/Services'

class PlayersScore extends Component {
  constructor(props) {
    super(props);
    /*let holeScore = '';

        const { holeInfo, index, hole } = props;
        if (holeInfo) {
            if (holeInfo.length > 0) {
                try {
                    if (holeInfo[index].holes[hole - 1].strokes) {
                        holeScore = holeInfo[index].holes[hole - 1].strokes.toString();
                    }
                } catch (error) {

                }
            }
        }*/

    this.state = {
      language: '',
      buttonIndex: null,
      par: 0,
      adv: 0,
      inputStyle: styles.input,
      inputBorder: {},
      playerHole: this.props.playerHole
    };

    //this.llenaArreglo()
    

    this.outputEvent = this.outputEvent.bind(this);
    }
    outputEvent = async (score,id,hole,IDRound) => {
        //console.warn(this.props.playerHole)
        //console.warn(hole)
        // the event context comes from the Child
        let playersHoleAux = this.props.playerHole
        if(playersHoleAux.length>0){
            for (var i = 0; i <= this.props.players.length - 1; i++) {
                for (var j = 0; j <= 17; j++) {
                    if(playersHoleAux[i][j]==id){
                        playersHoleAux[i][hole]=score
                        console.warn(id.toString())
                        console.warn(playersHoleAux[i].toString())
                        AsyncStorage.setItem(id.toString(), '0');
                        AsyncStorage.setItem(id.toString(), playersHoleAux[i].toString());
                    }
                }
            }
            this.setState({
                playerHole:playersHoleAux
            })
        }
        else{
            //this.llenaArreglo()
        }
        /*console.warn(score)
        console.warn(id)
        console.warn(hole)
        console.warn(IDRound)//this.setState({ count: this.state.count++ });*/
    }

    /*llenaArreglo = async () => {
    //console.warn('Entró')
    let language = await AsyncStorage.getItem('language')
    let playersHoleAux = []
    for (var i = 0; i <= this.props.players.length - 1; i++) {
        let HolesAux = []
        HolesAux.push(this.props.players[i].id)
        for (var j = 0; j <= 17; j++) {
            HolesAux.push(0)
        }
        playersHoleAux.push(HolesAux)
    }

    this.setState({
        language:language,
        playerHole:playersHoleAux
    })
    }*/

  componentDidMount = async () => {
    //console.warn('Entró')
    let language = await AsyncStorage.getItem('language')
    /*let playersHoleAux = []
    for (var i = 0; i <= this.props.players.length - 1; i++) {
        let HolesAux = []
        HolesAux.push(this.props.players[i].id)
        for (var j = 0; j <= 17; j++) {
            HolesAux.push(0)
        }
        playersHoleAux.push(HolesAux)
    }*/

    this.setState({
        language:language,
        //playerHole:playersHoleAux
    })
    }

    /*setHoleData = (holeInfo, switchAdv) => {
        const { index, hole } = this.props;

        try {
            const score = holeInfo[index].holes[hole - 1].strokes;
            const par = holeInfo[index].holes[hole - 1].par;
            let adv = holeInfo[index].holes[hole - 1].adv;
            const buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
            if (switchAdv) {
                if (adv % 2 === 0) adv--;
                else adv++;
            }
            const inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
            const inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
            this.setState({
                par,
                adv,
                buttonIndex,
                inputStyle,
                inputBorder
            });

        } catch (error) {
            console.log('====================================');
            console.log(error + ' file: PlayerScoreComponent, line: 30');
            console.log('====================================');
        }
    }

    onPressButtonGroup = (par, value) => {
        console.warn(par)
        const { holeScore } = this.state;
        const { holeInfo, index, hole } = this.props;
        this.setState({ buttonIndex: value });
        let bogy = 0;
        let score = 0;
        if (holeInfo) {
            if (holeInfo[index].holes[hole - 1].par)
                par = parseInt(holeInfo[index].holes[hole - 1].par);
        }
        if (par) {
            bogy = par + 1;
        }
        switch (value) {
            case 0:
                score = (parseInt(holeScore) <= (par - 1) && parseInt(holeScore) > 1 ? parseInt(holeScore) - 1 : (par - 1));
                break;
            case 1:
                score = par;
                break;
            case 2:
                score = bogy;
                break;
            case 3:
                score = (parseInt(holeScore) >= (bogy + 1) && parseInt(holeScore) < 99 ? parseInt(holeScore) + 1 : (bogy + 1));
                break;
        }
        const buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
        const inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
        const inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
        this.setState({ holeScore: score.toString(), buttonIndex, inputStyle, inputBorder });
        this.saveScore(score);
    }

    componentDidMount() {
        const { index, hole, holeInfo} = this.props;
        if (holeInfo) {
            if (holeInfo.length > 0) {
                this.setHoleData(holeInfo, this.props.switchAdv);
                if (!this.state.holeScore) {
                    try {
                        if (holeInfo[index].holes[hole - 1].strokes) {
                            this.setState({ holeScore: holeInfo[index].holes[hole - 1].strokes.toString() });
                        }
                    } catch (error) {

                    }
                }
            }
        }
    }*/

    /*onChangeScore = (score) => {
        this.setState({ holeScore: score.toString()});
        this.saveScore(score);
            /*if (parseInt(score ? score : 1) > 0) {
                const { holeInfo, index, hole } = this.props;
                const par = holeInfo[index].holes[hole - 1].par;
                score = score ? parseInt(score) : '';
                const buttonIndex = score === par - 1 ? 0 : score === par ? 1 : score === par + 1 ? 2 : score === par + 2 ? 3 : null;
                const inputStyle = score === par - 2 ? styles.eagleInput2 : score === par - 1 ? styles.birdieInput : score === par ? styles.parInput : score === par + 1 ? styles.bogeyInput : score >= par + 2 ? styles.dblInput2 : styles.input;
                const inputBorder = score === par - 2 ? styles.eagleInput1 : score >= par + 2 ? styles.dblInput1 : {};
                this.setState({ holeScore: score.toString(), buttonIndex, inputStyle, inputBorder });
                this.saveScore(score);
            }
    }*/

    guardar = async () => {
        let idUsu = await AsyncStorage.getItem('usu_id')
        let IDRound = await AsyncStorage.getItem('IDRound')
        console.warn(idUsu)
        console.warn(IDRound)
        console.warn(this.state.playerHole)
        let arreglo = ''
        for (var i = 0; i <= this.state.playerHole.length - 1; i++) {
            let HolesAux = []
            for (var j = 0; j <= 18; j++) {
                HolesAux.push(this.state.playerHole[i][j])
            }
            HolesAux='['+HolesAux.toString()+']'
            arreglo += HolesAux
        }
        console.warn(arreglo)
        ActualizarRondaHoyos(IDRound, idUsu, '['+arreglo+']', this.state.playerHole.length)
        .then((res) => {
          console.warn(res)
            if(res.estatus == 1){
              showMessage({
                message: Dictionary.successSaveTeeData[this.state.language],
                type:'success',
              });
            }
            else{
              showMessage({
                message: Dictionary.error[this.state.language],
                type:'danger',
              });
            }
        })
    }

  render() {

    const {
      item: hole,
      players
    } = this.props;

     const {
      language,
      holeScore,
      inputStyle,
      inputBorder
    } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View>
          <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> this.guardar()}>
            <MaterialIcon name={'save'} size={25} color={Colors.Primary} />
          </TouchableOpacity>
        </View>
        <FlatList
          ListHeaderComponent={<HoleHeader hole={hole} />}
          data={players}
          extraData={players}
          keyExtractor={item => item.id.toString()}
          style={{ flex: 1, paddingVertical: 5 }}
          renderItem={({ item, index }) => (
          <PlayerScoreComponent item={item} hole={hole} index={index} language={language} clickHandler={this.outputEvent} />/*
            <View>
                {
                  hole==1&&
                    <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par1}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage1}</Text>
                    </View>
                  }
                  {hole==2&&
                    <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par2}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage2}</Text>
                    </View>
                }
                {hole==3&&
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par3}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage3}</Text>
                    </View>
                }
                {hole==4&&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                            <Text>PAR: </Text>
                            <Text style={styles.dataValues}>{item.ho_par4}</Text>
                            <Text>ADV: </Text>
                            <Text style={styles.dataValues}>{item.Ho_Advantage4}</Text>
                        </View>
                    }
                {hole==5&&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                            <Text>PAR: </Text>
                            <Text style={styles.dataValues}>{item.ho_par5}</Text>
                            <Text>ADV: </Text>
                            <Text style={styles.dataValues}>{item.Ho_Advantage5}</Text>
                        </View>
                    }
                {hole==6&&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                            <Text>PAR: </Text>
                            <Text style={styles.dataValues}>{item.ho_par6}</Text>
                            <Text>ADV: </Text>
                            <Text style={styles.dataValues}>{item.Ho_Advantage6}</Text>
                        </View>
                    }
                {hole==7&&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                            <Text>PAR: </Text>
                            <Text style={styles.dataValues}>{item.ho_par7}</Text>
                            <Text>ADV: </Text>
                            <Text style={styles.dataValues}>{item.Ho_Advantage7}</Text>
                        </View>
                    }
                {hole==8&&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                            <Text>PAR: </Text>
                            <Text style={styles.dataValues}>{item.ho_par8}</Text>
                            <Text>ADV: </Text>
                            <Text style={styles.dataValues}>{item.Ho_Advantage8}</Text>
                        </View>
                    }
                {hole==9&&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                            <Text>PAR: </Text>
                            <Text style={styles.dataValues}>{item.ho_par9}</Text>
                            <Text>ADV: </Text>
                            <Text style={styles.dataValues}>{item.Ho_Advantage9}</Text>
                        </View>
                    }
                {hole==10&&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                            <Text>PAR: </Text>
                            <Text style={styles.dataValues}>{item.ho_par10}</Text>
                            <Text>ADV: </Text>
                            <Text style={styles.dataValues}>{item.Ho_Advantage10}</Text>
                        </View>
                }
                {hole==11&&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                            <Text>PAR: </Text>
                            <Text style={styles.dataValues}>{item.ho_par11}</Text>
                            <Text>ADV: </Text>
                            <Text style={styles.dataValues}>{item.Ho_Advantage11}</Text>
                        </View>
                }
                {hole==12&&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                            <Text>PAR: </Text>
                            <Text style={styles.dataValues}>{item.ho_par12}</Text>
                            <Text>ADV: </Text>
                            <Text style={styles.dataValues}>{item.Ho_Advantage12}</Text>
                        </View>
                }
                {hole==13&&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                            <Text>PAR: </Text>
                            <Text style={styles.dataValues}>{item.ho_par13}</Text>
                            <Text>ADV: </Text>
                            <Text style={styles.dataValues}>{item.Ho_Advantage13}</Text>
                        </View>
                }
                {hole==14&&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                            <Text>PAR: </Text>
                            <Text style={styles.dataValues}>{item.ho_par14}</Text>
                            <Text>ADV: </Text>
                            <Text style={styles.dataValues}>{item.Ho_Advantage14}</Text>
                        </View>
                }
                {hole==15&&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                            <Text>PAR: </Text>
                            <Text style={styles.dataValues}>{item.ho_par15}</Text>
                            <Text>ADV: </Text>
                            <Text style={styles.dataValues}>{item.Ho_Advantage15}</Text>
                        </View>
                }
                {hole==16&&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                            <Text>PAR: </Text>
                            <Text style={styles.dataValues}>{item.ho_par16}</Text>
                            <Text>ADV: </Text>
                            <Text style={styles.dataValues}>{item.Ho_Advantage16}</Text>
                        </View>
                }
                {hole==17&&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                            <Text>PAR: </Text>
                            <Text style={styles.dataValues}>{item.ho_par17}</Text>
                            <Text>ADV: </Text>
                            <Text style={styles.dataValues}>{item.Ho_Advantage17}</Text>
                        </View>
                }
                {hole==18&&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                            <Text>PAR: </Text>
                            <Text style={styles.dataValues}>{item.ho_par18}</Text>
                            <Text>ADV: </Text>
                            <Text style={styles.dataValues}>{item.Ho_Advantage18}</Text>
                        </View>
                }
                <View style={styles.playerScoreView}>
                    <View style={styles.playerScoreNameView}>
                        <Text style={styles.playerScoreNameText} numberOfLines={1} adjustsFontSizeToFit >{item.nickname}</Text>
                    </View>
                    <View style={styles.inputView}>
                        <View style={inputBorder}>
                            <TextInput
                                style={inputStyle}
                                maxLength={2}
                                value={holeScore}
                                onChangeText={this.onChangeScore}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                    {hole==1&&
                     <View style={styles.buttonGroupView}>
                        <TouchableOpacity
                            style={styles.birdieButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par1,0)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.parButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par1,1)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bogeyButtonView}
                            onPress={_ => this.onPressButtonGroup(item.ho_par1,2)}
                        >
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dblButtonView1}
                            onPress={_ => this.onPressButtonGroup(item.ho_par1,3)}
                        >
                            <View style={styles.dblButtonView2}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    }
                    {hole==2&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par2,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par2,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par2,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par2,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==3&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par3,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par3,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par3,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par3,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==4&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par4,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par4,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par4,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par4,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==5&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par5,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par5,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par5,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par5,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==6&&
                            <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par6,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par6,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par6,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par6,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==7&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par7,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par7,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par7,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par7,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==8&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par8,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par8,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par8,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par8,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==9&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par9,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par9,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par9,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par9,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==10&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par10,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par10,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par10,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par10,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==11&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par11,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par11,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par11,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par11,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==12&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par12,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par12,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par12,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par12,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==13&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par13,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par13,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par13,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par13,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==14&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par14,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par14,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par14,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par14,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==15&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par15,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par15,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par15,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par15,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==16&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par16,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par16,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par16,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par16,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==17&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par17,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par17,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par17,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par17,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    {hole==18&&
                             <View style={styles.buttonGroupView}>
                                <TouchableOpacity
                                    style={styles.birdieButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par18,0)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Birdie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.parButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par18,1)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>Par</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bogeyButtonView}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par18,2)}
                                >
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 11 : null }}>Bogey</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dblButtonView1}
                                    onPress={_ => this.onPressButtonGroup(item.ho_par18,3)}
                                >
                                    <View style={styles.dblButtonView2}>
                                        <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: Platform.OS === 'android' ? 12 : null }}>DBL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                </View>
                {/*<View style={[styles2.bottomButtom,{margin:20, flex:0.07}]}>
                  <DragonButton title={Dictionary.save[language]} onPress={this.submit} />
                </View>}
            </View>
          */)}
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