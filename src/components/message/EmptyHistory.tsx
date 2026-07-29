import React from "react"
import { Text, View } from "react-native"
import { globalStyles } from "../../presentation/themes/theme"

export const EmptyHistory: React.FC = () => {
  return (
    <View style={globalStyles.messageHistContainer}>
        <Text style={globalStyles.messageHistIcon}>
        💬
        </Text>

        <Text style={globalStyles.messageHistTitle}>
        Todavía no enviaste mensajes
        </Text>

        <Text style={globalStyles.messageHistPlaceholder}>
        Los mensajes enviados durante esta sesión aparecerán aquí.
        </Text>

        <Text style={globalStyles.messageSubTitle}>Esta función estará disponible en futuras actualizaciones</Text> 
    </View>
  )
}