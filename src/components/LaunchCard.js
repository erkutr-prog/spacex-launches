import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'

function LaunchCard(props) {
    return (
    <View style={{height: 70, width: Dimensions.get('screen').width * 0.8, backgroundColor: 'beige', marginTop: 20, borderRadius: 20, alignSelf: 'center', flexDirection: 'row'}}>
      <View style={{flex: 1/3, aspectRatio: 1 * 1.4}}>
        <Image style={{resizeMode: 'contain', width: 50, height: 50, margin: 10, alignSelf: 'center'}} source={{uri: props.item.links.patch.small}}/>
      </View>
      <View style={{flex: 1 / 3}}>
        <Text>{props.item.name}</Text>
      </View>
    </View>
  )
}

export default LaunchCard