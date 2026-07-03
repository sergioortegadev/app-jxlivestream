import { createStackNavigator } from "@react-navigation/stack";
import { AppBottomTabs } from './BottomTabsNav';
import { DetailsScreen } from "../screens/details/DetailsScreen";

export type RootStackParamList = {
    AppBottomTabs: undefined,
    Details: { id: number }
}

const Stack = createStackNavigator<RootStackParamList>();

export const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }} >
            <Stack.Screen name="AppBottomTabs" component={AppBottomTabs} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    )
}