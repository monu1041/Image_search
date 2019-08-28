import React, { Component } from 'react'
import { View } from 'react-native'
import RootNavigator from "./components/Navigation";


export default class App extends Component {


  render() {
    return (
      <View style={{ flex: 1 }}>
        <RootNavigator />
      </View>
    )
  }
}

