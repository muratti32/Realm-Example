import React,{useEffect,useState} from 'react'
import {StyleSheet,View,StatusBar,SafeAreaView,YellowBox} from 'react-native'

import Realm from 'realm'


import Box from './Box'
import RealmIcon from './images/RealmIcon'
import Bg from './Bg'
import Text from './text'
import CardButton from './card-button'
import {vars,colors} from '../global_vars'

//realm objesini başka komponente gönderince veren uyarıyı kapatmakiçin kullanılıyor
YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

// Arabalar Tablosu
const CarSchema = {
    name: 'Car',
    properties: {
      make:  'string',
      model: 'string',
      miles: {type: 'int', default: 0},
    }
  };


  //1 - 1 ilişkili tablo
  const PersonSchema = {
    name: 'Person',
    properties: {
      name:     'string',
      phone:    'string',
      cars:     'Car',
    }
  };

const Home = ({navigation}) => {

const [realm,setRealm] = useState()

  //Realm ayarları
    const databaseOptions = {
        path: 'veritabani.realm',
        schema: [PersonSchema,CarSchema],
        schemaVersion: 1
        };

    //uygulama ilk açıldığında tablolor açılarak realm nesnesine yükleniyor
    useEffect(() => {
        Realm.open(databaseOptions)
        .then(realmObj => {
            setRealm(realmObj)
            })
        .catch(error => console.log(error));

        /*   
        realm nesnesi her güncelleme sonrası kapatılabilir 
        fakat bu işe Realm engine bırakmak tavsiye ediliyor
        */
        return () => {
        
        };
    },[])

  /* 
  her bir oluşturulan nesneye navigation objesini göndermek performansı düşüreceği için
  üst component te yer alan fonksiyonu gönderdik
   */
  const handleAracEkle = (item) => {
    navigation.navigate(vars.navigate_arac_ekle,realm)
  }
  const handleKisiEkle = (item) => {
    navigation.navigate(vars.navigate_kisi_ekle,realm)
  }
  const handleVeriSil = () => {
    navigation.navigate(vars.navigate_veri_sil,realm)
  }
  const handleVeriGoster = () => {
    navigation.navigate(vars.navigate_veri_goster,realm)
  }

    return (
        <Box flex={1} backgroundColor={colors.mavi}>
        <StatusBar backgroundColor={colors.mavi}  barStyle="light-content" />
        <SafeAreaView style={styles.container} >
          {/* Header nesnesi */}
          <Bg> 
            <View style={{paddingTop:11}}>
              <RealmIcon style={styles.realmIcon}/> 
              <Text  pl={2} pt={3} fontSize={27} color={colors.beyaz} fontWeight={'bold'}>
                Realm Sample App
              </Text>
            </View>        
          </Bg>
  
          {/* Butonlar  */}
          <View style={styles.butonlar}>
            <CardButton iconName="directions-car"  title="Add Car" handleClick={handleAracEkle}/>
            <CardButton iconName="person-add" title="Add Person" handleClick={handleKisiEkle}/>
            <CardButton iconName="delete" title="Delete Item" handleClick={handleVeriSil}/>
            <CardButton iconName="list" title="Browse Items" handleClick={handleVeriGoster}/>
          </View>
      
        </SafeAreaView>
      </Box>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
    },
    cardButton: {
      marginTop:7,
      justifyContent:"space-around",
      flexDirection:'row'
    },
    butonlar : {
      flex:1,
      paddingTop:19,
      backgroundColor:"white"
    },
    realmIcon : {
      marginTop:11,
      marginLeft:7,
    },
  });
  

export default Home
