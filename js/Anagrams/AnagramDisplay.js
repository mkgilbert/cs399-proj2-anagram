
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

// TODO: remove this old code from calculator app
    /**
     * Called when a button is pressed
     * @param buttonName - The button that was pressed
     * @param event - The event that was passed by react native
     */
    onButtonClick(buttonName, event) {
        this.props.onClick(buttonName);
    }

    /**
     * Render the component
     */
    render() {

        // Compute the rows - this is because of the way flex grids need to render.
        // We want 4 items per row, so we add 4 items to each row.
        let rows = [];
        let count = 0;
        let row = [];
        for (let i = 0; i < this.props.buttons.length; i++) {
            let button = this.props.buttons[i];
            row.push(button);
            count++;
            if (count == 4) {
                rows.push(row);
                row = [];
                count = 0;
            }
        }

        // Return the actual components, iterate over each row,
        // then iterate over each item in the row.
        return (
            <View style={styles.container}>
                {rows.map(function(row, i) {
                    return (
                        <View key={i} style={styles.row}>
                            {row.map(function(button) {
                                // Compute the style for the button
                                let buttonStyle = {
                                    flex: 1,
                                    backgroundColor: '#bbbbbb',
                                    margin: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                };
                                if (button == '=') {
                                    buttonStyle.backgroundColor = '#3D75DB';
                                }
                                // Render the button
                                return (
                                    <TouchableNativeFeedback key={button} onPress={this.onButtonClick.bind(this, button)}>
                                        <View style={buttonStyle}>
                                            <Text style={styles.buttonText}>{button}</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                );
                            }.bind(this))}
                        </View>
                    );
                }.bind(this))}
            </View>
        );
    }
}
AnagramDisplay.propTypes = {
    buttons: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onClick: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: 5,
        marginTop: 0,
        flexDirection: 'column'
    },
    row: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 20,
    }
});

export default AnagramDisplay;