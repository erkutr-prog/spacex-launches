import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Linking,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {Navigation} from 'react-native-navigation';
import FetchData from '../utils/FetchData';

function LaunchDetails(props) {
  const [launchPadName, setLaunchPadName] = useState();
  const [imageFetched, setImageFetched] = useState(false);

  useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        title: {
          text: props.item.name,
        },
      },
    });
  }, []);

  useEffect(() => {
    FetchLaunchpad();
  }, [FetchLaunchpad]);

  const FetchLaunchpad = useCallback(async () => {
    const options = {
      query: {
        id: props.item.launchpad,
      },
      options: {
        limit: 1,
      },
    };
    const response = await FetchData(options, 'Launchpad');
    setLaunchPadName(response.docs[0].name);
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          onLoad={() => setImageFetched(true)}
          source={
            props.item.links.patch.large == null
              ? require('./../assets/img/logo.png')
              : {uri: props.item.links.patch.large}
          }
          style={styles.image}
        />
        <ActivityIndicator
          size={'large'}
          style={{
            display: imageFetched ? 'none' : 'flex',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
          }}
        />
        <Text style={styles.descriptionHeader}>Description</Text>
        <Text style={{alignSelf: 'center'}}>
          {props.item.details !== undefined
            ? props.item.details
            : props.item.name}
        </Text>
      </View>

      <View style={styles.successContainer}>
        <Text style={{fontWeight: 'bold'}}>Mission Success:</Text>
        <Text
          style={{
            color: props.item.success ? 'green' : 'red',
            fontWeight: 'bold',
          }}>
          {props.item.success ? ' Successful' : ' Fail'}
        </Text>
      </View>

      <View style={styles.launchpadContainer}>
        <Text style={{fontWeight: 'bold'}}>Mission Launchpad:</Text>
        <Text>{'' + launchPadName}</Text>
      </View>

      <View style={styles.infoFieldContainer}>
        <Text style={styles.infoHeader}>More Information:</Text>
        <View style={styles.linksContainer}>
          {props.item.links.article !== null ? (
            <Text
              style={{color: 'blue', paddingBottom: 20}}
              onPress={() => Linking.openURL(props.item.links.article)}>
              Article
            </Text>
          ) : null}
          {props.item.links.reddit.launch !== null ? (
            <Text
              style={{color: 'blue'}}
              onPress={() => Linking.openURL(props.item.links.reddit.launch)}>
              Reddit
            </Text>
          ) : null}
          {props.item.links.webcast !== null ? (
            <Text
              style={{color: 'blue'}}
              onPress={() => Linking.openURL(props.item.links.webcast)}>
              Youtube
            </Text>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('screen').width - 30,
    height: Dimensions.get('screen').height * 0.25,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  descriptionHeader: {
    fontWeight: 'bold',
    padding: 10,
  },
  successContainer: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  launchpadContainer: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  infoFieldContainer: {
    flexDirection: 'column',
    paddingTop: 20,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 40,
  },
  infoHeader: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: 20,
  },
});

export default LaunchDetails;
