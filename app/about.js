// screens/AboutScreen.jsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import Navbar1 from '../components/Navbar';
import Footer1 from '../components/Footer';

const windowWidth = Dimensions.get('window').width;

const stats = [
  { img: require('../assets/images/about1.png'), title: '100 000+', desc: 'Potentsial xaridorlar kuniga Rossiya, Belarus, Qozog\'iston va Armaniston' },
  { img: require('../assets/images/Component 10 (1).png'), title: '62 000+', desc: 'buyurtmalar oylik' },
  { img: require('../assets/images/Component 10 (2).png'), title: '40', desc: 'chakana savdo tarmog\'i ofislari bo\'lgan do\'konlar' },
  { img: require('../assets/images/Component 10 (3).png'), title: '11 000 m²', desc: 'ombor va savdo maydoni' },
  { img: require('../assets/images/Component 10 (4).png'), title: 'Radio City', desc: 'Mobil ilova' },
  { img: require('../assets/images/Component 10 (5).png'), title: 'Yetkazib berish', desc: 'mas\'uliyatli saqlash, to\'lovlarni qabul qilish' },
];

const requirements = [
  'Yuridik shaxs yoki yakka tartibdagi tadbirkor',
  'Moliyaviy shaffoflik',
  'EDF bilan ishlash: Elektron hujjat aylanishi',
  'Kontentning mavjudligi: fotosuratlar, tavsiflar, sertifikatlar va h.k.',
  "API interfeysi yoki .xml fayli orqali ma'lumotlar almashinuvi",
  'Joriy ombor zaxiralari: kuniga kamida bir marta yangilanadi',
  "1 kun ichida qadoqlash va jo'natish",
  'Shikoyatlarni moslashuvchan ko\'rib chiqish',
  'Radio City omboriga yetkazib beruvchi hisobidan yetkazib berish'
];

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Navbar1 />

      <Text style={styles.title}>Siz etkazib beruvchi bo'lishni rejalashtiryapsizmi?</Text>

      <Text style={styles.subtitle}>
        "Radio CIty" kompaniyasi ishlab chiqaruvchilarni hamkorlikka taklif etadi va elektron komponentlar va asboblar distribyutorlari.
      </Text>

      <View style={styles.cardsContainer}>
        {stats.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.img} style={styles.cardImage} resizeMode="contain" />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.title}>Radio City yetkazib beruvchiga qo'yiladigan talablar</Text>
<View style={styles.title22}>
      {requirements.map((item, index) => (
        <Text key={index} style={styles.listItem}>- {item}</Text>
      ))}
</View>
      <Text style={styles.infoText}>
        Radio City yetkazib beruvchisi bo'lish uchun hamkorlik uchun ariza to'ldirishingiz kerak.
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>So’rov qoldirish</Text>
      </TouchableOpacity>

      {/* <View style={styles.videoContainer}>
        <Text style={styles.videoTitle}>Promo video:</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=05BZsQh6amo')}>
          <Image
            source={{ uri: 'https://img.youtube.com/vi/05BZsQh6amo/0.jpg' }}
            style={styles.videoThumb}
          />
        </TouchableOpacity>
      </View> */}

      <Footer1 />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
  },
  title22:{
padding:16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    padding:10
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: windowWidth / 2 - 24,
    margin: 8,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardDesc: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  listItem: {
    fontSize: 14,
    marginVertical: 4,
  },
  infoText: {
    fontSize: 15,
    marginTop: 16,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    margin: 12,
    backgroundColor: '#E91F25',
    
    borderRadius: 8,
    alignItems: 'center',padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
padding:5  
},
  videoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  videoThumb: {
    width: windowWidth - 32,
    height: 200,
    borderRadius: 10,
  },
});
