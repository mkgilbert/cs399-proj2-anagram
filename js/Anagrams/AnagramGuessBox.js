
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

/**
 * Renders the display screen in the calculator
 */
export class AnagramGuessBox extends Component {

    constructor(props) {
        super(props);
        this.state = {text: "Your Guess"};
    }

    /**
     * Render the component
     */
    render() {
        return (
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 2}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#8AEBEB',
        margin: 10,
        height: 100
    },
    text: {
        marginRight: 20,
        fontSize: 30
    },
    preview: {
        marginRight: 20,
        fontSize: 20
    }
});

export default AnagramGuessBox;