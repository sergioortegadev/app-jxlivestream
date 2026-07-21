/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeSreen } from "../screens/home/HomeScreen";
import { PlayerScreen } from "../screens/player/PlayerScreen";
import { RadioPageWV } from "../screens/radioPageWV/RadioPageWV";
import { Platform } from "react-native";
import { colors } from "../themes/theme";
import { Icon } from "../../components/Icon";

const Tab = createBottomTabNavigator();

export const AppBottomTabs = () => {

    return (
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
            sceneStyle: {
                backgroundColor: '#fc5',
            },
            headerStyle: {
                backgroundColor: '#ffc',
            },
            tabBarStyle: {
                marginBottom: Platform.OS === 'android' ? 50 : 0,
                height: 20,
                paddingBottom: Platform.OS === 'android' ? 50 : 60,
            },
            tabBarShowLabel: false,
            /* tabBarLabelStyle: {
                marginTop: 5,
                padding: 8,
                backgroundColor: colors.background,
                borderRadius: 8,
            }, */
            tabBarIconStyle: {
                marginTop: 10,
                marginBottom: 5,
            },
            tabBarActiveBackgroundColor: colors.main,
            tabBarInactiveBackgroundColor: colors.background,
            tabBarActiveTintColor: colors.main,
            }}
        >
            <Tab.Screen name='Home' component={HomeSreen} 
            options={{
                title: 'Home',
                tabBarIcon: ({ color, size }) => <Icon name='home-outline' color={color} size={size} />,
                sceneStyle:{ backgroundColor: colors.background}
            }}/>
            <Tab.Screen name='Player' component={PlayerScreen} 
            options={{
                title: 'Play',
                tabBarIcon: ({ color, size }) => <Icon name='play-outline' color={color} size={size} />,
                sceneStyle:{ backgroundColor: colors.background}
            }}/>
            <Tab.Screen name='RadioPageWV' component={RadioPageWV} 
            options={{
                title: 'Radio',
                tabBarIcon: ({ color, size }) => <Icon name='desktop-outline' color={color} size={size} />,
                sceneStyle:{ backgroundColor: colors.background}
            }}/>
        </Tab.Navigator>
    )
}