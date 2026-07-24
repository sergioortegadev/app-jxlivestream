import React from "react"
import { ImageBackground, Text, View } from "react-native"
import { useUiConfig } from "../../../store/playerStore"
import { globalStyles } from "../../themes/theme";

export const HomeSreen: React.FC  = () => {

  const title = useUiConfig((state) => state.title)
  const subtitle = useUiConfig((state) => state.subtitle)
  const description = useUiConfig((state) => state.description)

  return (
    <View style={globalStyles.homeScreen}>
      <ImageBackground
        source={require("../../../assets/init.jpg")}
        resizeMode="cover"
        style={globalStyles.homeBackgroundImage}
      />

      <View style={globalStyles.homeOverlay} />

      <View style={globalStyles.homeContent}>
        <Text style={globalStyles.homeTitle}>{title}</Text>
        <Text style={globalStyles.homeSubtitle}>{subtitle}</Text>
        <Text style={globalStyles.homeDescription}>{description}</Text>
        <Text style={globalStyles.homeSmallText}>Esta app se encuentra en fase beta, muchas características se irán sumando próximamente</Text>
      </View>
    </View>
  )
};