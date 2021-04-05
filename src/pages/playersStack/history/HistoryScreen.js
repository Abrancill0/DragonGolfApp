import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Dictionary } from '../../../utils/Dictionary';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../utils/Colors';
import HistoryComponent from './HistoryComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class HistoryScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            landscape: Dimensions.get('window').width > Dimensions.get('window').height,
            topToBottomDate: true,
            topToBottomPlayer: null,
            topToBottomCourse: null,
            language: 'es'
        };

        let playerId = props.route.params.playerId
        let playernickname = props.route.params.playernickname
        props.navigation.setParams({ Title: playernickname });
        /*if (this.playerId) {
            const idx = props.history.findIndex(item => item.player_id === this.playerId);
            if (idx >= 0) props.navigation.setParams({ Title: props.history[idx].nick_name });
        }*/

        this.total = 0;
    }

    componentDidMount() {
        Dimensions.addEventListener('change', ({ window: { height, width } }) => {
            this.setState({ landscape: width > height });
        });
    }

    render() {

        const {
            language,
            landscape,
            topToBottomDate,
            topToBottomPlayer,
            topToBottomCourse
        } = this.state;

        const {
            date,
            course,
            playedHcp,
            result,
            nextHcp,
            debt,
            notes,
            player,
            history
        } = Dictionary;

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex:0.2, justifyContent: 'flex-start' }}>
                    <TouchableOpacity style={{margin:20, marginTop:40}} onPress={()=> this.props.navigation.goBack()}>
                      <MaterialIcons name={'arrow-back'} size={25} color={Colors.Primary} />
                    </TouchableOpacity>
                  </View> 
                  <View style={{ flex:0.6, justifyContent: 'flex-end' }}>
                  <Text style={{ padding:20, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color:Colors.Primary,fontWeight:'bold'}}>{history[language]}</Text>
                  </View>
                  <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
                    <Text style={{ padding:20, fontSize: 16, fontFamily: 'BankGothic Lt BT',alignSelf:'center' , color: this.total < 0 ? Colors.Primary : this.total === 0 ? Colors.Black: Colors.Secondary ,fontWeight:'bold'}}>${this.total}</Text>
                  </View>
                </View>
                <View style={styles.headersView}>
                    <TouchableOpacity style={styles.headers} onPress={this.sortDate}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.headerText}>{date[language]}</Text>
                        </View>
                        <FontAwesome name={topToBottomDate === null ? 'minus' : topToBottomDate ? 'caret-down' : 'caret-up'} color={Colors.Black} size={15} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headers} onPress={this.sortCourse}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 3 }}>
                            <Text style={styles.headerText}>{course[language]}</Text>
                        </View>
                        <FontAwesome name={topToBottomCourse === null ? 'minus' : topToBottomCourse ? 'caret-down' : 'caret-up'} color={Colors.Black} size={15} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.headers} onPress={this.sortPlayer}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 3 }}>
                            <Text style={styles.headerText}>{player[language]}</Text>
                        </View>
                        <FontAwesome name={topToBottomPlayer === null ? 'minus' : topToBottomPlayer ? 'caret-down' : 'caret-up'} color={Colors.Black} size={15} />
                    </TouchableOpacity> */}
                    <View style={styles.headers}>
                        <Text style={styles.headerText}>{playedHcp[language]}</Text>
                    </View>
                    <View style={styles.headers}>
                        <Text style={styles.headerText}>{result[language]}</Text>
                    </View>
                    <View style={styles.headers}>
                        <Text style={styles.headerText}>{nextHcp[language]}</Text>
                    </View>
                    <View style={styles.headers}>
                        <Text style={styles.headerText}>$</Text>
                    </View>
                    {landscape && <View>
                        <View style={styles.headers}>
                            <Text style={styles.headerText}>{debt[language]}</Text>
                        </View>
                        <View style={styles.headers}>
                            <Text style={styles.headerText}>{notes[language]}</Text>
                        </View>
                    </View>}
                </View>
                {/*<FlatList
                    data={history}
                    style={{ flex: 1, marginTop: 2 }}
                    extraData={history}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) =>
                        <HistoryComponent
                            item={item}
                            landscape={landscape}
                            navigation={navigation}
                            playerId={this.playerId}
                            calculateTotal={this.calculateTotal}
                        />
                    }
                />*/}
            </View>
        )
    }

    sortDate = () => {
        if (!this.state.topToBottomDate) {
            this.props.history.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
            this.setState({ topToBottomDate: true, topToBottomPlayer: null, topToBottomCourse: null });
        } else {
            this.props.history.sort((a, b) => (a.date > b.date) ? 1 : (a.date < b.date) ? -1 : 0);
            this.setState({ topToBottomDate: false, topToBottomPlayer: null, topToBottomCourse: null });
        }
    }

    sortPlayer = () => {
        if (!this.state.topToBottomPlayer) {
            this.props.history.sort((a, b) => (a.nick_name > b.nick_name) ? 1 : (a.nick_name < b.nick_name) ? -1 : 0);
            this.setState({ topToBottomDate: null, topToBottomPlayer: true, topToBottomCourse: null });
        } else {
            this.props.history.sort((a, b) => (a.nick_name < b.nick_name) ? 1 : (a.nick_name > b.nick_name) ? -1 : 0);
            this.setState({ topToBottomDate: null, topToBottomPlayer: false, topToBottomCourse: null });
        }
    }

    sortCourse = () => {
        if (!this.state.topToBottomCourse) {
            this.props.history.sort((a, b) => (a.course_name > b.course_name) ? 1 : (a.course_name < b.course_name) ? -1 : 0);
            this.setState({ topToBottomDate: null, topToBottomPlayer: null, topToBottomCourse: true });
        } else {
            this.props.history.sort((a, b) => (a.course_name < b.course_name) ? 1 : (a.course_name > b.course_name) ? -1 : 0);
            this.setState({ topToBottomDate: null, topToBottomPlayer: null, topToBottomCourse: false });
        }
    }

    calculateTotal = val => {
        this.total += val;
        this.props.navigation.setParams({ total: this.total });
    }
}


export default HistoryScreen
