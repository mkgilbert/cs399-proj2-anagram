/**
 * @providesModule
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    TouchableNativeFeedback,
    StyleSheet,
    Text,
    View,
    ScrollView,
    BackAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Displays the about screen in the calculator app
 */
export class Results extends Component {

    constructor(props) {
        super(props);
        // An event handler for the back button clicked - used by the component mounting and unmounting callbacks
        this.onBackClickedEH = this.onBackClicked.bind(this);
    }

    /**
     * Called when the component has completed mounting - Start listening for back button presses (to exit the screen)
     */
    componentDidMount() {
        BackAndroid.addEventListener("hardwareBackPress", this.onBackClickedEH);
    }

    /**
     * Called before the component unmounts - Stop listening for back button presses (to exit the screen)
     */
    componentWillUnmount() {
        BackAndroid.removeEventListener("hardwareBackPress", this.onBackClickedEH);
    }

    /**
     * Called when the back button has been pressed: either hardware back or the back button on the toolbar
     * @returns {boolean}
     */
    onHomeClicked() {
        this.props.navigator.popToTop();
        return true;
    }

    onBackClicked() {
        this.onHomeClicked();
    }

    /**
     * Called when user wants to start another game with a different challenge
     * @returns {boolean}
     */
    onPlayAgainClicked() {
        this.props.navigator.popN(2);
        return true;
    }

    /**
     * Render the component
     */
    render() {
        let gameData = this.props.route.gameData;
        let colStyle = {
            flex: 1,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16
        };
        let score = 0;
        for (let i = 0; i < gameData.length; i++) {
            if (gameData[i].guess!== undefined && gameData[i].guess.toLowerCase() === gameData[i].answer.toLowerCase())
                score++;
        }
        let totalQuestions = gameData.length;
        return (
            <View style={styles.container}>
                <Icon.ToolbarAndroid
                    style={styles.toolbar}
                    title="Results"
                />
                <View style={styles.content}>
                    <View>
                        <View style={styles.row}>
                            <Text style={colStyle}>Anagram</Text>
                            <Text style={colStyle}>Answer</Text>
                            <Text style={colStyle}>Your Guess</Text>
                        </View>
                        {gameData.map(function(anagram, i) {
                            colStyle = {
                                flex: 1,
                                textAlign: "center",
                                fontSize: 14,
                                color: "red"
                            };
                            if (anagram.guess!== undefined && anagram.guess.toLowerCase() === anagram.answer.toLowerCase())
                                colStyle.color = "green";
                            return (
                                <View key={i} style={styles.row}>
                                    <Text style={colStyle}>{anagram.question}</Text>
                                    <Text style={colStyle}>{anagram.answer}</Text>
                                    <Text style={colStyle}>{anagram.guess}</Text>
                                </View>
                            );
                        })}
                    </View>
                    <Text style={styles.score}>
                        {score} / {totalQuestions}
                    </Text>
                    <View style={styles.buttons}>
                        <TouchableNativeFeedback onPress={this.onHomeClicked.bind(this)}>
                            <View style={styles.wideButton}>
                                <Text style={styles.wideButtonText}>Back to Home</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.onPlayAgainClicked.bind(this)}>
                            <View style={styles.wideButton}>
                                <Text style={styles.wideButtonText}>Play Again</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    toolbar: {
        height: 56,
        backgroundColor: '#e9eaed'
    },
    content: {
        flex: 1,
        justifyContent: "space-between"
    },
    row: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#cccccc',
        flexDirection: "row"
    },
    wideButton: {
        backgroundColor: '#1FB6FF',
        margin: 10,
        marginTop: 0,
        marginBottom: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wideButtonText: {
        fontSize: 20
    },
    buttons: {
        marginBottom: 0
    },
    score: {
        fontSize: 50,
        textAlign: "center"
    }
});

export default Results;
