// screens/ProductDetailScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useCart } from '../host/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../host/host';
import Navbar1 from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProductDetailScreen() {
  const route = useRoute();
  const { id } = route.params;
  const { setCartCount } = useCart();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${url}/api/oneproduct/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        Alert.alert("Xatolik", "Ma'lumotni olishda xatolik yuz berdi");
        setLoading(false);
      });
  }, [id]);

  const buyProduct = async () => {
    try {
      const imageUrl = `${url}/api/getimage?url=${data.images.rows[0].meta.downloadHref}`;
      const newItem = {
        image: imageUrl,
        title: data.name,
        code: data.code,
        price: data.salePrices[0].value / 100,
        id: data.id,
        count: 1
      };

      const stored = await AsyncStorage.getItem('shop');
      let shop = stored ? JSON.parse(stored) : [];

      let found = false;
      for (let item of shop) {
        if (item.id === data.id) {
          item.count++;
          found = true;
        }
      }
      if (!found) shop.push(newItem);

      await AsyncStorage.setItem('shop', JSON.stringify(shop));
      setCartCount(shop.length);
      Toast.show({
        type: 'success',
        text1: 'Savatga qo‘shildi'
      });
    } catch (e) {
      Alert.alert("Xatolik", "Mahsulotni saqlashda xatolik yuz berdi");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <ScrollView >
        <Navbar1/>
        <View style={styles.container}>
      <Text style={styles.title}>{data.name}</Text>
      <Image
        source={{ uri: `${url}/api/getimage?url=${data.images?.rows[0]?.meta?.downloadHref}` }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.price}>{data.salePrices[0].value / 100} so'm</Text>
      <TouchableOpacity onPress={buyProduct} style={styles.button}>
        <Text style={styles.buttonText}>Savatga qo‘shish</Text>
      </TouchableOpacity>

      {data.description && (
        <View style={styles.descriptionBox}>
          <Text style={styles.descTitle}>Asosiy xususiyatlar:</Text>
          {data.description.split('#').map((item, idx) => (
            <View key={idx} style={styles.descItem}>
              <View style={styles.bullet} />
              <Text style={styles.descText}>{item}</Text>
            </View>
          ))}
        </View>
      )}</View>
    <Footer/>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8
  },
  price: {
    fontSize: 18,
    marginVertical: 10
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  descriptionBox: {
    marginTop: 20
  },
  descTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  descItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000',
    marginRight: 8
  },
  descText: {
    fontSize: 14
  }
});
