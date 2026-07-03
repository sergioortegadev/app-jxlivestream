import Ionicons from "@react-native-vector-icons/ionicons"
import { View } from "react-native"

type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

interface Props {
    name: IoniconName,
    size?: number,
    color?: string,
}

export const Icon = ({name, size = 25, color='#000'}: Props) => {
  return (
    <View>
        <Ionicons name={name} size={size} color={color} />
    </View>
  )
}