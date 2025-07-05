// app/catalog.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCart } from '../host/CartContext';
import axios from 'axios';
import url from '../host/host';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pagination from '../components/Pagination';
import Navbar1 from '../components/Navbar';
import Footer from '../components/Footer';

export default function CatalogScreen() {
  const { setCartCount } = useCart();
  const router = useRouter();
  const { id, title } = useLocalSearchParams();

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(9000000);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  const getProduct = async () => {
    setLoading(true);
    try {
      let response;
      if (id === '0') {
        response = await axios.get(`${url}/api/product?limit=60`);
      } else {
        response = await axios.get(`${url}/api/category/product/${id}?limit=60`);
      }

      const allData = response.data;
      setData(allData);

      const filtered = allData.filter(product => {
        const price = product.salePrices[0].value / 100;
        return price >= min && price <= max;
      });

      setFilteredData(filtered);
      setCurrentPage(1); // Reset page after filter
    } catch (err) {
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const buyProduct = async (image, title, code, price, id) => {
    try {
      const newItem = { image, title, code, price, id, count: 1 };

      const stored = await AsyncStorage.getItem('shop');
      let existing = stored ? JSON.parse(stored) : [];

      const index = existing.findIndex(item => item.id === id);
      if (index > -1) {
        existing[index].count++;
      } else {
        existing.push(newItem);
      }

      await AsyncStorage.setItem('shop', JSON.stringify(existing));
      setCartCount(existing.length);

      Toast.show({
        type: 'success',
        text1: 'Savatga qo‘shildi',
      });
    } catch (error) {
      console.error('Savatga qo‘shishda xatolik:', error);
      Toast.show({
        type: 'error',
        text1: 'Xatolik yuz berdi',
      });
    }
  };

  useEffect(() => {
    if (id) getProduct();
  }, [id]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getProduct} />
      }
    >
      <Navbar1 />
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          {title}
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          paginatedData.map((item, index) => {
            const productImg = item.images?.rows[0]?.meta?.downloadHref
              ? `${url}/api/getimage?url=${item.images.rows[0].meta.downloadHref}`
              : 'https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg';

            const price = item.salePrices[0].value / 100;

            return (
              <View
                key={index}
                style={{
                  marginBottom: 16,
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    router.push({ pathname: '/product', params: { id: item.id } })
                  }
                >
                  <Image
                    source={{ uri: productImg }}
                    style={{
                      width: '100%',
                      height: 180,
                      borderRadius: 8,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      marginTop: 8,
                    }}
                  >
                    {item.pathName?.slice(0, 30)}
                  </Text>
                  <Text style={{ fontSize: 12, marginTop: 4 }}>
                    {item.name.slice(0, 40)}
                    {item.name.length > 40 ? '...' : ''}
                  </Text>
                </TouchableOpacity>

                <Text style={{ marginTop: 4 }}>{price} so'm</Text>

                {item.quantity !== undefined && (
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 12,
                      color: '#333',
                    }}
                  >
                    Sotuvda bor: {item.quantity} dona
                  </Text>
                )}

                <TouchableOpacity
                  onPress={() =>
                    buyProduct(productImg, item.name, item.code, price, item.id)
                  }
                  style={{
                    marginTop: 8,
                    padding: 10,
                    backgroundColor: '#f0c040',
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#000' }}>
                    Savatga qo‘shish
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}

        {filteredData.length > itemsPerPage && (
          <Pagination
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </View>
      <Footer />
      <Toast />
    </ScrollView>
  );
}
