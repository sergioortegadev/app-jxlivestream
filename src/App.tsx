import { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AppStack } from "./presentation/navigation/StackNavigation"
import { usePlayerStore, useUiConfig } from "./hooks/usePlayerStore"
import { AdapterFactory } from "./adapters/AdapterFactory"
import { SplashScreen } from "./presentation/screens/splash/SplashScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import SplashScreenNative from 'react-native-splash-screen';

// Switch a RTMP - hot changes
/*
const rtmpAdapter = AdapterFactory.createAdapter('rtmp');
usePlayerStore.getState().setAdapter(rtmpAdapter);
*/

// Switch a HTTP - hot changes
const httpAdapter = AdapterFactory.createAdapter('http');
usePlayerStore.getState().setAdapter(httpAdapter);

export const App: React.FC = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    usePlayerStore.getState().initializeStream();
    useUiConfig.getState().initializeUiConfig();

    SplashScreenNative.hide();

    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);

  }, [])

  if (isShowSplash) {
    return <SplashScreen />
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}