import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import colors from '../assets/colors';

function CustomDatePicker(props) {
  const [open, setOpen] = useState(false);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  function onConfirm(date) {
    setOpen(false);
    if (props.callback !== undefined) {
      props.callback(date);
    }
  }

  return (
    <>
      <TouchableOpacity
        style={styles.datePickerContainer}
        onPress={() => setOpen(true)}>
        <Text style={styles.dateText}>
          {props.date.getDate() +
            ' ' +
            months[props.date.getMonth()] +
            ' ' +
            props.date.getFullYear()}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        date={props.date}
        open={open}
        onConfirm={date => onConfirm(date)}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  datePickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.DATE_PICKER_BACKGROUND,
    borderRadius: 5,
    marginLeft: 'auto',
    margin: 10,
  },
  dateText: {
    alignSelf: 'center',
    margin: 10,
  },
});

export default CustomDatePicker;
