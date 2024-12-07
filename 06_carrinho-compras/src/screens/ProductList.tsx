import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useCartContext } from "../contexts/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: Rating;
}
interface Rating {
  rate: number;
  count: number;
}
//interface para cada produto. Utilizado depois ao renderizar cada um com a function renderItem

const ProductList: React.FC<{ navigation: any }> = ({ navigation }) => {
  //alterei para poder fazer a transição de telas.
  const baseUrl = "https://fakestoreapi.com/products/"; //link para consumir a API
  const [products, setProducts] = useState<Product[]>([]); //constam os itens da lista da api
  const [loading, setLoading] = useState(true); //só um negócio que aprendi para gerenciar o carregamento dos dados.
  const { addProduct } = useCartContext(); // Importando a função addProduct pra colocar no carrinho direto.

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(baseUrl);
        const data = await response.json(); //consome a api e transforma em um json utilizável.
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const onPressProduct = (id: Number) => {
    navigation.navigate("Details", { id }); //function que envia o produto referente para preencher ProductDetails.
  };
  const renderItem = (
    { item }: { item: Product } //card para cada item
  ) => (
    <TouchableOpacity
      onPress={() => onPressProduct(item.id)}
      style={styles.card}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image} // Aplicando estilos à imagem
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>R${item.price}</Text>
      <Button
        title="+1 Carrinho"
        onPress={
          () /*mesma função utilizada no ProductDetails, envia diretamente o produto ao carrinho*/ =>
            addProduct(item)
        }
      />
    </TouchableOpacity>
  );

  if (loading) {
    //Aqui posso ter certeza que tudo foi carregado
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          alignItems: "center", // Centraliza os itens da lista
          paddingBottom: 20,
        }}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  card: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    minWidth: 500,
    height: 320,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    flexShrink: 1, // Evita que o texto quebre o layout ao ser longo
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginVertical: 5,
  },
  image: {
    width: "80%", // Largura fixa para as imagens
    height: 150, // Altura fixa para manter a uniformidade
    resizeMode: "contain", // Ajusta a imagem sem cortá-la
  },
});
