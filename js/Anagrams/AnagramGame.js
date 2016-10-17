
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


/**
 * Represents the game home screen
 */
export class AnagramGame extends Component {

    constructor(props) {
        super(props);

        // An event handler for the back button clicked - used by the component mounting and unmounting callbacks
        this.onBackClickedEH = this.onBackClicked.bind(this);

        this.difficulty = this.props.route.difficulty;

        if (this.difficulty == "hard") {
            var theAnagrams = {
                "resells": "sellers",
                "mutilate": "ultimate",
                "thickens": "kitchens",
                "wreathes": "weathers",
                "nameless": "salesman"
            };
        }
        else {
            var theAnagrams = {
                "map": "amp",
                "ant": "tan",
                "how": "who",
                "clam": "calm",
                "dial": "laid"
            };
        }
        this.state = {
            anagrams: theAnagrams,
            currentAnswer: "",
            currentAnagram: "",
            guess: "",
            timeRemaining: 300
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
    onNextClicked(currentAnagram) {
        let guess = this.state.guess;
        if (guess == this.state.currentAnswer) {
            console.log("guess " + guess + " is correct");
        }
        else {
            console.log("guess " + guess + " is incorrect");
        }
        // copy the state and remove the previously used anagram. then put the new hash back into the state
        var anagramsCopy = Object.assign({}, this.state.anagrams);
        delete anagramsCopy[currentAnagram];
        this.setState({
            anagrams: anagramsCopy,
            guess: ""
        });
    }

    onResultsClicked() {
        this.props.navigator.push({
            id: "results",
            gameData: "testing"
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

    getLength(hash) {
        return Object.keys(hash).length;
    }
    /**
     * Render the component
     */
    render() {
        var currentAnagram, currentAnswer = null;
        if (this.getLength(this.state.anagrams) == 0) {
            console.log("all anagrams used");
        }
        else {
            currentAnagram = Object.keys(this.state.anagrams)[0];
            currentAnswer = this.state.anagrams[currentAnagram];
        }

        if (currentAnagram === null || currentAnswer === null) {
            return (
                <View style={styles.container}>
                    <Text>Done! Get Results</Text>

                    <TouchableNativeFeedback onPress={this.onResultsClicked.bind(this)}>
                        <View style={styles.wideButton}>
                            <Text style={styles.wideButtonText}>Go To Results</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Icon.ToolbarAndroid
                        style={styles.toolbar}
                        title={this.getPageTitle()}
                        navIconName="arrow-left"
                        onIconClicked={this.onBackClicked.bind(this)}
                    />
                    <Text>{this.timeToString()}</Text>
                    <AnagramDisplay
                        anagram={currentAnagram}
                        answer={currentAnswer}
                    />

                    <Text>Your Guess:</Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 2, margin: 10}}
                        onChangeText={(guess) => this.setState({guess})}
                        value={this.state.guess}
                    />

                    <TouchableNativeFeedback onPress={this.onNextClicked.bind(this, currentAnagram)}>
                        <View style={styles.wideButton}>
                            <Text style={styles.wideButtonText}>Next</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            );
        }
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
    toolbar: {
        height: 56,
        backgroundColor: '#e9eaed'
    },
    wideButton: {
        backgroundColor: '#1FB6FF',
        margin: 10,
        marginTop: 0,
        marginBottom: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wideButtonText: {
        fontSize: 20
    }
});

export { AnagramDisplay, AnagramGuessBox };
export default AnagramGame;