import { Image, Text, View } from "react-native"
import { globalStyles } from "../../themes/theme"

export const SplashScreen = () => {
  return (
    <View style={globalStyles.splashScreenContainer}>
            <Image
            source={require('../../../assets/splash_2.jpg')}
            style={globalStyles.splashImage}
            />
       <Text style={globalStyles.splashTextDev}>developed by sergioortegadev</Text>
    </View>
  )
}