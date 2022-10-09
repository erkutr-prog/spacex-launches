import {View, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import React, {useEffect, useCallback, useState} from 'react';
import FetchData from '../utils/FetchData';
import CustomDatePicker from '../components/CustomDatePicker';
import LaunchCard from '../components/LaunchCard';

export default function Main() {
  const [launchData, setLaunchData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isSearched, setSearched] = useState(false);

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  const fetchLaunches = useCallback(async () => {

    const options = {
        query: {
            date_utc: {
                $gte: startDate.toISOString(),
                $lte: endDate.toISOString()
            }
        },
        options: {
          limit: 10,
        },
    }
    console.log('************options', options);
    const data = await FetchData(options);
    console.log('************response', data);
    setLaunchData(data.docs);

    /* const response = await fetch('https://api.spacexdata.com/v5/launches/query', options)
            .then(response => response.json())
            .then(response => setLaunchData(response.docs))
 */
  });

  function search() {
      setSearched(true);
      fetchLaunches()
  }


  function getSearchParams() {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingBottom: 30,
          }}>
          <Text style={{margin: 10}}>START DATE:</Text>
          <CustomDatePicker callback={date => setStartDate(date)} date={startDate} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingBottom: 30,
          }}>
          <Text style={{margin: 10}}>END DATE:</Text>
          <CustomDatePicker callback={date => setEndDate(date)} date={endDate} />
        </View>
        <TouchableOpacity
          onPress={() => search()}
          style={{
            activeOpacity: 10,
            backgroundColor: 'red',
            height: 40,
            width: Dimensions.get('screen').width * 0.6,
            alignSelf: 'center',
            borderRadius: 20,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', alignSelf: 'center'}}>SEARCH</Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <View style={{flex: 1, justifyContent: !isSearched ? 'center' : null }}>
        {
            !isSearched 
            ?
            getSearchParams()
            :
            <View style={{flexDirection: 'column'}}>
                <FlatList
                    data={launchData}
                    ListHeaderComponent={getSearchParams}
                    renderItem={(item) => <LaunchCard item={item.item}/>}
                    keyExtractor={(item) => item.id}/>
            </View>
        }
    </View>
  );
}
