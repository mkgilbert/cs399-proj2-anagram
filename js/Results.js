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

        // store game data that was passed into the route from the navigator.push() method
        this.gameData = this.props.route.gameData;
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
        return (
            <View style={styles.container}>
                <Icon.ToolbarAndroid
                    style={styles.toolbar}
                    title="Results"
                />
                <Text>Results Page</Text>
                <Text>Total anagrams: {this.gameData}</Text>
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
        );
    }
}

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
    row: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#666666'
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

export default Results;
