import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DetailScreen() {
    const param = useLocalSearchParams();
  return (
    <View className="flex-1 items-center justify-center bg-slate-300">
      <Text className="font-medium">Detail Screen</Text>
      <Text className="font-medium">{JSON.stringify(param,null,"")}</Text>
    </View>
  );
}