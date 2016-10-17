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
 * Displays the history screen in the calculator app
 */
export class Challenge extends Component {

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
    onBackClicked() {
        this.props.onBack();
        return true;
    }

    onEasyClicked() {
        this.onGameStartClicked("easy");
        //this.props.onEasy();
    }

    onHardClicked() {
        this.onGameStartClicked("hard");
        //this.props.onHard();
    }

    onGameStartClicked(difficulty) {
        this.props.navigator.push({
            id: "game",
            difficulty: difficulty
        })
        ;
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon.ToolbarAndroid
                    style={styles.toolbar}
                    title="Challenge Selection"
                    navIconName="arrow-left"
                    onIconClicked={this.onBackClicked.bind(this)}
                />
                <Text style={styles.centerText}>Select a challenge</Text>
                <TouchableNativeFeedback onPress={this.onEasyClicked.bind(this)}>
                    <View style={styles.wideButton}>
                        <Text style={styles.wideButtonText}>Easy</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={this.onHardClicked.bind(this)}>
                    <View style={styles.wideButton}>
                        <Text style={styles.wideButtonText}>Hard</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

Challenge.propTypes = {
    onBack: React.PropTypes.func.isRequired,
    onEasy: React.PropTypes.func,
    onHard: React.PropTypes.func
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
    centerText: {
        textAlign: "center",
        margin: 20,
        fontSize: 30
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
        marginBottom: 30,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wideButtonText: {
        fontSize: 20
    }
});

export default Challenge;