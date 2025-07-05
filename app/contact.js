import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Navbar1 from '../components/Navbar';
import Footer from '../components/Footer';
import { WebView } from 'react-native-webview';

// Rasmlar
import socials1 from '../assets/images/socials.png';
import socials2 from '../assets/images/socials1.png';
import socials3 from '../assets/images/socials2.png';

const { width, height } = Dimensions.get('window');
const url = 'https://api.rce.uz';

export default function ContactScreen() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetch(`${url}/api/company`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setCompany(data[0]);
      })
      .catch(err => console.error('Company fetch error:', err));
  }, []);

  if (!company) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const { phone, email, address, lan, lac, telegram, facebook, instagram, youtobe } = company;
//   const mapUrl = `https://yandex.com/maps/?ll=${lac}%2C${lan}&z=15&l=map`;

  return (
    <ScrollView style={styles.container}>
      <Navbar1 />
      <Text style={styles.title}>Kontakt ma’lumotlari</Text>

      <View style={styles.body}>
        <View style={styles.contactText}>
          <Text style={styles.heading5}>Do'konimizdan olib ketish - bepul, tez va oson</Text>

          <Text style={styles.heading}>Manzil:</Text>
          <Text style={styles.paragraph}>{address}</Text>

          <Text style={styles.heading}>Telefon:</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:+${phone}`)}>
            <Text style={[styles.paragraph, { color: '#007AFF' }]}>+{phone}</Text>
          </TouchableOpacity>

          <Text style={styles.heading}>Elektron pochta:</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
            <Text style={[styles.paragraph, { color: '#007AFF' }]}>{email}</Text>
          </TouchableOpacity>

          <Text style={styles.heading}>Ish soatlari:</Text>
          <Text style={styles.paragraph}>
            Dushanba – Shanba  9:00–20:00{'\n'}Yakshanba                10:00–18:00
          </Text>

          <View style={styles.socials}>
            <TouchableOpacity onPress={() => Linking.openURL(telegram)}>
              <Image source={socials1} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(instagram)}>
              <Image source={socials2} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(youtobe)}>
              <Image source={socials3} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={styles.mapContainer}>
          <WebView
            source={{ uri: mapUrl }}
            style={styles.map}
            javaScriptEnabled
            domStorageEnabled
          />
        </View> */}
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
  },
  body: {
    paddingHorizontal: 16,
  },
  contactText: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  heading5: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
  },
  socials: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
  mapContainer: {
    marginTop: 20,
    height: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  map: {
    width: width,
    height: height * 0.5,
  },
});
