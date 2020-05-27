import React,{useState} from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'
import { CheckBox } from 'react-native-elements'

const VeriSilListItem = ({item,addToBeDeletedArray}) => {

    //for the checkbox
    const [isChecked, setChecked] = useState(false)
    
    const getItemText = () => {
        if('phone' in item){
            //item personel tablosuna ait
            return (item?.name + " " +item?.phone )
        }
        else{
            //item car tablosuna ait
            return (item?.make + " " +item?.model)
        }
    }

    const handleClick = (params) => {
        console.log(params)
    }

    const handleCheckboxPress = () => { 
        !isChecked ? addToBeDeletedArray(item,"ekle") : addToBeDeletedArray(item,"sil")
        setChecked(!isChecked);

    }
    
    
    return (
        <View style={styles.container}>
            <View style={styles.List}>
                <CheckBox
                    title={getItemText()}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    containerStyle={styles.checkBoxContainer}
                    textStyle={styles.listItemText}
                    
                    checked={isChecked}
                    onPress={() => handleCheckboxPress()}
                />
            </View>
        </View>
    )
}

export default VeriSilListItem

const styles = StyleSheet.create({
    container : {
        margin:0,
        flex:1,
    },
    List : {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:11,
    },
    listItemText : {
        color : "#000",
        fontSize:17,
    },
    checkBoxContainer : {
        padding:3,
        backgroundColor:"transparent",
        borderWidth:0,
    }
})
