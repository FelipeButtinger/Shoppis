import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { showSuccess } from "../utils/Toast";

const CheckoutScreen = () => {
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  //cada hook é para capturar o que o usuário e preencher o que for necessário no card.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PAGAMENTO E ENTREGA</Text>

      <TextInput
        style={styles.input} //segue abaixo cada um dos inputs.
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Cidade"
          value={cidade}
          onChangeText={setCidade}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Estado"
          value={estado}
          onChangeText={setEstado}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Número do cartão"
        value={numeroCartao}
        onChangeText={setNumeroCartao}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nome no cartão"
        value={nomeCartao}
        onChangeText={setNomeCartao}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Data de validade"
          value={validade}
          onChangeText={setValidade}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardText}>VISA</Text>
          <Text style={styles.cardNumber}>
            {numeroCartao || "0000 0000 0000 0000"}
          </Text>
          <View style={styles.cardDetails}>
            <Text>{nomeCartao || "Nome do titular"}</Text>
            <Text>{validade || "MM/AA"}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          showSuccess("Pedido Finalizado, aguarde as informações de entrega")
        } //mostra o toast(deveria)
      >
        <Text style={styles.buttonText}>Finalizar pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  halfInput: { flex: 1, marginRight: 10 },
  cardContainer: { alignItems: "center", marginVertical: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    maxWidth: 300,
    alignItems: "center",
    elevation: 5,
  },
  cardText: { fontSize: 16, fontWeight: "bold" },
  cardNumber: { fontSize: 20, fontWeight: "bold", letterSpacing: 2 },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#4f98f0",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    maxWidth: 300,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default CheckoutScreen;
