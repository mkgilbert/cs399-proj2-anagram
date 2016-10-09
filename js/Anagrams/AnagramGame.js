
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
    }

    /**
     * Called when the component has completed mounting - Listens for back button presses to exit the app
     */
    componentDidMount() {
        BackAndroid.addEventListener("hardwareBackPress", this.onBackClickedEH);
    }

    /**
     * Called before the component unmounts - Stops listening for back button presses
     */
    componentWillUnmount() {
        BackAndroid.removeEventListener("hardwareBackPress", this.onBackClickedEH);
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
        this.props.onNext();
    }

    getPageTitle() {
        let diff = this.props.difficulty.charAt(0).toUpperCase() + this.props.difficulty.slice(1);
        return diff + " mode challenge";
    }

    /**
     * Render the component
     */
    render() {

        // Render the home page
        return (
            <View style={styles.container}>
                <Icon.ToolbarAndroid
                    style={styles.toolbar}
                    title={this.getPageTitle()}
                    navIconName="arrow-left"
                    onIconClicked={this.onBackClicked.bind(this)}
                />

                <Text>Anagram will go here</Text>

                <TouchableNativeFeedback onPress={this.onNextClicked.bind(this)}>
                    <View style={styles.wideButton}>
                        <Text style={styles.wideButtonText}>Next</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

AnagramGame.propTypes = {
    onNext: React.PropTypes.func.isRequired,
    onBack: React.PropTypes.func.isRequired,
    difficulty: React.PropTypes.string.isRequired
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