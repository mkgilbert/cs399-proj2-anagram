
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
                { "question": "resells", "answer": "sellers" },
                { "question": "mutilate", "answer": "ultimate" },
                { "question": "thickens", "answer": "kitchens" },
                { "question": "wreathes", "answer": "weathers" },
                { "question": "nameless", "answer": "salesmen" }
            ];
        }
        else {
            anagrams = [
                { "question": "map", "answer": "amp" },
                { "question": "ant", "answer": "tan" },
                { "question": "how", "answer": "who" },
                { "question": "clam", "answer": "calm" },
                { "question": "dial", "answer": "laid" },
            ];
        }
        this.state = {
            anagrams: anagrams,
            questionNumber: 0,
            guess: "",
            timeRemaining: 150,
            questionsRemaining: anagrams.length,
            skipped: [1]
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
        let index = this.getNextAnagramIndex();
        let remaining = this.state.questionsRemaining;
        if (index !== -1) {
            remaining = this.state.questionsRemaining - 1;
        }
        this.setState({
            anagrams: anagrams,
            questionNumber: index,
            questionsRemaining: remaining,
            guess: ""
        });
    }

    getNextAnagramIndex() {
        if (this.state.questionNumber === this.state.anagrams.length - 1) {
            if (this.state.skipped.length === 1) {
                return this.state.skipped.pop();
            } else {
                return this.state.questionNumber;
            }
        } else {
            return this.state.questionNumber + 1;
        }
    }

    onSkipClicked() {
        let alreadySkipped = this.state.skipped.indexOf(this.state.questionNumber);
        if (alreadySkipped !== -1) {
            this.state.skipped.push(this.state.questionNumber);
        }
        let index = this.getNextAnagramIndex();
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
                    <Text>{this.state.questionNumber}</Text>
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

        let currentAnagram = null;
        if (this.state.questionNumber >= 0 && this.state.questionNumber < this.state.anagrams.length) {
            currentAnagram = this.state.anagrams[this.state.questionNumber].question;
        }

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
                <Text>{this.state.questionNumber}</Text>
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