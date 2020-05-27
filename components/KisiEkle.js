import React,{useState,useEffect,useRef} from 'react'
import { StyleSheet, Text, View,TextInput,FlatList,Alert } from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";

import MyButton from './button'
import Icon from 'react-native-vector-icons/Feather';

import {colors} from '../global_vars'
import PersonelEkleSayfasiAracSecAltMenu from './PersonelEkleSayfasiAracSecAltMenu'


const KisiEkle = ({navigation,route}) => {

    Icon.loadFont()

    const [nameValue, onChangeName] = useState();
    const [phoneValue, onChangePhone] = useState();
    const [carValue, onChangeCar] = useState();

    
    const [carList,setCarList] = useState();
    const [selectedCar,setSelectedCar] = useState();
    const [personList,setPersonList] = useState();

    const realm = route.params;

    const isComponentMounted = useRef(true);

    //Bottom sheet menü açma kapama işlemi için referans 
    const Sheet = useRef(null) 

    const ListItem = ({item}) => {
        return (
            <View style={styles.listItem}>
                <Text style={styles.listItemText}>{item.name} {item.phone}</Text>  
                <MyButton onPress={() => deletePerson(item)} style={styles.listItem}>
                    <Icon style={styles.listeDeleteIcon} name="delete" size={23} color={colors.mavi} />
                </MyButton>
            </View>
        );
    }

    
    useEffect(() => {
       //Veritabanına eklenen arabaları liste olarak 
        //göstermek için kullanılan state
        if(isComponentMounted.current)
        {
            setCarList(realm?.objects('Car'))
            setPersonList(realm?.objects('Person'))
            realm.addListener('change', () => {
                setCarList(realm?.objects('Car'))
                setPersonList(realm?.objects('Person'))
            });
        }
        return () => {
            isComponentMounted.current = false
        }
    },[])



    const deletePerson = (item) => {
        const Person = realm?.objects('Person')
        //const SelectedPerson1 = Person.filtered(`name = "${item.name}" AND phone = "${item.phone}" AND cars.make = [c] "${item?.cars.make}"`);
        const SelectedPerson1 = Person.filtered(`name = "${item.name}" AND phone = "${item.phone}"`);

        realm.write(() => {
            realm.delete(SelectedPerson1)
        })
    }

    
    //yeni kişi ekleme
    // bir kişiye biren çok araç eklemek için 
    // Person tablosunda cars yerine cars[] yapılmalıydı
    const kisiEkle = () => {
        if(selectedCar?.length !== undefined)
        {
            realm.write(() => {
                realm.create('Person', {
                    name: nameValue,
                    phone: phoneValue,
                    cars: selectedCar[0],
                });
            })
        }else
        {
            alert("Önce Araç Seçmelisiniz")
        }

        
    }


    const alert = (text) => {
        Alert.alert(
            "Kayıt Ekleme Durumu",
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
    
    

    const altMenuAc = () => {
        Sheet.current.open()
    }
    const altMenuKapa = () => {
        Sheet.current.close()
    }
    
    const aracSecfunc = (item) => {
        const Cars = realm?.objects('Car')
        const SelectedCar = Cars.filtered(`make = "${item.make}" AND model = "${item.model}" AND miles = "${item.miles}"`);
        setSelectedCar(SelectedCar)
        altMenuKapa()
    }
    
    const getSelectedCarName = () => {
        return(
            selectedCar[0].make + " " + selectedCar[0].model
        ) 
    }
    
    
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeName(text)}
                placeholder="Name"
                value={nameValue}
                />
            <TextInput
                style={styles.input}
                onChangeText={text => onChangePhone(text)}
                placeholder="Phone"
                value={phoneValue}
                />
            <View style={styles.aracSeciniz}>
                <Text style={{width:"50%"}}>{selectedCar ? getSelectedCarName() : "Car "} </Text>
                <MyButton onPress={() => altMenuAc()} width="50%" height={30} bg={colors.mavi}>
                    <Text>Select Car</Text>
                </MyButton>
                
            </View>


            <MyButton onPress={() => kisiEkle()} my={2} bg={colors.mavi} height={33}>
                <Text>Add Person</Text>
            </MyButton>

            <View style={styles.flatlist}>
                <FlatList
                style={styles.flatlist}
                    data={personList}
                    renderItem={({ item }) => 
                        <ListItem item={item}/>
                    }
                    keyExtractor={item => (item.name + item.phone)}
                />
            </View>
            <RBSheet
            ref={Sheet}
            height={300}
            openDuration={250}
            customStyles={{
            container: {
                paddingTop:9,
                paddingRight:7,
                paddingLeft:7,
                justifyContent: "flex-start",
                alignItems: "stretch"
            }
            }}>
            <PersonelEkleSayfasiAracSecAltMenu carList={carList} aracSecfunc={aracSecfunc}/>
        </RBSheet>
      
        </View>
    )
}

export default KisiEkle

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
    aracSeciniz : {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: 'center',
    },
})
