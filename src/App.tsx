import { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AppStack } from "./presentation/navigation/StackNavigation"
import { usePlayerStore } from "./hooks/usePlayerStore"

export const App: React.FC = () => {
  useEffect(() => {
    usePlayerStore.getState().initializeStream();
  }, [])

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  )
}