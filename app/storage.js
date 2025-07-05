// screens/StorageScreen.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import Navbar1 from '../components/Navbar';
import Footer from '../components/Footer';

const data = [
  { year: 'Bugun', text: '«Radio City» e-com sohasida 28 yil Aloqa ma\'lumotlari Tafsilotlar AJ «Radio City» tarqatish siz yetkazib beruvchi bo‘lishni rejalashtiryapsizmi? «Radio City»da ishlash maxfiylik siyosati Foydalanuvchi shartnomasi' },
  { year: '2022', text: 'Do\'konlar va savdo ofislarining ochilishi 2 ta hududda. Ochilish savdo ofisi Armanistonda. Do\'konlar soni va ofislar savdo Rossiya Federatsiyasining 49 ta hududida va 3 ta davlatda 58 taga yetdi' },
  { year: '2021', text: 'Sun\'iy intellektga asoslangan raqamli aloqa markazini ishga tushirish. Do\'kon ochilishi va savdo ofislari 9 ta hududda. Savdo ofisining ochilishi Qozog\'istonda' },
  { year: '2020', text: 'Bozor "Radio City". Ishlab chiqaruvchilar va dilerlar uchun avtomatlashtirilgan platformani ishga tushirish. Do\'konlarning ochilishi va savdo ofislari 13 ta hududda' },
  { year: '2019', text: 'Yekaterinburgda yangi kompaniya omborining ochilishi. Radio City - mobil ilovasining chiqarilishi. Android va iOS uchun. Do\'konlar va savdo ofislari soni 30 taga yetdi 25 ta hududda' },
  { year: '2017', text: 'MDH mamlakatlari bozoriga kirish. Minskda do\'kon va savdo ofisini ochish. Omborning ikkinchi bosqichi ochilishi bilan uning umumiy sig‘imi 2 barobar oshdi' },
  { year: '2015', text: '5 ta hududda do\'konlar va savdo ofislarining ochilishi' },
  { year: '2014', text: 'Hududlarga kengayishning boshlanishi. Ikkita do\'kon va mintaqaviy ofislarning ochilishi sotish' },
  { year: '2010', text: '"Radio City" video kanalining ochilishi Youtube' },
  { year: '2008', text: 'Shcherbinkada markaziy ofisining ochilishi' },
  { year: '2006', text: 'Ombor bilan birlashtirilgan saytning yangi versiyasini qayta loyihalash' },
  { year: '2005', text: 'Yangi zamonaviy avtomatlashtirilgan omborning ochilishi' },
  { year: '2004', text: 'Chakana savdo tarmog\'ining kengayishi Radio City. Yana uchtasining ochilishi do\'konlari Moskvada va ikkinchi Sankt-Peterburgda' },
  { year: '2003', text: 'Zamonaviy ERP korporativ boshqaruv tizimiga o\'tish – MS Axapta' },
  { year: '2002', text: 'O\'zingizning to\'g\'ridan-to\'g\'ri ta\'minot tizimini yaratish' },
  { year: '2001', text: 'Chakana savdo tarmog\'ini yaratishni boshlash. Moskvada ikkinchi do\'konning ochilishi. Sankt-Peterburgda do\'kon ochilishi. Assortiment katalogini veb-saytga oʻtkazish va yuqori sifatli assortimentli navigatsiya xizmati. Onlayn do\'konimizni ishga tushirish' },
  { year: '2000', text: 'Bosma katalogni yaratish - ehtimol bozordagi eng yaxshi dir Rossiya' },
  { year: '1999', text: 'Kompaniya veb-saytini yaratish' },
  { year: '1998', text: 'Moskvada birinchi "Radio City" do\'koni ochilishi, ko\'chada. Gilyarovskiy' }
];

export default function StorageScreen() {
  return (
    <ScrollView style={styles.container}>
      <Navbar1 />
      <Text style={styles.title}>Kompaniya tarixi</Text>
      <View style={styles.cardsContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{item.year}</Text>
            <Text style={styles.cardText}>{item.text}</Text>
          </View>
        ))}
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#F3F3F3',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
});
