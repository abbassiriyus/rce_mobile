import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  Linking,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { SvgUri } from 'react-native-svg';
import axios from 'axios';
import { useRouter } from 'expo-router';
import url from '../host/host';
import korzinkaIcon from '../assets/images/korzinka.png';

export default function Navbar1() {
  const router = useRouter();
  const [company, setCompany] = useState({});
  const [toggleMenu, setToggleMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [product, setProduct] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [categoryPage, setCategoryPage] = useState(false);

  useEffect(() => {
    axios.get(`${url}/api/company`).then(res => {
      if (res.data.length > 0) setCompany(res.data[0]);
    });
  }, []);

  const searchProduct = value => {
    setSearchKey(value);
    if (value.length > 0) {
      axios.get(`${url}/api/search?query=${value}`).then(res => {
        setProduct(res.data.rows);
      });
    } else {
      setProduct([]);
    }
  };

  const renderLogo = () => {
    if (!company.image) return null;

    if (company.image.endsWith('.svg')) {
      return <SvgUri uri={company.image} width={100} height={50} />;
    }

    return (
      <Image
        source={{ uri: company.image }}
        style={styles.logo}
        resizeMode="contain"
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')}>
          {renderLogo()}
        </TouchableOpacity>

        <View style={styles.rightControls}>
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <Image
              source={korzinkaIcon}
              width={50}
              height={50}
              style={styles.karzinkaIcon}
              resizeMode="contain"
            />
            {cartCount > 0 ? (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            ):(<View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>0</Text>
              </View>)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setToggleMenu(!toggleMenu)}>
            <Feather name="menu" size={26} />
          </TouchableOpacity>
        </View>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchBar}>
        <Entypo
          name="grid"
          size={22}
          color="#fff"
          onPress={() => setCategoryPage(!categoryPage)}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="2 000 000+ mahsulot"
          placeholderTextColor="#888"
          onChangeText={searchProduct}
          value={searchKey}
        />
      </View>

      {/* SEARCH RESULTS */}
      {searchKey.length > 0 && (
        <ScrollView style={styles.searchResults}>
          {product.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => router.push(`/product?id=${item.id}`)}
            >
              <Text style={styles.resultItem}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* MENU */}
      {toggleMenu && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.menuItem}>🏠 Bosh sahifa</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/about')}>
            <Text style={styles.menuItem}>ℹ️ Biz haqimizda</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/contact')}>
            <Text style={styles.menuItem}>📞 Aloqa</Text>
          </TouchableOpacity>

          {company.phone && (
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:+${company.phone}`)}
            >
              <Text style={styles.menuItem}>📲 Qo‘ng‘iroq qilish</Text>
            </TouchableOpacity>
          )}
          {company.email && (
            <TouchableOpacity
              onPress={() => Linking.openURL(`mailto:${company.email}`)}
            >
              <Text style={styles.menuItem}>✉️ Email yuborish</Text>
            </TouchableOpacity>
          )}
          {company.telegram && (
            <TouchableOpacity onPress={() => Linking.openURL(company.telegram)}>
              <Text style={styles.menuItem}>💬 Telegram</Text>
            </TouchableOpacity>
          )}
          {company.instagram && (
            <TouchableOpacity
              onPress={() => Linking.openURL(company.instagram)}
            >
              <Text style={styles.menuItem}>📷 Instagram</Text>
            </TouchableOpacity>
          )}
          {company.youtobe && (
            <TouchableOpacity onPress={() => Linking.openURL(company.youtobe)}>
              <Text style={styles.menuItem}>▶️ YouTube</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* KATALOG SECTION */}
      {categoryPage && (
        <View style={styles.katalogContainer}>
          <Text style={styles.katalogText}>📂 Katalog sahifasi</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 120,
    height: 50,
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  karzinkaIcon: {
    width: 28,
    height: 28,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#E91F25',
    borderRadius: 10,
    paddingHorizontal: 5,
    zIndex: 1,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#E91F25',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    fontSize: 14,
    height: 40,
  },
  searchResults: {
    maxHeight: 250,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  resultItem: {
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  menu: {
    backgroundColor: '#f8f8f8',
    marginTop: 10,
    padding: 10,
  },
  menuItem: {
    paddingVertical: 12,
    fontSize: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  katalogContainer: {
    backgroundColor: '#eee',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  katalogText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
