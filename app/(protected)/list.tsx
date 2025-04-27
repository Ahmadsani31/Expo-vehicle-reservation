import { Image, ScrollView, StyleSheet, Text } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { View } from 'react-native';
import { Card } from '@rneui/base';
import { Pressable } from 'react-native';

export default function ListScreen() {
  return (
    <View className='flex-1 bg-slate-300'>
      <View className='absolute w-full bg-teal-500 h-44 rounded-br-[50] rounded-bl-[50]  pb-10 shadow-lg">' />
      <View className='p-3'>
        <Text className="text-2xl font-bold text-center text-white">List</Text>
      </View>
      <ScrollView>
        <Card containerStyle={{ borderRadius: 10 }}>
          <View
            className="flex-row bg-indigo-200 p-2 my-2 rounded-xl"
          >
            <Image source={require('@/assets/images/car.png')} className='w-24 h-24' />
            <View
              className="left-3 items-start justify-center">
              <Text className="font-bold ">Awal</Text>
              <Text className="text-sm">
                2020
              </Text>
              <Text className="text-sm">
                Jam Pagi
              </Text>
              <Text className="text-sm font-bold">
                Spidometer 100 Km
              </Text>
            </View>
          </View>


          <View
            className="flex-row bg-indigo-200 p-2 my-2 rounded-xl "
          >
            <Image source={require('@/assets/images/car.png')} className='w-24 h-24' />
            <View
              className="left-3 items-start justify-center">
              <Text className="font-bold ">Awal</Text>
              <Text className="text-sm">
                2020
              </Text>
              <Text className="text-sm">
                Jam Pagi
              </Text>
              <Text className="text-sm font-bold">
                Spidometer 100 Km
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
