import React, { Component } from 'react';
import { View, Text, Dimensions, Image, ImageBackground, StyleSheet, AsyncStorage,Alert } from 'react-native';
import StyleInicio from '../Styles/StyleInicio';
import { Button } from 'react-native-elements';
let ScreenHeight = Dimensions.get("window").height;
import { RNToasty } from 'react-native-toasty'
import { NetInfo } from "react-native";
import { EncuestaCompleta2, GuardarRespuesta } from '../Services/Services';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SQLite from 'react-native-sqlite-storage';
import ActivityIndicatorComponent from '../Components/ActivityIndicatorComponent.js'


export default class SubirEncuestas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Estado: false,
      NumeroEncuestas: 0,
      status:false,
      habilitaBoton:false,
      procesaBoton:false
    }

    this.NumeroEncuestaPendientes()

    // this.pruebita()
  }


  componentDidMount() {

    NetInfo.isConnected.fetch().then(isConnected => {
      //console.warn('First, is ' + (isConnected ? 'online' : 'offline'));

      this.setState({
        Estado: isConnected
      });

      let EstadoApp = '';

      if (isConnected == true) {
        EstadoApp = 'Online'


      }
      else {
        EstadoApp = 'Offline'

        RNToasty.Error({ title: 'No cuentas con acceso a internet' })
        this.props.navigation.goBack()
      }

    });

  }

  pruebita = async () => {

    db = SQLite.openDatabase({ name: "EnSondePazLocal", createFromLocation: "~EnSondePazLocal.db" },
      this.openSuccess, this.openError);

    let date = new Date().getDate(); //Current Date
    let month = new Date().getMonth() + 1; //Current Month
    let year = new Date().getFullYear(); //Current Year
    let hours = new Date().getHours(); //Current Hours
    let min = new Date().getMinutes(); //Current Minutes
    let sec = new Date().getSeconds(); //Current Seconds

    Fecha = year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec


    let IDEncuesta = 1;
    let IDUsuario = 44;
    let FechaFinalizacion = Fecha;
    let Estatus = 'Completada'

    db.transaction((tx) => {

      let sql = `UPDATE Encuesta set Fecha_Finalizacion = "${FechaFinalizacion}", Estatus1="${Estatus}"  ` +
        ` where IDEncuesta = "${IDEncuesta}" and IDUsuario= "${IDUsuario}" AND Fecha_Finalizacion IS NULL;`

      console.warn(sql);
      tx.executeSql(sql, [], (tx, results) => {
        console.warn("Query completed");

        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Encuesta', [], (tx, results) => {

            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              console.warn(`Encuesta: ${row.IDEncuesta}`);
            }
          });
        });

      });
    });

  }


  NumeroEncuestaPendientes = async () => {

    db = SQLite.openDatabase({ name: "DragonGolf", createFromLocation: "~DragonGolf.db" },
      this.openSuccess, this.openError);

    let IdUsuario = await AsyncStorage.getItem('usu_id')

    db.transaction((tx) => {

     // let sql = `SELECT *  FROM Encuesta where IDUsuario = "${IdUsuario}"`;

      //let sql = `Select * from EncuestaResultados where IDEncuesta = 1`;

      let sql = `SELECT count(1) as Contador  FROM Settings where usu_id = "${IdUsuario}"' `;

      tx.executeSql(sql, [], (tx, results) => {
        console.warn('OK');

        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          console.warn(row);

          this.setState({
           NumeroEncuestas: row.Contador
          })

        }

      });
    });
  }

  NumeroEncuestaPendientes2 = async () => {

    db.transaction((tx) => {

      let sql = `SELECT count(1) as Contador  FROM Encuesta where Fecha_Finalizacion is not null and Estatus1='Completada' `;

      tx.executeSql(sql, [], (tx, results) => {
        

        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
         

          this.setState({
           NumeroEncuestas: row.Contador
          })

          console.warn(row.Contador);

          if (row.Contador == 0)
          {

            RNToasty.Success({ title: 'Todas las encuestas se cargaron correctamente' })
            this.setState({
              status: false,
              habilitaBoton:false,
              procesaBoton:false
            })
          }

        }

      });
    });
  }

  EliminaEncuestasSubidas = async (IDEncuesta) => {

    db.transaction((tx) => {

      let sql = `delete from Encuesta where IDEncuesta ="${IDEncuesta}"`;

      tx.executeSql(sql, [], (tx, results) => {

        var len = results.rows.length;
        //

        this.NumeroEncuestaPendientes2()

        //RNToasty.Success({ title: 'Encuestas Eliminadas Correctamente' })

      });
    });
  }

  SubirEncuestaCabecera = async () => {

    this.setState({
      status: true,
      habilitaBoton:true,
      procesaBoton:true
    })

    let IdUsuario = await AsyncStorage.getItem('IDUsuario')

    db.transaction((tx) => {

      let sql = `Select * from Encuesta where IDUsuario = "${IdUsuario}" and Fecha_Finalizacion is not null and Estatus1='Completada'`;

      tx.executeSql(sql, [], (tx, results) => {
        console.warn('Consulta OK')

        var len = results.rows.length;

        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          
          let IDEncuestaLocal = row.IDEncuesta
         
          let IDUsuario = row.IDUsuario
          let PersonaEncuenta = row.Persona_Encuestada
          
          let Ubicacion = 'N/A'
          let Latitud = 0
          let Longitud = 0
          let CP = row.CodigoPostal
          let Colonia = row.Colonia
          let calle = row.Calle
          let telefono = row.Telefono
          let edad = row.Edad
          let NombreJefe = row.NombreJefe
          let Numero_Exterior = row.Numero_Exterior
          let Estatus = row.Estatus1
          let ViveEnSanLuis = row.ViveSanLuisPotosi
          let FechaInicio = row.Fecha_Creacion
          let FechaFin = row.Fecha_Finalizacion
          let Localidad = row.Localidad
          let clavelocalidad = row.ClaveLocalidad


          console.warn(Localidad)

          setTimeout(function(){
 
          }, 2000); 

          EncuestaCompleta2(IDUsuario,
            PersonaEncuenta,
            Ubicacion,
            Latitud,
            Longitud,
            CP,
            Colonia,
            calle,
            telefono,
            edad,
            NombreJefe,
            Numero_Exterior,
            Estatus,
            ViveEnSanLuis,
            FechaInicio,
            FechaFin,
            Localidad,
            clavelocalidad
            )
            .then((res) => {
              console.warn(res)
              if (res.estatus == 1) {

                let IDEncuesta = res.idencuesta

                console.warn('Encuesta subida correctamente:' + IDEncuesta)

                db.transaction((tx) => {

                  let sql = `Select * from EncuestaResultados where IDEncuesta = "${IDEncuestaLocal}"`;

                  tx.executeSql(sql, [], (tx, results) => {

                    var len = results.rows.length;

                    for (let i = 0; i < len; i++) {
                      let row = results.rows.item(i);

                      let IDPregunta = row.IDPregunta
                      let IDRespuesta = row.IDRespuesta
                      let RespuestaDescripcion = row.RespuestaDescripcion

                      setTimeout(function(){
 
                      }, 1000); 

                      GuardarRespuesta(IDEncuesta, 0, IDPregunta, IDRespuesta, RespuestaDescripcion, 0)
                        .then((res) => {

                          if (res.estatus == 1) {
                            console.warn(res.mensaje)
                          }
                          else {
                            console.warn(res.mensaje)
                            return;
                          }
                        }
                        );

                    }

                  //  this.setState({
                 //     status: false,
                 //     NumeroEncuestas:0,
                  //    habilitaBoton:false,
                  //    procesaBoton:false
                  //  })

                    RNToasty.Success({ title: 'Encuesta con ID:' + IDEncuesta + ' Subida correctamente' })

                   this.EliminaEncuestasSubidas(IDEncuestaLocal)
                  });
                });

              }
              else {

                this.setState({
                  status: false,
                  NumeroEncuestas:0,
                  habilitaBoton:false,
                  procesaBoton:false
                });

              }

            });
        }

      });
    });

  }
  clicked = async () => {

    Alert.alert(
      'En Son De Paz',
      "Al subir las encuestas asegurse de no perder la conexion a internet,ya que al termino de la subida se borraran las encuestas creadas localmente",
      [
        { text: 'Cancelar', onPress: () => { return null } },
        {
          text: 'Confirmar', onPress: () => {
          
            this.SubirEncuestaCabecera()
          }
        },
      ],
      { cancelable: false }
    )


  
  }

  render() {
    const resizeMode = 'center';

    const {habilitaBoton, procesaBoton} =this.state;

    return (

      <ImageBackground
        style={{
          backgroundColor: '#fff',
          flex: 1,
          resizeMode,
          position: 'absolute',
          width: '101%',
          height: '100%',
          justifyContent: 'center',
        }}
        source={require('../Resources/Img/Fondo.png')}>
        <KeyboardAwareScrollView >
          <View style={StyleInicio.Box1}>
            <Text style={StyleInicio.titleText}>Encuestas Pendientes de subir</Text>
            {/*   <TouchableOpacity onPress={() => this.props.navigation.navigate('Mapa')}>
            </TouchableOpacity>
           

        
          */}
            <Image style={StyleInicio.imagenButton} width={200} height={170}
              source={require('../Resources/Img/LogoSimple.png')} />

            <Text style={StyleInicio.bodyText}>Cuentas con {this.state.NumeroEncuestas} encuestas pendientes</Text>
          </View>
          <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', ...StyleSheet.absoluteFillObject }}>
            <ActivityIndicatorComponent visible={this.state.status} />
          </View>
          <View style={StyleInicio.Botones}>
            <Button title='Subir Encuestas'
              fontWeight='bold'
              disabled={habilitaBoton}
              loading ={procesaBoton}
              buttonStyle={{ backgroundColor: "#337FC1", borderRadius: 15 }}
              titleStyle={{ fontFamily: 'BankGothic Lt BT', textAlignVertical: 'bottom', fontSize: 20 }}
              onPress={this.clicked} />

          </View>

        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}
