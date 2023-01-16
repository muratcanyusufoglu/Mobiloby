import { View, Text, FlatList, StyleSheet} from 'react-native'
import React,{useEffect, useState} from 'react'
import axios from 'axios';
import moment from 'moment';
export default function ListJobs() {

    const url = 'https://mobiloby.click/test/get_jobs.php';

    const [data, setData] = useState();

    useEffect(()=> {
        const getData = async ()=> {
            await axios
            .get(url)
            .then(items => {
              setData(items.data.jobs);
              const t = items.data.jobs[0].replace('-','')
              console.log('tt',t)
              const time = moment(t.slice(0,9), "YYYY-MM-DD").fromNow();
              console.log('timeee', time)
            })
            .catch(error => console.log('error', error));

        }    

        getData();
    }, [])


  return (
    <View style={{backgroundColor: '#f2f2f2'}}>
    
    <FlatList
        extraData={data}
        data={data}
        renderItem={({item}) => (
          <>
        <View style={styles.container}>
            <View style={styles.listJob}>
                <Text style={styles.lineStyleLeft}>Job Title</Text>
                <Text style={styles.lineStyleRight}>{item.job_title}</Text>
            </View>
            <View style={styles.lineStyle} />
            <View style={styles.listJob}>
                <Text style={styles.lineStyleLeft}>Job Owner</Text>
                <Text style={styles.lineStyleRight}>{item.job_owner}</Text>
            </View>
            <View style={styles.lineStyle} />

            <View style={styles.listJob}>
                <Text style={styles.lineStyleLeft}>Start Time</Text>
                <Text style={styles.lineStyleRight}>{item.job_start_date}</Text>
            </View>
            <View style={styles.lineStyle} />

            <View style={styles.listJob}>
                <Text style={styles.lineStyleLeft}>End Time</Text>
                <Text style={styles.lineStyleRight}>{item.job_end_date}</Text>
            </View>
            <View style={styles.lineStyle} />

            <View style={styles.listJob}>
                <Text style={styles.lineStyleLeft}>Description</Text>
                <Text style={styles.lineStyleRight}>{item.job_description}</Text>
            </View>
            <View style={styles.lineStyle} />
            <View style={styles.listJob}>
                <Text style={styles.lineStyleLeft}>Job Date Status</Text>
                <Text style={styles.lineStyleRight}>{
                moment(item.job_end_date.replace(/-/g,'').slice(0,9), "YYYY-MM-DD").fromNow().includes('ago')  ? 
                'Yayından kaldırılmış'  : 
                moment(item.job_start_date.replace(/-/g,'').slice(0,9), "YYYY-MM-DD").fromNow().includes('months ago') ?
                moment(item.job_start_date.replace(/-/g,'').slice(0,9), "YYYY-MM-DD").fromNow().replace('months ago','aydır yayında') : 
                moment(item.job_start_date.replace(/-/g,'').slice(0,9), "YYYY-MM-DD").fromNow().includes('days ago') ?
                moment(item.job_start_date.replace(/-/g,'').slice(0,9), "YYYY-MM-DD").fromNow().replace('days ago','gündür yayında') :
                moment(item.job_start_date.replace(/-/g,'').slice(0,9), "YYYY-MM-DD").fromNow().replace('days','gün sonra yayınlanacak')}</Text>
            </View>
        </View>
        </>
        )}
      />
    </View>
  )
}

const styles =StyleSheet.create({
    container: {
        margin:20,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor:'transparent',
        borderRadius: 12,
        padding: 5,
        elevation: 4.0,
    },
    listJob: {
        flex: 2,
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
    },
    lineStyleRight: {
        flex:1.4,
        color: 'black',
    },
    lineStyleLeft: {
        flex: 1,
        color: 'black',
        textAlign: 'left',
        
    },
    lineStyle: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      },
})