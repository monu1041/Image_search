import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return <View style={styles.viewContainer}>
      <Text>
        {this.props.name}/photos
    </Text>
    </View>;
  }
}

var styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    elevation: 4,
  }
});