// React Native versiyasi (CartScreen.jsx)
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { useCart } from '../host/CartContext';

import Navbar1 from '../components/Navbar';
import Footer1 from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function CartScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [allSum, setAllSum] = useState(0);
  const [countSelected, setCountSelected] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const { setCartCount } = useCart();

  useEffect(() => {
    const loadCart = async () => {
      const stored = await AsyncStorage.getItem('shop');
      const items = stored ? JSON.parse(stored) : [];
      setData(items);
      setCartCount(items.length);
      calculateTotal(items);
    };
    loadCart();
  }, []);

  const calculateTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.count;
    });
    setAllSum(total);
    setCountSelected(items.length);
  };

  const updateCart = async (updatedData) => {
    setData(updatedData);
    await AsyncStorage.setItem('shop', JSON.stringify(updatedData));
    setCartCount(updatedData.length);
    calculateTotal(updatedData);
  };

  const deleteItem = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateCart(newData);
  };

  const changeCount = (index, diff) => {
    const newData = [...data];
    if (newData[index].count + diff <= 0) {
      deleteItem(index);
      return;
    }
    newData[index].count += diff;
    updateCart(newData);
  };

  const sendOrder = async () => {
    let message = `Yangi buyurtma\nIsm: ${fullName}\nTelefon: ${phone}\n`;
    data.forEach((item) => {
      message += `\n${item.title} - ${item.count} dona x ${item.price} so'm`;
    });
    message += `\nJami: ${allSum} so'm`;

    const botToken = '7598395550:AAFGsDx1WnlZr6WNIrFbDMfkwzsVeMcGtko';
    const chatId = '-1002481822428';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      message
    )}`;

    try {
      await axios.get(url);
      await AsyncStorage.removeItem('shop');
      setData([]);
      setAllSum(0);
      setCountSelected(0);
      Alert.alert('Buyurtma yuborildi', 'Tez orada siz bilan bog‘lanamiz');
      setModalVisible(false);
    } catch (err) {
      Alert.alert('Xatolik', 'Buyurtma yuborilmadi');
    }
  };

  return (
    <View style={styles.container}><ScrollView>
      <Navbar1 navigation={navigation} />
      
        <Text style={styles.title}>🛒 Savat ({countSelected})</Text>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.price}>{item.price} so'm</Text>
              <View style={styles.controls}>
                <TouchableOpacity onPress={() => changeCount(index, 1)}>
                  <Text style={styles.plusMinus}>➕</Text>
                </TouchableOpacity>
                <Text>{item.count}</Text>
                <TouchableOpacity onPress={() => changeCount(index, -1)}>
                  <Text style={styles.plusMinus}>➖</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteItem(index)}>
                  <Text style={styles.trash}>🗑</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        <Text style={styles.total}>Jami: {allSum} so'm</Text>
        <TouchableOpacity style={styles.orderBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.orderText}>Buyurtma berish</Text>
        </TouchableOpacity>
      
      <Footer1 />
</ScrollView>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>📋 Ma'lumotlar</Text>
          <TextInput
            placeholder="Ism Familiya"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
          <TextInput
            placeholder="Telefon"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendOrder}>
            <Text style={styles.sendText}>Yuborish</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelText}>Bekor qilish</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', padding: 10 },
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: { width: 80, height: 80, marginRight: 10 },
  details: { flex: 1, justifyContent: 'center' },
  productTitle: { fontSize: 16, fontWeight: 'bold' },
  price: { marginTop: 5, fontSize: 14 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  plusMinus: { fontSize: 20, paddingHorizontal: 10 },
  trash: { fontSize: 18, color: 'red' },
  total: { fontSize: 18, fontWeight: 'bold', padding: 10 },
  orderBtn: {
    backgroundColor: '#E91F25',
    margin: 10,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  orderText: { color: '#fff', fontSize: 16 },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalTitle: { fontSize: 20, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  sendBtn: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendText: { color: '#fff', fontSize: 16 },
  cancelText: {
    marginTop: 15,
    color: '#E91F25',
    textAlign: 'center',
    fontSize: 16,
  },
});
