import React, { PropTypes, Component } from 'react';
import {
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

const LABEL_HEIGHT = 24;

export default class Madoka extends BaseInput {

  static propTypes = {
    /*
     * this is applied as active border and label color
     */
    borderColor: PropTypes.string,
    height: PropTypes.number,
  };

  static defaultProps = {
    borderColor: '#7A7593',
    animationDuration: 250,
    height: 48,
  };

  render() {
    const {
      label,
      style: containerStyle,
      height: inputHeight,
      inputStyle,
      labelStyle,
      borderColor,
    } = this.props;
    const {
      width,
      focusedAnim,
      value,
    } = this.state;

    return (
      <View style={[containerStyle, styles.container]} onLayout={this._onLayout}>
        <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
          <TextInput
            ref="input"
            {...this.props}
            style={[styles.textInput, inputStyle, {
              width,
              height: inputHeight,
            }]}
            value={value}
            onBlur={this._onBlur}
            onChange={this._onChange}
            onFocus={this._onFocus}
          />
          {/* right border */}
          <Animated.View
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: 2,
              height: focusedAnim.interpolate({
                inputRange: [0, 0.2, 1],
                outputRange: [0, inputHeight, inputHeight],
              }),
              backgroundColor: borderColor,
            }}
          />
          {/* top border */}
          <Animated.View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: 2,
              width: focusedAnim.interpolate({
                inputRange: [0, 0.2, 0.8, 1],
                outputRange: [0, 0, width, width],
              }),
              backgroundColor: borderColor,
            }}
          />
          {/* left border */}
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 2,
              height: focusedAnim.interpolate({
                inputRange: [0, 0.8, 1],
                outputRange: [0, 0, inputHeight],
              }),
              backgroundColor: borderColor,
            }}
          />
        </View>
        <TouchableWithoutFeedback onPress={this._focus}>
          <View style={styles.labelContainer}>
            <Animated.Text style={[styles.label, labelStyle, {
              transform: [{
                translateY: focusedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40 * -1, 0],
                }),
              }],
              fontSize: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 14],
              }),
            }]}>
              {label}
            </Animated.Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  inputContainer: {
    borderBottomWidth: 2,
  },
  labelContainer: {
    paddingLeft: 16,
    height: LABEL_HEIGHT,
  },
  label: {
    paddingTop: 8,
    backgroundColor: 'transparent',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#6a7989',
  },
  textInput: {
    padding: 16,
    color: 'black',
    fontSize: 18,
  },
});