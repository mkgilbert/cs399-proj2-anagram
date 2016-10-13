/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, AppRegistry, Navigator } from 'react-native';
import Home from './js/Home';
import About from './js/About';
import Challenge from './js/Challenge';
import AnagramGame from './js/Anagrams/AnagramGame';
import Results from './js/Results';

/**
 * Represents the entire app
 */
class cs399_proj2_anagram extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * Called when a screen should be pushed on to the navigation stack
     * @param screenName - The id of the screen
     * @param navigator - The navigator
     */
    onScreenPush(screenName, navigator) {
        navigator.push({
            id: screenName
        });
    }

    /**
     * Called when a screen should be popped from the navigation stack
     * @param navigator - The navigator
     */
    onScreenPop(navigator) {
        navigator.pop();
    }

    /**
     * Render the app
     */
    render() {
        // Simply divert the rendering to renderScene()
        return (
            <Navigator
                initialRoute={{id: 'home'}}
                renderScene={this.renderScene.bind(this)}
            />
        );
    }

    /**
     * Decide which root level component to render depending on which screen is currently being accessed
     * @param route - The route to render
     * @param navigator - The navigator
     */
    renderScene(route, navigator) {
        switch (route.id) {
            // Render the calculator
            case "home":
                return (
                    <Home
                        onAbout={this.onScreenPush.bind(this, "about", navigator)}
                        onChallenge={this.onScreenPush.bind(this, "challenge", navigator)}
                    />
                );
            // Render the about screen
            case "about":
                return (
                    <About onBack={this.onScreenPop.bind(this, navigator)} />
                );
            // Render Challenge choice screen
            case "challenge":
                return (
                    <Challenge
                        route={route}
                        navigator={navigator}
                        onBack={this.onScreenPop.bind(this, navigator)}
                    />
                );

            case "game":
                return (
                    <AnagramGame
                        route={route}
                        navigator={navigator}
                        onBack={this.onScreenPop.bind(this, navigator)}
                    />
                );

            case "results":
                return (
                    <Results route={route} navigator={navigator}/>
                );
        }
    }
}

AppRegistry.registerComponent('cs399_proj1_calculator', () => cs399_proj2_anagram);
