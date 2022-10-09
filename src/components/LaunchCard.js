import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import colors from '../assets/colors';

function LaunchCard(props) {
  return (
    <TouchableOpacity
      onPress={() => props.onPressCallback(props.item)}
      style={styles.cardContainer}>
      <View style={{flex: 1 / 3, aspectRatio: 1 * 1.4}}>
        <Image
          style={styles.image}
          source={{uri: props.item.links.patch.small}}
        />
      </View>
      <View style={{flex: 1 / 3}}>
        <Text style={{fontWeight: 'bold', paddingTop: 10, color: 'white'}}>
          {props.item.name}
        </Text>
      </View>
      <View style={{flex: 1 / 3}}>
        <Text style={styles.date}>
          {props.item.date_local.substring(0, 10)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 70,
    width: Dimensions.get('screen').width * 0.9,
    backgroundColor: colors.CARD_BACKGROUND,
    marginTop: 20,
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    margin: 10,
    alignSelf: 'center',
  },
  date: {
    paddingTop: 10,
    marginLeft: 'auto',
    paddingRight: 5,
    color: 'white',
  },
});

export default LaunchCard;
