import React,{useState,useEffect,useRef} from 'react'
import { StyleSheet, Text, View,FlatList,Alert } from 'react-native'

import {colors} from '../global_vars'
import MyButton from './button'
import VeriSilListItem from './VeriSilListItem'

const VeriSil = ({navigation,route}) => {

    const realm = route.params;
 
    //for the list of person
    const [personList,setPersonList] = useState();
    const [carList,setCarList] = useState();

    const [silinecekItem,setSilinecekItem] = useState([])

    const isComponentMounted = useRef(true)

    const handleVeriSil = () => {
        realm.write(() => {
            silinecekItem.forEach((item) => {
                const isUsed = isItemUsed(item)
                if(!isUsed){
                    realm.delete(silinecekItem)
                }else{
                    alert(`${item.make} ${item.model} kayıt başka verilerde kullanıldığından silinemiyor`)
                }
            })
        })
        setSilinecekItem([])
    }

    const alert = (text) => {
        Alert.alert(
            "Kayıt Silme Durumu",
            text,
            [
                {
                    text: "OK",
                    onPress : () => {}
                },
                {
                    text: "Cancel",
                    onPress : () => {},
                    style: "cancel"
                }
            ],
            {
                cancelable : false
            }
        )
    }
    


    useEffect(() => {
        console.log(silinecekItem)
    },[silinecekItem])


    useEffect(() => {
        if(isComponentMounted.current){
            setPersonList(realm?.objects('Person'))
            setCarList(realm?.objects('Car'))
        }

        realm.addListener('change', () => {
            setCarList(realm?.objects('Car'))
            setPersonList(realm?.objects('Person'))
        });
        
        return () => {
            isComponentMounted.current = false
        }

    },[])


    const isItemUsed = (item) => {
            const tablo =  item?.cars ? "Person":"Car"
            if(tablo === "Car"){
                const Persons = realm.objects('Person')
                const Cars = Persons.filtered(`cars.make= "${item.make}" AND cars.model= "${item.model}" AND cars.miles= ${item.miles}`)
                return  (Cars.length >= 1)
            }
            else if(tablo === "Person"){
                return  false
            } else {
                return false
            }
    }
    

    const addToBeDeletedArray = (item,tur) => {
        if(tur === "ekle"){
            setSilinecekItem((prev) => [...prev, item])
        }else
        {
            removeItem(item)
        }
        
    }

    const removeItem = item => {
        // assigning the list to temp variable
        const temp = [...silinecekItem];
    
        // removing the element using splice
        temp.splice(item, 1);
    
        // updating the list
        setSilinecekItem(temp);
    }


    return (
        <View style={styles.container}>
            <View style={styles.carList}>
            <Text style={styles.personelTitle}>Car List</Text>
                <FlatList
                    style={styles.flatlist}
                    data={carList}
                    renderItem={({ item }) => 
                        <VeriSilListItem item={item} addToBeDeletedArray={addToBeDeletedArray}/>
                    }
                    keyExtractor={item => (item.make + item.model+ item.phone)}
                />

            
            </View>
                    
            <View style={styles.personelList}>
                <Text style={styles.personelTitle}>Personel List</Text>
                <FlatList
                    style={styles.flatlist}
                    data={personList}
                    renderItem={({ item }) => 
                        <VeriSilListItem item={item} addToBeDeletedArray={addToBeDeletedArray}/>
                    }
                    keyExtractor={item => (item.name + item.phone)}
                />

                <MyButton height={40} backgroundColor={colors.mavi} onPress={() => handleVeriSil()}>
                    <Text style={{fontSize:15,fontWeight:"bold",color:colors.beyaz}}>
                        Delete Selected Item(s)
                    </Text>
                </MyButton>
            </View>
        </View>
    )
}

export default VeriSil

const styles = StyleSheet.create({
    container : {
        flex:1,
    },
    carList: {
        flex:1,
        backgroundColor:"#fff"
    },
    personelList: {
        flex:1,
        backgroundColor:"#777"
    },
    personelTitle : {
        fontWeight:'bold',
        fontSize:19,
        alignSelf: 'center',
        marginTop:13,

    },

})
