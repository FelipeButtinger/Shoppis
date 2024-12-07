import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useCartContext } from "../contexts/CartContext";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

const ProductDetails = ({ route }: { route: any }) => {
  const { id } = route.params;
  const baseUrl = "https://fakestoreapi.com/products/";
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addProduct } = useCartContext();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!product) {
    return <Text>Produto não encontrado.</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>R${product.price}</Text>
      <Text>{product.description}</Text>
      <Button
        title="Adicionar ao Carrinho"
        onPress={() => addProduct(product)}
      />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    color: "#888",
  },
});
