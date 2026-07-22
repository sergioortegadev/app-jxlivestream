import { ActivityIndicator, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { globalStyles } from "../../themes/theme";

interface Props {

}

export const RadioPageWV = ({}: Props) => {
  return (
    <SafeAreaView 
    style={globalStyles.containerFlex}
    edges={['top']}
    >
      <WebView
      javaScriptEnabled
      startInLoadingState
      renderLoading={() => (
          <ActivityIndicator size="large" />
      )}
      source={{ uri: 'https://back-jxlivestream.onrender.com/home.html' }}
      onMessage={(event) => {
        console.log(event.nativeEvent.data);
      }}
      renderError={(errorName) => (
        <Text>Error al cargar WebView: {errorName}</Text>
      )}
      />
    </SafeAreaView>
  )
}