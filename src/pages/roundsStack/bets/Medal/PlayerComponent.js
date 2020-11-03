import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import styles from '../styles'
import Ripple from 'react-native-material-ripple'
import Colors from '../../../../utils/Colors'
import Ionicon from 'react-native-vector-icons/Ionicons';

const BlankProfile = require('../../../../../assets/globals/blank-profile.png');

export default class PlayerComponent extends Component {
    render() {

        const {
            item,
            selected,
            selectPlayer,
            index
        } = this.props;

        return (
            <Ripple
                style={[styles.playerView, {
                    backgroundColor: selected ? Colors.White : Colors.Light
                }]}
                rippleColor={Colors.Primary}
                onPress={_ => selectPlayer(!selected, index)}
            >
                <View style={styles.imageView}>
                    <Image
                        source={item.photo ? { uri: item.photo } : BlankProfile}
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: 50
                        }}
                        resizeMode="cover"
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.nameView}>
                        <Text style={styles.shortName}>{item.nick_name} </Text>
                    </View>
                    <View style={styles.infoView}>
                        <View style={[styles.handicapView, {justifyContent: 'flex-start'}]}>
                            <Text style={styles.handicapText}>Handicap Index:</Text>
                            <View style={{ width: 10 }} />
                            <Text style={styles.handicapNumber}>{item.handicap}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.checkView}>
                    {selected ?
                        <Ionicon name='ios-checkmark' size={45} color={Colors.Secondary} />
                        :
                        <Ionicon name='ios-remove' size={35} color={Colors.Gray} />
                    }
                </View>
            </Ripple>
        )
    }
}
