import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    Animated
} from 'react-native'
import styles from './styles';
import Ripple from 'react-native-material-ripple';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../utils/Colors';
import * as NavigationService from '../../../routes/NavigationService';

const BlankProfile = require('../../../../assets/globals/blank-profile.png');

export default class PlayerComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            height: 70,
        }
    }

    componentDidMount(){
        this.props.height.addListener(({value}) => this.setState({height: value}));
    }

    render() {

        const {
            item,
            height,
            opacity
        } = this.props;

        return (
            <Animated.View style={{height, opacity}}>
                {this.state.height > 0 && <Ripple
                    style={styles.playerView}
                    rippleColor={Colors.Primary}
                    onPress={() => NavigationService.navigate('PlayerInfoView', { item: item })}
                >
                    <View style={styles.imageView}>
                        <Image
                            source={item.photo ? {uri: item.photo} : BlankProfile}
                            style={{
                                width: 45,
                                height: '65%',
                                borderRadius: 50
                            }}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={styles.nameView}>
                            <Text style={styles.nameText}>{item.name} </Text>
                            <Text style={styles.lastnameText}> {item.last_name}</Text>
                        </View>
                        <View style={styles.infoView}>
                            <Text style={styles.shortName}>{item.nick_name}</Text>
                            <View style={styles.handicapView}>
                                <Text style={styles.handicapText}>Handicap Index:</Text>
                                <View style={{ width: 10 }} />
                                <Text style={styles.handicapNumber}>{item.handicap}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.arrowView}>
                        <Ionicon name="chevron-forward-sharp" size={25} color={Colors.Black} />
                    </View>
                </Ripple>}
            </Animated.View>
        )
    }
}
