import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const HomeSlider = ({ color = '#F3F4F6', data, mapdata = [], id }) => {
  const goToProduct = (productId) => {
    // Har bir mahsulotni ochish uchun navigatsiya (React Navigation bo‘lsa)
    console.log('Navigate to /oneproduct/' + productId);
  };

  const goToCategory = () => {
    console.log(`Navigate to /catalog/${id}?title=${data?.title}`);
  };

  return (
    <ScrollView style={{ backgroundColor: color }}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <Text style={styles.title}>{data?.title}</Text>
          <Swiper
            height={300}
            loop
            showsPagination={false}
            autoplay
            autoplayTimeout={3}
            showsButtons={true}
            buttonWrapperStyle={styles.buttonWrapper}
            nextButton={<Text style={styles.navBtn}>›</Text>}
            prevButton={<Text style={styles.navBtn}>‹</Text>}
          >
            {mapdata.map((item, index) => (
              <TouchableOpacity key={index} style={styles.card} onPress={() => goToProduct(item.id)}>
                <Image
                  style={styles.productImage}
                  source={{
                    uri: item?.images?.rows?.[0]?.meta?.downloadHref
                      ? `https://yourdomain.com/api/getimage?url=${item.images.rows[0].meta.downloadHref}`
                      : 'https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg'
                  }}
                  resizeMode="contain"
                />
                <Text style={styles.cardTitle}>{item.pathName?.slice(0, 20)}</Text>
                <Text style={styles.cardText}>{item.name?.slice(0, 40)}{item.name?.length > 30 ? '...' : ''}</Text>
                {(item.quantity || item.quantity === 0) ? null : (
                  <Text style={styles.quantity}>Sotuvda bor: {item.quantity} dona</Text>
                )}
                <Text style={styles.price}>{item.salePrices[0].value / 100} so‘m</Text>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.sectionTitle}>{data?.h1}</Text>
          <Text style={styles.sectionDesc}>{data?.p}</Text>
          <TouchableOpacity style={styles.button} onPress={goToCategory}>
            <Text style={styles.buttonText}>Tanlovga o'ting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeSlider;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'column',
    gap: 24,
  },
  leftSection: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    height: 280,
  },
  productImage: {
    width: width * 0.6,
    height: 120,
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    marginVertical: 6,
  },
  quantity: {
    fontSize: 12,
    color: '#E30613',
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  rightSection: {
    backgroundColor: '#fff',
    borderColor: '#1c2d388e',
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c2d38',
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 14,
    color: '#1c2d38',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1c2d38',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  navBtn: {
    fontSize: 36,
    color: '#000',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    top: '40%',
    left: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});
