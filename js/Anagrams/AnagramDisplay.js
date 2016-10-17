
import React, { Component } from 'react';
import {
    AppRegistry,
    TouchableNativeFeedback,
    StyleSheet,
    Text,
    View
} from 'react-native';

/**
 * Responsible for rendering the button grid on the calculator
 */
export class AnagramDisplay extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * Render the component
     */
    render () {
        console.log("AnagramDisplay text: " + this.props.anagram);
        return (
            <View style={styles.container}>
                <Text style={styles.buttonText}>
                    {this.props.anagram}
                </Text>
            </View>
        );
    }
}

AnagramDisplay.propTypes = {
    anagram: React.PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10
    },
    row: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 30
    }
});

export default AnagramDisplay;