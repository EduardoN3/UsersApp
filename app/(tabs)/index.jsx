import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://44.202.157.173/users/')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error al obtener los usuarios: ', error));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1976D2" />
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Usuarios</Text>
      </View>

      <FlatList
        data={users}
        contentContainerStyle={styles.listContent}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.text}>Nombre: {item.name}</Text>
            <Text style={styles.text}>Email: {item.email}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay usuarios disponibles</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  header: {
    backgroundColor: '#1976D2',
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    width: '100%', // Ancho fijo para mejor centrado
    marginBottom: 15,
    padding: 18,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0D47A1',
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#757575',
  },
});