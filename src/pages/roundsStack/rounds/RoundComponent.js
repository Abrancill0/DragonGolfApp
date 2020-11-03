import React, { Component } from 'react'
import {
    View,
    Text,
    Animated,
} from 'react-native'
import styles from './styles';
import Ripple from 'react-native-material-ripple';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../utils/Colors';
import moment from 'moment';
import * as NavigationService from '../../../routes/NavigationService';
import { Dictionary } from '../../../utils/Dictionary';

export default class RoundComponent extends Component {
    render() {

        const {
            item,
            height,
            setRound,
            courses,
            setCourse,
            opacity,
            setLoadingRound
        } = this.props;

        const online = !!item.online_key;

        return (
            <Animated.View style={{ height, opacity }}>
                <Ripple
                    style={styles.roundView}
                    rippleColor={Colors.Primary}
                    onPress={() => {
                        setRound(item);
                        const index = courses.findIndex(course => course.id === item.course_id);
                        setCourse(courses[index]);
                        const loadingRoundData = {
                            snBet: true,
                            tnBet: true,
                            roundPlayers: true,
                            tees: true,
                            hole: true,
                            medalBet: true
                        };
                        setLoadingRound(loadingRoundData);
                        NavigationService.navigate('RoundTab');
                    }}
                >
                    <View style={styles.dateView}>
                        <Text style={styles.yearText}>{moment(item.date).format('YYYY')}</Text>
                        <Text style={styles.monthText}>{this.formatDate(item.date)}</Text>
                        <Text
                            style={styles.dayText}
                            adjustsFontSizeToFit
                            numberOfLines={1}
                        >{this.formatDay(item.date)}</Text>
                    </View>
                    <View style={styles.dataView}>
                        <View style={styles.titlesView}>
                            <Text style={styles.roundName}>{item.name}</Text>
                            <Text style={styles.courseName}>{item.course_name}</Text>
                        </View>
                        {online &&
                            <View style={styles.onlineView}>
                                <Text style={styles.onlineText}>Online</Text>
                            </View>
                        }
                    </View>
                    <View style={styles.arrowView}>
                        <Ionicon name="chevron-forward-sharp" size={25} color={Colors.Black} />
                    </View>
                </Ripple>
            </Animated.View>
        )
    }

    formatDate = (date) => {
        const { language } = this.props;
        const numMonth = moment(date).format('M');
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
                month = moment(date).format('MMM');
                break;
        }
        const day = moment(date).format('DD');

        return `${month} ${day}`;
    }

    formatDay = (date) => {
        const numDay = moment(date).day();
        let day = '';
        const { language } = this.props;

        switch (numDay) {
            case 0:
                day = Dictionary.sunday[language];
                break;
            case 1:
                day = Dictionary.monday[language];
                break;
            case 2:
                day = Dictionary.tuesday[language];
                break;
            case 3:
                day = Dictionary.wednesday[language];
                break;
            case 4:
                day = Dictionary.thursday[language];
                break;
            case 5:
                day = Dictionary.friday[language];
                break;
            case 6:
                day = Dictionary.saturday[language];
                break;
        }

        return day;
    }
}
