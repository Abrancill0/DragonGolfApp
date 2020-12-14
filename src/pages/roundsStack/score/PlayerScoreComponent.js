import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import styles from './styles';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

class PlayerScoreComponent extends Component {
    constructor(props) {
        super(props);

        let holeScore = '';

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
        }
        this.state = {
            buttonIndex: null,
            holeScore,
            par: 0,
            adv: 0,
            inputStyle: styles.input,
            inputBorder: {},
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.holeInfo !== this.props.holeInfo) {
            const { index, hole } = this.props;
            const { holeInfo } = nextProps;
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
        }

        if (nextProps.switchAdv !== this.props.switchAdv) {
            this.setHoleData(this.props.holeInfo, nextProps.switchAdv);
        }
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
    }

    renderPar(){
        const {
            item,
            hole
        } = this.props;

        switch(hole){
            case '1': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par1}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage1}</Text>
                    </View>
                )
            break;
            case '2': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par2}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage2}</Text>
                    </View>
                )
            break;
            case '3': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par3}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage3}</Text>
                    </View>
                )
            break;
            case '4': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par4}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage4}</Text>
                    </View>
                )
            break;
            case '5': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par5}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage5}</Text>
                    </View>
                )
            break;
            case '6': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par6}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage6}</Text>
                    </View>
                )
            break;
            case '7': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par7}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage7}</Text>
                    </View>
                )
            break;
            case '8': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par8}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage8}</Text>
                    </View>
                )
            break;
            case '9': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par9}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage9}</Text>
                    </View>
                )
            break;
            case '10': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par10}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage10}</Text>
                    </View>
                )
            break;
            case '11': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par11}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage11}</Text>
                    </View>
                )
            break;
            case '12': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par12}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage12}</Text>
                    </View>
                )
            break;
            case '13': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par13}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage13}</Text>
                    </View>
                )
            break;
            case '14': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par14}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage14}</Text>
                    </View>
                )
            break;
            case '15': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par15}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage15}</Text>
                    </View>
                )
            break;
            case '16': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par16}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage16}</Text>
                    </View>
                )
            break;
            case '17': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par17}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage17}</Text>
                    </View>
                )
            break;
            case '18': 
                return (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 5, alignItems: 'center' }}>
                        <Text>PAR: </Text>
                        <Text style={styles.dataValues}>{item.ho_par18}</Text>
                        <Text>ADV: </Text>
                        <Text style={styles.dataValues}>{item.Ho_Advantage18}</Text>
                    </View>
                )
            break;
        }
    }

    renderBotones(){
        const {
            item,
            hole
        } = this.props;

        switch(hole){
            case '1': 
                return (
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
                )
            break;
            case '2': 
                return (
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
                )
            break;
            case '3': 
                return (
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
                )
            break;
            case '4': 
                return (
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
                )
            break;
            case '5': 
                return (
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
                )
            break;
            case '6': 
                return (
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
                )
            break;
            case '7': 
                return (
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
                )
            break;
            case '8': 
                return (
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
                )
            break;
            case '9': 
                return (
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
                )
            break;
            case '10': 
                return (
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
                )
            break;
            case '11': 
                return (
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
                )
            break;
            case '12': 
                return (
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
                )
            break;
            case '13': 
                return (
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
                )
            break;
            case '14': 
                return (
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
                )
            break;
            case '15': 
                return (
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
                )
            break;
            case '16': 
                return (
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
                )
            break;
            case '17': 
                return (
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
                )
            break;
            case '18': 
                return (
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
                )
            break;
        }
    }

    render() {

        const {
            holeScore,
            par,
            adv,
            inputStyle,
            inputBorder
        } = this.state;

        const {
            item
        } = this.props;

        return (
            <View>
                {
                    this.renderPar()
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
                    {
                        this.renderBotones()
                    }
                </View>
            </View>
        );
    }

    setHoleData = (holeInfo, switchAdv) => {
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

    onChangeScore = (score) => {
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
            }*/
    }

    saveScore = async (score) => {
        let IDRound = await AsyncStorage.getItem('IDRound')
        console.warn(score)
        console.warn(this.props.item.id)
        console.warn(this.props.hole)
        console.warn(IDRound)
        const member = {
            strokes: score,
            id_sync: '',
            ultimate_sync: moment().format('YYYY-MM-DD HH:mm:ss'),
            id: this.props.item.id
        }
        //this.props.saveScore({ hole: parseInt(this.props.hole), member, roundId: this.props.roundId });
    }
}

export default PlayerScoreComponent;
