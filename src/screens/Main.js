import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useCallback, useState, useRef} from 'react';
import FetchData from '../utils/FetchData';
import CustomDatePicker from '../components/CustomDatePicker';
import LaunchCard from '../components/LaunchCard';
import {Navigation} from 'react-native-navigation';
import colors from '../assets/colors';

export default function Main(props) {
  const [launchData, setLaunchData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isSearched, setSearched] = useState(false);
  const offset = useRef(0);

  useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        title: {
          text: 'LaunchWiki',
        },
      },
    });
  });

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  const fetchLaunches = useCallback(async () => {
    const options = {
      query: {
        date_utc: {
          $gte: startDate.toISOString(),
          $lte: endDate.toISOString(),
        },
      },
      options: {
        limit: 10,
        offset: offset.current,
      },
    };
    const data = await FetchData(options, 'Launch');
    setLaunchData(data);
  });

  function search() {
    setSearched(true);
    offset.current = 0;
    fetchLaunches();
  }

  function navigateToLaunchDetails(item) {
    Navigation.push(props.componentId, {
      component: {
        name: 'DetailScreen',
        passProps: {
          item,
        },
      },
    });
  }

  function getSearchParams() {
    return (
      <>
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Start Date:</Text>
          <CustomDatePicker
            callback={date => setStartDate(date)}
            date={startDate}
          />
        </View>
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>End Date:</Text>
          <CustomDatePicker
            callback={date => setEndDate(date)}
            date={endDate}
          />
        </View>
        <TouchableOpacity onPress={() => search()} style={styles.searchButton}>
          <Text style={styles.searchText}>SEARCH</Text>
        </TouchableOpacity>
      </>
    );
  }

  const paginationHandler = paginationType => {
    offset.current =
      paginationType == 'next'
        ? offset.current + launchData.limit
        : offset.current - launchData.limit;
    fetchLaunches();
  };

  const LaunchListFooter = () => {
    function getNextPageButton() {
      return (
        <View style={{flex: 1 / 3}}>
          {launchData.hasNextPage ? (
            <TouchableOpacity
              onPress={() => paginationHandler('next')}
              style={styles.nextPageButton}>
              <Text style={styles.buttonText}>Next Page</Text>
            </TouchableOpacity>
          ) : (
            <Text style={{margin: 10}}>Next Page</Text>
          )}
        </View>
      );
    }

    function getPrevPageButton() {
      return (
        <View style={{flex: 1 / 3}}>
          {launchData.hasPrevPage ? (
            <TouchableOpacity
              onPress={() => paginationHandler('prev')}
              style={styles.prevPageButton}>
              <Text style={styles.buttonText}>Previous Page</Text>
            </TouchableOpacity>
          ) : (
            <Text style={{margin: 10}}>Previous Page</Text>
          )}
        </View>
      );
    }

    return (
      <View style={styles.footerContainer}>
        {getPrevPageButton()}
        <View style={{alignSelf: 'center', flex: 1 / 3}}>
          <Text style={{textAlign: 'center'}}>
            {launchData.page.toString() +
              '/' +
              launchData.totalPages.toString()}
          </Text>
        </View>
        {getNextPageButton()}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!isSearched ? (
        <View style={styles.imageContainer}>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={require('./../assets/img/logo.png')}
              style={{
                width: Dimensions.get('screen').width - 30,
                height: Dimensions.get('screen').height * 0.3,
                alignSelf: 'center',
              }}
            />
          </View>
          <View style={{alignSelf: 'center', marginBottom: 10}}>
            <Text style={{fontWeight: 'bold'}}>Select Filters:</Text>
          </View>
          <View style={{alignSelf: 'center'}}>{getSearchParams()}</View>
        </View>
      ) : (
        <FlatList
          data={launchData['docs']}
          style={{padding: 10}}
          ListHeaderComponent={getSearchParams}
          ListFooterComponent={() => LaunchListFooter()}
          renderItem={item => (
            <LaunchCard
              onPressCallback={navigateToLaunchDetails}
              item={item.item}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'beige',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 20,
    borderRadius: 15,
    width: Dimensions.get('screen').width * 0.75,
  },
  footerContainer: {
    flex: 1,
    margin: 10,
    width: Dimensions.get('screen').width * 0.9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  searchButton: {
    activeOpacity: 10,
    backgroundColor: 'black',
    height: 40,
    width: Dimensions.get('screen').width * 0.6,
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 15,
  },
  imageContainer: {
    flexDirection: 'column',
    paddingTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextPageButton: {
    marginLeft: 'auto',
    backgroundColor: colors.CARD_BACKGROUND,
    borderRadius: 5,
  },
  prevPageButton: {
    backgroundColor: colors.CARD_BACKGROUND,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.WHITE,
    margin: 10,
  },
  filterLabel: {
    margin: 10,
    alignSelf: 'center',
  },
  searchText: {
    color: 'white',
    alignSelf: 'center',
  },
});
