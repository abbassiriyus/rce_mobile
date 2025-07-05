import { Stack } from 'expo-router';


import { CartProvider } from '../host/CartContext'; // yo‘lingizni tekshiring
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </CartProvider>
  );
}