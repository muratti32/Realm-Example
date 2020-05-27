import React from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'

import MyButton from './button'





const ListItem = ({item,aracSecfunc}) => {
    return (
        <View style={styles.listItem}>
            <MyButton onPress={() => aracSecfunc(item)}>
                <Text style={styles.aracSecinizText}>{item.make} {item.model}</Text>
            </MyButton>
        </View>
    );
}


const PersonelEkleSayfasiAracSecAltMenu = ({carList,aracSecfunc}) => {
    return (
        <View style={styles.flatlist}>
            <Text style={styles.aracSecinizBaslik}>Araç Seçiniz</Text>
                <FlatList
                style={styles.flatlist}
                    data={carList}
                    renderItem={({ item }) => 
                        <ListItem item={item} aracSecfunc={aracSecfunc}/>
                    }
                    keyExtractor={item => (item.model + item.make+ item.miles)}
                />
            </View>
    )
}

export default PersonelEkleSayfasiAracSecAltMenu

const styles = StyleSheet.create({
    aracSecinizText:{
        fontSize:19,
        alignSelf:"center",
        fontWeight:"500" ,
    },
    aracSecinizBaslik:{
        fontSize:23,
        alignSelf:"center",
        fontWeight:"900" ,
    },
    listItem : {
        justifyContent: 'space-between',
        flexDirection:'row',
        marginBottom:3,
        marginLeft:3,
        marginRight:3,
    },
})
