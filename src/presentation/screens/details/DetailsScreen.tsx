import React from "react"
import { StackScreenProps } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { RootStackParamList } from "../../navigation/StackNavigation";

type Props = StackScreenProps<RootStackParamList, "Details">;

export const DetailsScreen: React.FC<Props>  = ({ route }) => {
  const { id } = route.params;

  return (
    <View>
        <Text>DetailsScreen</Text>
        <Text>DetailsScreen</Text>
        <Text>DetailsScreen</Text>
        <Text>DetailsScreen</Text>
        <Text>DetailsScreen</Text>
        <Text>DetailsScreen</Text>
        <Text>DetailsScreen, ID: {id}</Text>
    </View>
  )
}