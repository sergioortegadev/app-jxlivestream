import { NavigationContainer } from "@react-navigation/native"
import { AppStack } from "./presentation/navigation/StackNavigation"

export const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  )
}