import React,{useState,useRef} from 'react'
import { StyleSheet, Text, View, FlatList} from 'react-native'
import {Picker} from '@react-native-community/picker';


import { ListItem,Icon,Button } from 'react-native-elements'
import RBSheet from "react-native-raw-bottom-sheet";




const VeriGoster = ({navigation,route}) => {


    const [secilenTablo, setSecilenTablo] = useState("Car");

    const realm = route.params;

    //Bottom sheet menü açma kapama işlemi için referans 
    const Sheet = useRef(null) 

    const TabloSec = ({tabloList}) => {
        return (
            <View style={{padding:7}}>
                <Button onPress={() => selectTable("Car") } style={styles.RBSheetButton} title="Car" type="outline" />
                <Button onPress={() => selectTable("Person") } style={styles.RBSheetButton} title="Person" type="outline" />
            </View>
        )
    }

    const Item = ({item}) => {
        return (
            <ListItem
                title={getName(item)}
                subtitle={getSubtitle(item)}
                leftIcon={getIcon()}
                bottomDivider
                chevron
            />
        );
    }

    const selectTable = (name) => {
        setSecilenTablo(name)
        Sheet.current.close()
    }
    

    const getIcon = () => {
        return(
            <Icon
                reverse
                name= {(secilenTablo === 'Car') ? 'car':'users'}
                type='font-awesome'
                color='#517fa4'
            />
        )
    }

    const getName = (item) => {
        if('phone' in item){
            //item personel tablosuna ait
            return (item?.name  )
        }
        else{
            //item car tablosuna ait
            return (item?.make )
        }
    }
    

    const getSubtitle = (item) => {
        if('phone' in item){
            //item personel tablosuna ait
            return (item?.phone )
        }
        else{
            //item car tablosuna ait
            return (item?.model)
        }
    }

    const getData = () => {
        return realm.objects(secilenTablo)
    }

    const getId = (item) => {
        if('phone' in item){
            //item personel tablosuna ait
            return (item?.name + " " +item?.phone )
        }
        else{
            //item car tablosuna ait
            return (item?.make + " " +item?.model)
        }
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.tabloSec}>
                <Button 
                containerStyle={styles.TabloSecButton}
                title={` Selected Table : ${secilenTablo}` }
                onPress={() => {Sheet.current.open()}}
                type="outline"/>
            </View>

            <View style={styles.liste}>
                <FlatList
                    style={styles.flatlist}
                    data={getData()}
                    renderItem={({ item }) => 
                        <Item item={item}/>
                    }
                    keyExtractor={item => getId(item)}
                />
            </View>

            <RBSheet
            ref={Sheet}
            height={300}
            openDuration={250}
            customStyles={{
            RBSheetStyle: {
                paddingTop:9,
                paddingRight:7,
                paddingLeft:7,
                justifyContent: "flex-start",
                alignItems: "stretch"
            }
            }}>
                <TabloSec />
            </RBSheet>
        </View>
    )
}

export default VeriGoster

const styles = StyleSheet.create({
    container : {
        flex:1,
        padding:3,
    },
    picker: { 
        height: 50, width: 150,
        flex:1,
    },
    pickerItemText: { 
        flex:1,
        fontSize:21,
    },
    liste: { 
        flex:1,
    },
    tabloSec: { 
        flexDirection : 'row',
        alignItems: 'center',
    },
    RBSheetButton: { 
        margin : 5,
    },
    TabloSecButton: { 
        margin : 5,
        width : '99%',
    },
})
