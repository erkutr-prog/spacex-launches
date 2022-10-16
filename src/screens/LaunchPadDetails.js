import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Navigation} from 'react-native-navigation';
import colors from '../assets/colors';

function LaunchPadDetails(props) {
  const [isMapVisible, setMapVisible] = useState(false);
  const region = {
    latitude: props.launchPadDetails.latitude,
    longitude: props.launchPadDetails.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        title: {
          text: props.launchPadDetails.name,
        },
      },
    });
  }, []);

  const toggleMapVisible = () => {
      setMapVisible(!isMapVisible);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{justifyContent: 'space-evenly'}}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: props.launchPadDetails.images.large[0]}}
          resizeMode="contain"
          style={{flex: 1}}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.descriptionText}>Description</Text>
        <Text style={styles.detailText}>{props.launchPadDetails.details}</Text>

        <View style={styles.headerContainers}>
          <Text style={styles.headers}>Region:</Text>
          <Text style={styles.singleText}>
            {' ' + props.launchPadDetails.region}
          </Text>
        </View>
        <View style={styles.headerContainers}>
          <Text style={styles.headers}>Status:</Text>
          <Text style={styles.singleText}>
            {' ' + props.launchPadDetails.status}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={{alignSelf: 'flex-start', flexDirection: 'row', padding: 20}} onPress={toggleMapVisible}>
        {
            isMapVisible 
            ?
            <Text style={{fontSize: 15, color: colors.CARD_BACKGROUND}}>
                Hide the map 
            </Text>
            :
            <Text style={{fontSize: 15, color: colors.CARD_BACKGROUND}}>
                Show on the map
            </Text>
        }
      </TouchableOpacity>

      <View style={[styles.mapContainer, {display: isMapVisible ? 'flex' : 'none'}]}>
        <MapView
          style={{...StyleSheet.absoluteFillObject}}
          initialRegion={region}>
          <Marker coordinate={region} />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    height: 200,
    width: Dimensions.get('screen').width - 20,
    alignSelf: 'center',
    margin: 20,
  },
  textContainer: {
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    height: 200,
    width: Dimensions.get('screen').width - 20,
    alignSelf: 'center',
  },
  headerContainers: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  headers: {
    fontSize: 25,
    alignSelf: 'center',
  },
  singleText: {
    fontSize: 20,
    alignSelf: 'center',
  },
  descriptionText: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  detailText: {
    fontSize: 20,
    paddingBottom: 15,
  },
});

export default LaunchPadDetails;
