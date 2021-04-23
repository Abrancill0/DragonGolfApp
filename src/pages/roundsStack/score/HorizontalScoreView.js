import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Dictionary } from '../../../utils/Dictionary';
import styles from './styles';
import PlayerScoreComponent from './PlayerScoreComponent';
import ListEmptyComponent from '../../global/ListEmptyComponent';
import HorizontalScoreComponent from './HorizontalScoreComponent';
import { ListadoAmigosRonda } from '../../../Services/Services'
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../utils/Colors';
import { showMessage } from "react-native-flash-message";
import { ActualizarRondaHoyos } from '../../../Services/Services'

class HorizontalScoreView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          language: ''
        };
        this.outputEvent = this.outputEvent.bind(this);
      }
      componentDidMount = async () => {
        //console.warn('Entró')
        let language = await AsyncStorage.getItem('language')
        /*Dimensions.addEventListener('change', (dimensions) => {
          this.guardar(2)
        });*/
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

      outputEvent = async (score,id,hole,IDRound) => {
        console.warn(this.props.playerHole)
        console.warn(this.props.players.length)
        console.warn(id)
        //console.warn(hole)
        // the event context comes from the Child
        let playersHoleAux = this.props.playerHole
        if(playersHoleAux.length>0){
            for (var i = 0; i <= this.props.players.length - 1; i++) {
                for (var j = 0; j <= 17; j++) {
                    console.warn(playersHoleAux[i][j])
                    if(playersHoleAux[i][j]==id){
                        console.warn('entra')
                        playersHoleAux[i][hole]=score
                        //console.warn(id.toString())
                        //console.warn(playersHoleAux[i].toString())
                        //AsyncStorage.setItem(id.toString(), playersHoleAux[i].toString());
                    }
                }
            }
            this.setState({
                playerHole:playersHoleAux
            })
            console.warn(this.props.playerHole)
            this.guardar(2)
        }
        else{
            //this.llenaArreglo()
        }
        /*console.warn(score)
        console.warn(id)
        console.warn(hole)
        console.warn(IDRound)//this.setState({ count: this.state.count++ });*/
    }

    guardar = async (tipo) => {
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
        if(arreglo!= ''){
        ActualizarRondaHoyos(IDRound, idUsu, '['+arreglo+']', this.state.playerHole.length)
        .then((res) => {
          console.warn(res)
          if(tipo==1){
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
          }
        })
        }
    }

    render() {

        const {
            holes,
            holes2,
            players,
            playerHole,
            props
        } = this.props;

        const {
            language
        } = this.state;

        const {
            emptyRoundPlayerList,
            hole: holeText
        } = Dictionary;

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex:0.8, justifyContent: 'flex-start' }}>
                        <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> props.navigation.openDrawer()}>
                          <MaterialIcon name={'menu'} size={25} color={Colors.Primary} />
                        </TouchableOpacity>
                      </View>
                {/*<View>
                  <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> this.guardar(1)}>
                    <MaterialIcon name={'save'} size={25} color={Colors.Primary} />
                  </TouchableOpacity>
                </View>*/}
                </View>
                <ScrollView keyboardShouldPersistTaps='handled' style={{ paddingTop: 2 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ width: 70 }}>
                            <View style={{ height: 80 }} />
                            {players.map(item =>
                                <View key={item.id.toString()} style={[styles.playerScoreNameView, {height: 55, justifyContent: 'flex-end'}]}>
                                    <Text style={styles.playerScoreNameText} numberOfLines={1} adjustsFontSizeToFit >{item.nickname}</Text>
                                </View>
                            )}
                        </View>
                        <View style={{ flex: 1, paddingRight: 20}}>
                            <View style={{ flex: 0.2, flexDirection: 'row', alignSelf:'center' }}>
                                <TouchableOpacity style={{ marginHorizontal:20}} onPress={()=> this.refs.scrollView.scrollTo({x: 0, y: 0, animated: true})}><Text style={styles.holeTitle}>1-9</Text></TouchableOpacity>
                                <TouchableOpacity style={{ marginHorizontal:20}} onPress={()=> this.refs.scrollView.scrollToEnd(0)}><Text style={styles.holeTitle}>10-18</Text></TouchableOpacity>
                            </View>
                            <ScrollView keyboardShouldPersistTaps='handled' horizontal ref="scrollView">
                                {holes.map(({ hole }) =>
                                    <View key={hole.toString()}>
                                        <View style={styles.horizontalHoleView}>
                                            <View style={{ alignItems: 'center', height: 40, marginTop:20 }}>
                                                <Text style={styles.holeTitle}>{holeText[language]}</Text>
                                                <Text style={[styles.holeNumber, { fontSize: 16 }]}>{hole}</Text>
                                            </View>
                                            <View style={{ width: '100%', paddingVertical: 10 }}>
                                                {players.map((item, index) => <HorizontalScoreComponent key={index.toString()} item={item} hole={hole} index={index} clickHandler={this.outputEvent} />)}
                                            </View>
                                        </View>
                                    </View>
                                )}
                                <View style={styles.horizontalHoleView}>
                                            <View style={{ alignItems: 'center', height: 40, marginTop:20 }}>
                                                <Text style={styles.holeTitle}></Text>
                                                <Text style={[styles.holeNumber, { fontSize: 16 }]}>IN</Text>
                                            </View>
                                                <View style={{ width: '100%', paddingVertical: 10 }}>
                                                    {players.map((item, index) => 
                                                            <View style={{marginTop:20, borderRadius: 5,borderColor: Colors.Primary,borderWidth: 0.8, width: 40, height:34}}>
                                                            <TextInput
                                                                editable={false}
                                                                selectTextOnFocus={true}
                                                                style={styles.parInput}
                                                                maxLength={2}
                                                                value={item.in.toString()}
                                                                onChangeText={(score)=>this.onChangeScore(score,1)}
                                                                keyboardType='number-pad'
                                                                color='black'
                                                            />
                                                        </View>
                                                    )}
                                                </View>
                                        </View>
                                <View style={styles.horizontalHoleView}>
                                            <View style={{ alignItems: 'center', height: 40, marginTop:20 }}>
                                                <Text style={styles.holeTitle}></Text>
                                                <Text style={[styles.holeNumber, { fontSize: 16 }]}>OUT</Text>
                                            </View>
                                                <View style={{ width: '100%', paddingVertical: 10 }}>
                                                    {players.map((item, index) => 
                                                            <View style={{marginTop:20, borderRadius: 5,borderColor: Colors.Primary,borderWidth: 0.8, width: 40, height:34}}>
                                                            <TextInput
                                                                editable={false}
                                                                selectTextOnFocus={true}
                                                                style={styles.parInput}
                                                                maxLength={2}
                                                                value={item.out.toString()}
                                                                onChangeText={(score)=>this.onChangeScore(score,1)}
                                                                keyboardType='number-pad'
                                                                color='black'
                                                            />
                                                        </View>)}
                                                </View>
                                </View>
                                        <View style={styles.horizontalHoleView}>
                                            <View style={{ alignItems: 'center', height: 40, marginTop:20 }}>
                                                <Text style={styles.holeTitle}></Text>
                                                <Text style={[styles.holeNumber, { fontSize: 16 }]}>TOT</Text>
                                            </View>
                                                <View style={{ width: '100%', paddingVertical: 10 }}>
                                                    {players.map((item, index) => 
                                                            <View style={{marginTop:20, borderRadius: 5,borderColor: Colors.Primary,borderWidth: 0.8, width: 40, height:34}}>
                                                                <TextInput
                                                                    editable={false}
                                                                    selectTextOnFocus={true}
                                                                    style={styles.parInput}
                                                                    maxLength={2}
                                                                    value={item.tot.toString()}
                                                                    onChangeText={(score)=>this.onChangeScore(score,1)}
                                                                    keyboardType='number-pad'
                                                                    color='black'
                                                                />
                                                            </View>)}
                                                </View>
                                        </View>
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default HorizontalScoreView;
