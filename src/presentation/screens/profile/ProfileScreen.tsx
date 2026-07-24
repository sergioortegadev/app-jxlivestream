import React from "react"
import { Text, View } from "react-native"
import { globalStyles } from "../../themes/theme"
import { ProfileLogin } from "../../../components/profile/ProfileLogin"

interface Props {
    userId?: string,
}

export const ProfileScreen: React.FC<Props> = (userId) => {
  return (
    /* Mensaje "Próximamente" */
    <View style={globalStyles.mainContainerCentered}>
      <View style={globalStyles.profileNoticeCard}>
        <Text style={globalStyles.profileNoticeIcon}>🚀</Text>        
        <Text style={globalStyles.profileNoticeText}>El perfil aún no está disponible</Text>        
        <Text style={globalStyles.profileNoticeSubText}>Estamos trabajando para una futura actualización, pronto podrás tener todas tus preferencias aquí.</Text>

        {/* From de login desabilitado temporalmente */}
      </View>
        <ProfileLogin />
        
    </View>
  )
}