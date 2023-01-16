import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';


export default () => {

  const [date,setDate] = useState('');
  const [dateTwo,setDateTwo] = useState('');

  const [showFirstPicker, setShowFirstPicker] = useState(false);
  const [showSecondPicker, setShowSecondPicker] = useState(false);

  const insertUrl = 'https://mobiloby.click/test/insert_job.php';

  const { setValue, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      job_title: '',
      job_owner: '',
      start_time: '',
      end_time: '',
      description: ''
    }
  });


  const onSubmit = async (data: any) => {
      await axios
      .post(insertUrl, {
        job_title: data.job_title,
        job_owner:  data.job_owner,
        start_time: data.start_time,
        end_time: data.end_time,
        description: data.description
      })
      .then((resp: any) => {
        Alert.alert(resp.data.message)
        console.log('resp', resp.data.message);
      })
      .catch(error => {
        console.log('error', error);
      });
    console.log('data', data);
  };

  const changeFirstPicker = (event, selectedDate) => {
    setShowFirstPicker(false);
    setDate(selectedDate);
    setValue('end_time', date);
  }
  
  const changeSecondPicker = (event, selectedDate) => {
    setShowSecondPicker(false);
    setDateTwo(selectedDate);
    setValue('start_time', dateTwo);
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Job Title</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
        <View
          style={
          errors.job_title
            ? [styles.errortextFieldContentStyle]
            : [styles.input]
          }>
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        </View>

        )}
        name="job_title"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Job Owner</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
        <View
          style={
            errors.job_owner
              ? [styles.errortextFieldContentStyle]
              : [styles.input]
          }>
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        </View>
        )}
        name="job_owner"
        rules={{ required: true }}
      />
      <Text style={styles.label} onPress={()=> (setShowSecondPicker(!showFirstPicker))}> Job Start Date</Text>
      {showSecondPicker && (
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
        <View
          style={
          errors.start_time
            ? [styles.errortextFieldContentStyle]
            : [styles.input]
          }>
          <DateTimePicker
            onChange={changeSecondPicker}
            placeholderText="Enter jon end date"
            value={new Date()}
            mode={'date'}
          />
        </View>

        )}
        name="start_time"
        rules={{ required: true }}
      />
      )}
      <Text onPress={()=> (setShowSecondPicker(!showFirstPicker))} style={styles.input}>{dateTwo.toString()}</Text>
      
      <Text style={styles.label} onPress={()=> (setShowFirstPicker(!showFirstPicker))}> Job End Date</Text>
      {showFirstPicker && (
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
        <View
          style={
          errors.end_time
            ? [styles.errortextFieldContentStyle]
            : [styles.input]
          }>
          <DateTimePicker
            onChange={changeFirstPicker}
            placeholderText="Enter jon end date"
            value={new Date()}
            mode={'date'}
          />
        </View>

        )}
        name="end_time"
        rules={{ required: true }}
      />
      
      )}
      <Text onPress={()=> (setShowFirstPicker(!showFirstPicker))} style={styles.input}>{date.toString()}</Text>


      <Text style={styles.label}>Description</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
        <View
          style={
          errors.description
            ? [styles.errortextFieldContentStyle]
            : [styles.input]
          }>
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            multiline
          />
        </View>

        )}
        name="description"
        rules={{ required: true }}
      />
      
      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Send Job"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'black',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#f2f2f2',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
    justifyContent:'center',
  },
  errortextFieldContentStyle: {
    height: 40,
    borderRadius: 4,    
    backgroundColor: '#E5E5E5',
    borderColor: 'red',
    borderBottomWidth:1,
    justifyContent:'center',

  },
});
