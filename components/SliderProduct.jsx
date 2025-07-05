import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function IndexSlider({ color, data, mapdata = [], id }) {
  const navigation = useNavigation();

  const handleGoCatalog = () => {
    navigation.navigate('catalog', {
      id,
      title: data?.title,
    });
  };

  const handleProduct = (itemId) => {
    navigation.navigate('product', { id: itemId });
  };

  // Mahsulotlarni 2tadan bo‘lib olish
  const chunked = [];
  for (let i = 0; i < mapdata.length; i += 2) {
    chunked.push(mapdata.slice(i, i + 2));
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.sectionTitle}>{data?.title}</Text>

      <Swiper
        showsPagination={true}
        loop={true}
        autoplay={true}
        autoplayTimeout={3}
        height={150}
      >
        {chunked.map((pair, idx) => (
          <View key={idx} style={styles.slide}>
            {pair.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={styles.card}
                onPress={() => handleProduct(item.id)}
              >
                <Image
                  source={{
                    uri: item.images?.rows[0]?.meta?.downloadHref
                      ? `https://api.rce.uz/api/getimage?url=${item.images.rows[0].meta.downloadHref}`
                      : 'https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg',
                  }}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.title} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.price}>
                  {item.salePrices?.[0]?.value / 100} so'm
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </Swiper>

      <TouchableOpacity style={styles.button} onPress={handleGoCatalog}>
        <Text style={styles.buttonText}>Tanlovga o'tish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const cardWidth = (width - 60) / 2;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1c1c1c',
  },
  slide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    width: cardWidth,
    borderRadius: 6,
    padding: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 80,
    marginBottom: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 12,
    color: '#E30613',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1c2d38',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
