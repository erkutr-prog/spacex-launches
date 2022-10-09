import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import DatePicker from 'react-native-date-picker'

function CustomDatePicker(props) {
  const [open, setOpen] = useState(false);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  function onConfirm(date) {
    setOpen(false);
    //setDate(date);
    if (props.callback !== undefined) {
      props.callback(date);
    }
  }


  return (
    <>
    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray', borderRadius: 5}} onPress={() => setOpen(true)}>
      <Text style={{alignSelf: 'center', margin: 10}}>
        { props.date.getDate() + ' ' + months[props.date.getMonth()]  +  ' ' + props.date.getFullYear()}
      </Text>
    </TouchableOpacity>
    <DatePicker modal mode='date' date={props.date} open={open} onConfirm={(date) => onConfirm(date)} onCancel={() => setOpen(false)}/>
    </>
  )
}

export default CustomDatePicker;