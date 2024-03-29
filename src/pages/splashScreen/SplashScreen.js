import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Image,
    Animated,
    Text,
    Platform,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { getLanguage, getSessionToken } from '../../utils/Session';
import { actionLanguage, actionGetUserData } from '../../store/actions';

//assets
import SplashImage from '../../../assets/splash.png';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        opacityImage: new Animated.Value(0),
        opacityD: new Animated.Value(0),
        opacityR: new Animated.Value(0),
        opacityA: new Animated.Value(0),
        opacityG: new Animated.Value(0),
        opacityO: new Animated.Value(0),
        opacityN: new Animated.Value(0),
        opacityG2: new Animated.Value(0),
        opacityO2: new Animated.Value(0),
        opacityL: new Animated.Value(0),
        opacityF: new Animated.Value(0),
    };

    this.entranceAnimation();
  }

  render() {

    const {
        opacityImage,
        opacityD,
        opacityR,
        opacityA,
        opacityG,
        opacityO,
        opacityN,
        opacityG2,
        opacityO2,
        opacityL,
        opacityF,
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar
            backgroundColor="transparent"
            barStyle="dark-content"
            translucent
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Animated.Image
                source={SplashImage}
                style={[styles.image, {opacity: opacityImage}]}
                resizeMode='contain'
            />
            <View style={styles.textView}>
                {Platform.OS === 'ios' ? <Text style={{textAlign: 'left', letterSpacing: 5}} >
                    <Animated.Text style={[styles.text, {opacity: opacityD}]}>D</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityR}]}>R</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityA}]}>A</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityG}]}>G</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityO}]}>O</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityN}]}>N</Animated.Text>
                    <Animated.Text style={styles.text}> </Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityG2}]}>G</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityO2}]}>O</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityL}]}>L</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityF}]}>F</Animated.Text>
                </Text> :
                <>
                    <Animated.Text style={[styles.text, {opacity: opacityD}]}>D</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityR}]}>R</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityA}]}>A</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityG}]}>G</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityO}]}>O</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityN}]}>N</Animated.Text>
                    <Animated.Text style={styles.text}> </Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityG2}]}>G</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityO2}]}>O</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityL}]}>L</Animated.Text>
                    <Animated.Text style={[styles.text, {opacity: opacityF}]}>F</Animated.Text>
                </>
                }
            </View>
        </View>
      </View>
    );
  }

  entranceAnimation = () => {
    const duration = 200;

    Animated.parallel([
        Animated.timing(this.state.opacityImage, {
            toValue: 1,
            duration: 2000,
        }),
        Animated.timing(this.state.opacityD, {
            toValue: 1,
            duration: duration * 2,
        }),
        Animated.timing(this.state.opacityR, {
            toValue: 1,
            duration: duration * 3,
        }),
        Animated.timing(this.state.opacityA, {
            toValue: 1,
            duration: duration * 4,
        }),
        Animated.timing(this.state.opacityG, {
            toValue: 1,
            duration: duration * 5,
        }),
        Animated.timing(this.state.opacityO, {
            toValue: 1,
            duration: duration * 6,
        }),
        Animated.timing(this.state.opacityN, {
            toValue: 1,
            duration: duration * 7,
        }),
        Animated.timing(this.state.opacityG2, {
            toValue: 1,
            duration: duration * 8,
        }),
        Animated.timing(this.state.opacityO2, {
            toValue: 1,
            duration: duration * 9,
        }),
        Animated.timing(this.state.opacityL, {
            toValue: 1,
            duration: duration * 10,
        }),
        Animated.timing(this.state.opacityF, {
            toValue: 1,
            duration: duration * 11,
        }),
    ]).start(() => {
        this.loopAnimation();
        this.getAsyncStorageData();
    });
  }

  getAsyncStorageData = async () => {
    const language = await getLanguage();
    if(language) this.props.changeLanguage(language);
    const token = await getSessionToken();
    // console.log(token);
    if(token) this.props.getUserData(token);
    else this.props.navigation.navigate('IndexStack');
  }

  loopAnimation = () => {
    const loopDuration = 500;
    Animated.loop(
        Animated.sequence([
            Animated.parallel([
                Animated.timing(this.state.opacityImage, {
                    toValue: 1,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityD, {
                    toValue: 1,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityR, {
                    toValue: 1,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityA, {
                    toValue: 1,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityG, {
                    toValue: 1,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityO, {
                    toValue: 1,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityN, {
                    toValue: 1,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityG2, {
                    toValue: 1,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityO2, {
                    toValue: 1,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityL, {
                    toValue: 1,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityF, {
                    toValue: 1,
                    duration: loopDuration,
                }),
            ]),
            Animated.parallel([
                Animated.timing(this.state.opacityImage, {
                    toValue: 0,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityD, {
                    toValue: 0,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityR, {
                    toValue: 0,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityA, {
                    toValue: 0,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityG, {
                    toValue: 0,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityO, {
                    toValue: 0,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityN, {
                    toValue: 0,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityG2, {
                    toValue: 0,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityO2, {
                    toValue: 0,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityL, {
                    toValue: 0,
                    duration: loopDuration,
                }),
                Animated.timing(this.state.opacityF, {
                    toValue: 0,
                    duration: loopDuration,
                }),
            ])
        ])
    ).start();
}
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    changeLanguage: (value) => {
        dispatch(actionLanguage(value));
    },
    getUserData: (value) => {
        dispatch(actionGetUserData(value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
