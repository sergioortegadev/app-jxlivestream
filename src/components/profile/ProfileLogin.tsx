import React, { useState } from "react"
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import { globalStyles } from "../../presentation/themes/theme";

interface Props {

}

export const ProfileLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
    
        if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);

    setTimeout(() => {
        Alert.alert('Pronto', 'El login estará disponible en futuras actualizaciones');
        setLoading(false);
        setUsername('');
        setPassword('');
    }, 1000);
    };

  return (
     <View style={globalStyles.profileContainer}>
      <Text style={globalStyles.title}>Inicia Sesión</Text>

      <TextInput
        style={globalStyles.profileInput}
        placeholder="Usuario"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
        editable={!loading}
      />

      <TextInput
        style={globalStyles.profileInput}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        editable={!loading}
      />

      <TouchableOpacity
        style={[globalStyles.profileButton, loading && globalStyles.profileButtonDisabled]}
        onPress={handleLogin}
        disabled={loading}
        activeOpacity={0.7}
      >
        <Text style={globalStyles.profileButtonText}>
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}