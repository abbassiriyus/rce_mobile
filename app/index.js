// HomeScreen.js (React Native)
import { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Navbar1 from '../components/Navbar.jsx';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import WebView from 'react-native-webview';
import Footer from '../components/Footer';
import SliderProduct from '../components/SliderProduct.jsx';

const { width } = Dimensions.get('window');
const url = 'https://api.rce.uz';

// Rasmlarni import qilish (eski uslubda, `require` o‘rniga `import`)
import new_1 from '../assets/images/new_1.png';
import new_2 from '../assets/images/new_2.png';
import new_3 from '../assets/images/new_3.png';

export default function HomeScreen({ navigation }) {
  const [product, setProduct] = useState([]);
  const [headerImage, setHeaderImage] = useState([]);
  const [homiy, setHomiy] = useState([]);
  const [categoryHeader, setCategoryHeader] = useState([]);
  const [topTovar, setTopTovar] = useState([]);
  const [topTovar_1, setTopTovar_1] = useState('');
  const [mashxur, setMashxur] = useState([]);
  const [mashxur_1, setMashxur_1] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    axios.get(`${url}/api/product?limit=10`).then(res => {
      setProduct(res.data);

      axios.get(`${url}/api/carousel`).then(res1 => {
        setHeaderImage(res1.data);

        axios.get(`${url}/api/homiy`).then(res2 => {
          setHomiy(res2.data);
        });
      });

      axios.get(`${url}/api/best_seller`).then(res3 => {
        if (res3.data.length > 0) {
          const categoryId = res3.data[0].category_id;
          setMashxur_1(categoryId);

          axios.get(`${url}/api/category/product/${categoryId}?limit=10`).then(res4 => {
            setMashxur(res4.data);

            axios.get(`${url}/api/top_tovar`).then(res5 => {
              if (res5.data.length > 0) {
                const topTovarCategory = res5.data[0].category_id;
                setTopTovar_1(topTovarCategory);

                axios.get(`${url}/api/category/product/${topTovarCategory}?limit=10`).then(res6 => {
                  setTopTovar(res6.data);

                  axios.get(`${url}/api/document`).then(res7 => {
                    if (res7.data.length > 0) {
                      setLink(res7.data[0].image);
                    }
                  });
                });
              }
            });
          });
        }
      });
    });

    axios.get(`${url}/api/header_category`).then(res => {
      setCategoryHeader(res.data);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Navbar1 navigation={navigation} />

      {/* Carousel */}
      <Swiper autoplay height={120}>
        {headerImage.map((item, index) => (
          <TouchableOpacity key={index}>
            <Image
              source={{ uri: item.image }}
              style={styles.carouselImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </Swiper>

      {/* Reklama */}
      <TouchableOpacity style={styles.reklama} onPress={() => Linking.openURL(link)}>
        <Text style={styles.reklamaText}>HOZIR MUROJAT QILING</Text>
      </TouchableOpacity>

      {/* Mahsulotlar */}
      <SliderProduct
        mapdata={product}
        id={0}
        data={{
          title: 'Top sotuvlar',
          h1: 'Eng mashhur mahsulotlar',
          p: 'Bizning mijozlarimiz tanlovi',
        }}
      />

      <SliderProduct
        mapdata={mashxur}
        id={mashxur_1}
        data={{
          title: 'Eng yaxshi takliflar',
          h1: 'Foydali taklif',
          p: 'Ajoyib takliflar va maxsus narxlar haqida bilib oling. Faqat shu oy!',
        }}
      />

      <SliderProduct
        mapdata={topTovar}
        id={topTovar_1}
        data={{
          title: 'Mashhur',
          h1: "Birinchi bo'lib xarid qiling",
          p: "Yuqori talabga ega bo'lgan yangi mahsulotlar",
        }}
      />

      {/* Kategoriya */}
      {categoryHeader.length >= 7 && (
        <View style={styles.categoryGrid}>
          {categoryHeader.slice(0, 7).map((cat, index) => (
            <View style={styles.categoryItem} key={index}>
              <Image source={{ uri: cat.image }} style={styles.categoryImage} />
              <Text style={styles.categoryTitle}>{cat.category_title}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Homiylar */}
      <Text style={styles.sectionTitle}>Homiylar</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.homiyScroll}>
        {homiy.map((item, index) => (
          <Image
            key={index}
            source={{ uri: item.image }}
            style={styles.homiyImage}
            resizeMode="contain"
          />
        ))}
      </ScrollView>

      {/* Video */}
      <Text style={styles.sectionTitle}>Video qo'llanmalar</Text>
      <View style={{ height: 200 }}>
        <WebView
          source={{ uri: 'https://www.youtube.com/embed/3YfZcNUhBKY' }}
          javaScriptEnabled
          domStorageEnabled
        />
      </View>

      {/* Yangiliklar */}
      <Text style={styles.sectionTitle}>Yangiliklar</Text>
      <View style={styles.newsBlock}>
        <Image style={styles.newsImage} source={new_1} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16 }}>10ta xarid uchun +2ta mahsulot</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>(17.06.2024)</Text>
        </View>
      </View>

      <View style={styles.newsBlock}>
        <Image style={styles.newsImage} source={new_2} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16 }}>10ta xarid uchun +2ta mahsulot</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>(17.06.2024)</Text>
        </View>
      </View>

      <View style={styles.newsBlock}>
        <Image style={styles.newsImage} source={new_3} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16 }}>10ta xarid uchun +2ta mahsulot</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>(17.06.2024)</Text>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselImage: {
    width: '100%',
    height: 120,
  },
  reklama: {
    backgroundColor: '#0E415A',
    padding: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  reklamaText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  categoryItem: {
    width: width / 2.3,
    marginBottom: 20,
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: 100,
  },
  categoryTitle: {
    marginTop: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    marginLeft: 10,
  },
  homiyScroll: {
    paddingHorizontal: 10,
  },
  homiyImage: {
    width: 100,
    height: 80,
    marginRight: 10,
  },
  newsBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  newsImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
});
