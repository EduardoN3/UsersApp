import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, TextInput, TouchableOpacity, Alert, Button } from 'react-native';

export default function App() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }

    fetch('http://44.202.157.173/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }
      return response.json();
    })
    .then(data => {
      setToken(data.access_token);
      setIsLoggedIn(true);
      fetchUsers(data.access_token);
      // Limpiar campos después de login exitoso
      setEmail('');
      setPassword('');
    })
    .catch(error => {
      Alert.alert('Error', error.message || 'Ocurrió un error al iniciar sesión');
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
    setUsers([]);
  };

  const fetchUsers = (authToken) => {
    fetch('http://44.202.157.173/users/', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error al obtener los usuarios: ', error));
  };

  const renderLoginForm = () => (
    <View style={styles.loginContainer}>
      <Text style={styles.loginTitle}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderUserList = () => (
    <View style={styles.listContainer}>
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1976D2" />
      <View style={styles.header}>
        <Text style={styles.title}>{isLoggedIn ? 'Lista de Usuarios' : 'Inicio de Sesión'}</Text>
      </View>

      {!isLoggedIn ? renderLoginForm() : renderUserList()}
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
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
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
  loginContainer: {
    padding: 20,
    marginTop: 20,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0D47A1',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#BBDEFB',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  loginButton: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#ff327c',
    padding: 10,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});