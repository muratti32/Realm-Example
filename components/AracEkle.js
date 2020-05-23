import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TextInput,FlatList } from 'react-native'

import MyButton from './button'
import Icon from 'react-native-vector-icons/Feather';

import {colors} from '../global_vars'



const AracEkle = ({navigation,route}) => {

    const [makeValue, onChangeMake] = useState();
    const [modelValue, onChangeModel] = useState();
    const [milesValue, onChangeMiles] = useState();

    const [carList,setCarList] = useState();

    const realm = route.params;

    const ListItem = ({item}) => {
        return (
            <View style={styles.listItem}>
                <Text style={styles.listItemText}>{item.make} {item.model}</Text>  
                <MyButton onPress={() => deleteCar(item)} style={styles.listItem}>
                    <Icon style={styles.listeDeleteIcon} name="delete" size={23} color={colors.mavi} />
                </MyButton>
            </View>
        );
    }

    
    useEffect(() => {
       //Veritabanına eklenen arabaları liste olarak 
        //göstermek için kullanılan state
        setCarList(realm?.objects('Car'))
        realm.addListener('change', () => {
            setCarList(realm?.objects('Car'))
        });
    },[])



    const deleteCar = (item) => {
        const Cars = realm?.objects('Car')
        const SelectedCar = Cars.filtered(`make = "${item.make}" AND model = "${item.model}" AND miles = "${item.miles}"`);
        realm.write(() => {
            realm.delete(SelectedCar)
        })
    }

    
    //yeni araç ekleme
    const aracEkle = () => {
        realm.write(() => {
            realm.create('Car', {
            make: makeValue,
            model: modelValue,
            miles: Number(milesValue),
        });
        })
    }
    

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeMake(text)}
                placeholder="make"
                value={makeValue}
                />
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeModel(text)}
                placeholder="Model"
                value={modelValue}
                />
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeMiles(text)}
                placeholder="Miles"
                value={milesValue}
                />


            <MyButton onPress={() => aracEkle()} my={2} bg={colors.mavi} height={33}>
                <Text>Araç ekle</Text>


            </MyButton>

            <View style={styles.flatlist}>
                <FlatList
                style={styles.flatlist}
                    data={carList}
                    renderItem={({ item }) => 
                        <ListItem item={item}/>
                    }
                    keyExtractor={item => (item.model + item.make+ item.miles)}
                />
            </View>
        </View>
    )
}

export default AracEkle

const styles = StyleSheet.create({
    container : {
        flex:1,
        padding:5
    },
    input : {
        height: 50, 
        borderColor: 'gray', 
        borderWidth: 1,
        marginBottom:5,
    },
    flatlist : {
        marginTop:13,
    },
    listItem : {
        justifyContent: 'space-between',
        flexDirection:'row',
        marginBottom:3,
        marginLeft:3,
        marginRight:3,
    },
    listItemText : {
        fontSize:19,
        color:"black",
        fontWeight: '600',
    },
    listeDeleteIcon : {
        
    },
})
