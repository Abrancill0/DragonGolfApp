import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';
import store from '../../../store/store';
import { Dictionary } from '../../../utils/Dictionary';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../utils/Colors';
import { actionGetBible } from '../../../store/actions';
import HistoryComponent from './HistoryComponent';

class HistoryScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            landscape: Dimensions.get('window').width > Dimensions.get('window').height,
            topToBottomDate: true,
            topToBottomPlayer: null,
            topToBottomCourse: null
        };

        props.getBible();

        this.playerId = props.navigation.getParam('playerId');
        if (this.playerId) {
            const idx = props.history.findIndex(item => item.player_id === this.playerId);
            if (idx >= 0) props.navigation.setParams({ Title: props.history[idx].nick_name });
        }

        this.total = 0;
    }

    static navigationOptions = ({ navigation }) => {
        const state = store.getState();
        const language = state.reducerLanguage;
        const money = navigation.getParam('total', null);
        const title = navigation.getParam('Title', Dictionary.history[language]);
        return {
            title: title,
            headerRight: (
                <View style={{ paddingHorizontal: 10 }}>
                    {money && <Text
                        style={[styles.rowText,
                        {
                            fontSize: 14,
                            color: money < 0 ? 'red' : money > 0 ? 'green' : Colors.Black
                        }
                        ]}
                    >
                        ${money}
                    </Text>}
                </View>
            )
        }
    };

    componentDidMount() {
        Dimensions.addEventListener('change', ({ window: { height, width } }) => {
            this.setState({ landscape: width > height });
        });
    }

    render() {

        const {
            landscape,
            topToBottomDate,
            topToBottomPlayer,
            topToBottomCourse
        } = this.state;

        const {
            language,
            history,
            navigation
        } = this.props;

        const {
            date,
            course,
            playedHcp,
            result,
            nextHcp,
            debt,
            notes,
            player
        } = Dictionary;

        return (
            <View style={{ flex: 1 }}>
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
                    {landscape && <>
                        <View style={styles.headers}>
                            <Text style={styles.headerText}>{debt[language]}</Text>
                        </View>
                        <View style={styles.headers}>
                            <Text style={styles.headerText}>{notes[language]}</Text>
                        </View>
                    </>}
                </View>
                <FlatList
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
                />
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

const mapStateToProps = (state) => ({
    language: state.reducerLanguage,
    history: state.reducerBible
})

const mapDispatchToProps = dispatch => ({
    getBible: () => {
        dispatch(actionGetBible());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen)
