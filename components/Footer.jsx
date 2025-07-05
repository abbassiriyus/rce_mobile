import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Statik logolar
import logo from '../assets/images/logo_footer.png';
import set1 from '../assets/images/socials.png';     // Telegram
import set2 from '../assets/images/socials1.png';    // Instagram
import set3 from '../assets/images/socials2.png';    // YouTube

const url = 'https://api.rce.uz';

export default function Footer() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetch(`${url}/api/company`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setCompany(data[0]);
      })
      .catch(err => console.error('Footer company fetch error:', err));
  }, []);

  return (
    <View style={styles.footer}>
      <View style={styles.footerBody}>
        <View style={styles.footerItem}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.h1}>
            <Icon name="call" size={14} color="#fff" /> +{company?.phone || '998 94 545 2266'}
          </Text>
          <Text style={styles.p}>
            <Icon name="mail" size={14} color="#fff" /> {company?.email || 'info@rce.uz'}
          </Text>
        </View>

        <View style={styles.footerItem}>
          <Text style={styles.h2}>Biz haqimizda</Text>
          <Text style={styles.p}>Tariximiz</Text>
          <Text style={styles.p}>Magazin ma’lumotlari</Text>
          <Text style={styles.p}>Rekvizitlar</Text>
          <Text style={styles.p}>Hamkorlarimiz</Text>
        </View>

        <View style={styles.footerItem}>
          <Text style={styles.h2}>Online xarid</Text>
          <Text style={styles.p}>Qanday buyutma berish</Text>
          <Text style={styles.p}>Yetkazib berish</Text>
          <Text style={styles.p}>To’lov qilish</Text>
          <Text style={styles.p}>Buyutma holati</Text>
        </View>

        <View style={styles.footerItem}>
          <Text style={styles.p}>Radio City Buxoro</Text>
          <Text style={styles.p}>Radio City Toshkent</Text>
          <Text style={styles.p}>Radio City Samarqand</Text>
          <Text style={styles.p}>Radio City Navoiy</Text>
          <Text style={styles.p}>Radio City Farg’ona</Text>
        </View>

        <View style={[styles.footerItem, styles.large]}>
          <View style={styles.socialIcons}>
            {company?.telegram && (
              <TouchableOpacity onPress={() => Linking.openURL(company.telegram)}>
                <Image source={set1} style={styles.icon} />
              </TouchableOpacity>
            )}
            {company?.instagram && (
              <TouchableOpacity onPress={() => Linking.openURL(company.instagram)}>
                <Image source={set2} style={styles.icon} />
              </TouchableOpacity>
            )}
            {company?.youtobe && (
              <TouchableOpacity onPress={() => Linking.openURL(company.youtobe)}>
                <Image source={set3} style={styles.icon} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <View style={styles.line} />
      <Text style={styles.footerBottom}>Magazin va Optimchilar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#00415A',
    paddingBottom: 30,
  },
  footerBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  footerItem: {
    width: '45%',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  h1: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  h2: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  p: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 5,
  },
  large: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  line: {
    height: 1,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  footerBottom: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
  },
});
