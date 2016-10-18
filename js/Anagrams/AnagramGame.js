
/**
 * @providesModule
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    TouchableNativeFeedback,
    StyleSheet,
    Text,
    TextInput,
    View,
    BackAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AnagramGuessBox from './AnagramGuessBox';
import AnagramDisplay from './AnagramDisplay';
import clone from 'clone';

/**
 * Represents the game home screen
 */
export class AnagramGame extends Component {

    constructor(props) {
        super(props);

        // An event handler for the back button clicked - used by the component mounting and unmounting callbacks
        this.onBackClickedEH = this.onBackClicked.bind(this);

        this.difficulty = this.props.route.difficulty;

        let anagrams;

        if (this.difficulty == "hard") {
            anagrams = [
                { "question": "resells", "answer": "sellers", "guess": ""},
                { "question": "mutilate", "answer": "ultimate", "guess": ""},
                { "question": "thickens", "answer": "kitchens", "guess": ""},
                { "question": "wreathes", "answer": "weathers", "guess": ""},
                { "question": "nameless", "answer": "salesmen", "guess": ""}
            ];
        }
        else {
            anagrams = [
                { "question": "map", "answer": "amp", "guess": ""},
                { "question": "ant", "answer": "tan", "guess": ""},
                { "question": "how", "answer": "who", "guess": ""},
                { "question": "clam", "answer": "calm", "guess": ""},
                { "question": "dial", "answer": "laid", "guess": ""},
            ];
        }
        this.state = {
            anagrams: anagrams,
            questionNumber: 0,
            guess: "",
            timeRemaining: 500,
            questionsRemaining: anagrams.length
        };
    }

    /**
     * Called when the component has completed mounting - Listens for back button presses to exit the app
     */
    componentDidMount() {
        BackAndroid.addEventListener("hardwareBackPress", this.onBackClickedEH);
        this.timeInterval = setInterval(() => {
            this.setState({timeRemaining: this.state.timeRemaining - 1})
        }, 1000);
    }

    /**
     * Called before the component unmounts - Stops listening for back button presses
     */
    componentWillUnmount() {
        BackAndroid.removeEventListener("hardwareBackPress", this.onBackClickedEH);
        clearInterval(this.timeInterval);
    }

    /**
     * Deals with the upper left back button
     * @returns {boolean}
     */
    onBackClicked() {
        this.props.onBack();
        return true;
    }

    /**
     * Called when the next button has been pressed
     */
    onNextClicked() {
        let guess = this.state.guess;
        let anagrams = clone(this.state.anagrams);
        anagrams[this.state.questionNumber].guess = guess;
        let index = this.state.questionNumber;
        if (this.state.questionsRemaining > 0) {
            let question = (this.state.questionNumber + 1) % anagrams.length;
            for (let i = question; i < anagrams.length; i += 1) {
                if (anagrams[i % anagrams.length].guess === "") {
                    index = i % anagrams.length;
                    break;
                }
            }
        }
        let remaining = this.state.questionsRemaining - 1;
        this.setState({
            anagrams: anagrams,
            questionNumber: index,
            questionsRemaining: remaining,
            guess: ""
        });
    }

    onSkipClicked() {
        let index = this.state.questionNumber;
        if (this.state.questionsRemaining > 0) {
            let question = (this.state.questionNumber + 1) % this.state.anagrams.length;
            for (let i = question; i < this.state.anagrams.length; i += 1) {
                if (this.state.anagrams[i % this.state.anagrams.length].guess === "") {
                    index = i % this.state.anagrams.length;
                    break;
                }
            }
        }
        this.setState({
            questionNumber: index,
            guess: ""
        })
    }

    onResultsClicked() {
        this.props.navigator.push({
            id: "results",
            gameData: this.state.anagrams
        });
        //this.props.onResults();
    }

    timeToString() {
        if (this.state.timeRemaining < 0)
            return 0;
        let t = this.state.timeRemaining;
        let mins = Math.floor(t/60);
        if (mins > 0) {
            t -= mins*60;
            let secs = t;
            if (secs < 10){
                secs = "0" + secs;
            }
            return mins + ":" + secs;
        }
        else {
            return t;
        }
    }

    getPageTitle() {
        let diff = this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);
        return diff + " mode challenge";
    }

    /**
     * Render the component
     */
    render() {

        if (this.state.questionsRemaining === 0 || this.state.timeRemaining <= 0) {
            return (
                <View style={styles.container2}>
                    <View>
                        {this.state.questionsRemaining === 0 ?
                            <Text style={styles.youredone}>You're done!</Text>
                            :
                            <Text style={styles.youredone}>Time's up!</Text>
                        }
                    </View>

                    <TouchableNativeFeedback onPress={this.onResultsClicked.bind(this)}>
                        <View style={styles.wideButton}>
                            <Text style={styles.wideButtonText}>Go To Results</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            );
        }

        let currentAnagram = this.state.anagrams[this.state.questionNumber].question;

        let timerStyle = {
            textAlign: "center",
            fontSize: 40,
            marginTop: 10,
            color: "green"
        };

        if (this.state.timeRemaining < 60) {
            timerStyle.color = "red"
        } else if (this.state.timeRemaining < 120) {
            timerStyle.color = "#cc0";
        }

        return (
            <View style={styles.container}>
                <Icon.ToolbarAndroid
                    style={styles.toolbar}
                    title={this.getPageTitle()}
                    navIconName="arrow-left"
                    onIconClicked={this.onBackClicked.bind(this)}
                />
                <Text style={timerStyle}>{this.timeToString()}</Text>
                <Text>{this.state.questionsRemaining} remaining</Text>
                <AnagramDisplay anagram={currentAnagram} />

                <Text style={styles.guessText}>Your Guess:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 2, margin: 10}}
                    onChangeText={(guess) => this.setState({guess})}
                    value={this.state.guess}
                />

                <TouchableNativeFeedback onPress={this.onNextClicked.bind(this)}>
                    <View style={styles.wideButton}>
                        <Text style={styles.wideButtonText}>Next</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={this.onSkipClicked.bind(this)}>
                    <View style={styles.wideButton}>
                        <Text style={styles.wideButtonText}>Skip</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

AnagramGame.propTypes = {
    onBack: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    container2: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
        paddingTop: 20
    },
    toolbar: {
        height: 56,
        backgroundColor: '#e9eaed'
    },
    wideButton: {
        backgroundColor: '#1FB6FF',
        margin: 10,
        marginTop: 0,
        marginBottom: 30,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wideButtonText: {
        fontSize: 20
    },
    guessText: {
        marginLeft: 10
    },
    youredone: {
        fontSize: 40,
        textAlign: "center"
    }
});

export { AnagramDisplay, AnagramGuessBox };
export default AnagramGame;