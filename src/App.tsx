import { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AppStack } from "./presentation/navigation/StackNavigation"
import { usePlayerStore } from "./hooks/usePlayerStore"
import { AdapterFactory } from "./adapters/AdapterFactory"

// Switch a RTMP - hot changes
/*
const rtmpAdapter = AdapterFactory.createAdapter('rtmp');
usePlayerStore.getState().setAdapter(rtmpAdapter);
*/

// Switch a HTTP - hot changes
const httpAdapter = AdapterFactory.createAdapter('http');
usePlayerStore.getState().setAdapter(httpAdapter);

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