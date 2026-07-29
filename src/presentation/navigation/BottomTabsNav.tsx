/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeSreen } from "../screens/home/HomeScreen";
import { PlayerScreen } from "../screens/player/PlayerScreen";
import { RadioPageWV } from "../screens/radioPageWV/RadioPageWV";
import { Platform } from "react-native";
import { colors } from "../themes/theme";
import { Icon } from "../../components/Icon";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { MessageScreen } from "../screens/message/MessageScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export const AppBottomTabs = () => {
    const insets = useSafeAreaInsets();

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
                backgroundColor: colors.background,
                height: insets.bottom,
                paddingBottom: Platform.OS === 'ios' ? 30 + insets.bottom : 45 + insets.bottom,
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
            <Tab.Screen name='Message' component={MessageScreen} 
            options={{
                title: 'Message',
                tabBarIcon: ({ color, size }) => <Icon name='mail-outline' color={color} size={size} />,
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
            <Tab.Screen name='Profile' component={ProfileScreen} 
            options={{
                title: 'Profile',
                tabBarIcon: ({ color, size }) => <Icon name='person-outline' color={color} size={size} />,
                sceneStyle:{ backgroundColor: colors.background}
            }}/>
        </Tab.Navigator>
    )
}