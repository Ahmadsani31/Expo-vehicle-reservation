import { Alert, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { MaterialIcons, AntDesign, Fontisto, Entypo } from '@expo/vector-icons';
import { Text as TextElement, Card, Divider, Icon } from '@rneui/themed';
import DateTimePicker, { DateType, useDefaultClassNames } from 'react-native-ui-datepicker';
import { useCallback, useRef, useState } from 'react';

import dayjs from 'dayjs';
import BarcodeScanner from '@/components/BarcodeScanner';
import Modal from 'react-native-modal';
import { router } from 'expo-router';
export default function HomeScreen() {

  const today = dayjs();
  const defaultClassNames  = useDefaultClassNames();
  const [selected, setSelected] = useState<DateType>();
  const [dateInput, setDateInput] = useState<string | undefined>();

  const [camera, setCamera] = useState(false);

  //Handle modal Date
  const [visibleModalDate, setVisibleModalDate] = useState(false);

  const toggleChangeDate = (date: DateType) => {

    const formattedDate = dayjs(date).format('dddd, DD MMMM YYYY');

    setDateInput(formattedDate);

    setSelected(date);
    setVisibleModalDate(false);
  };

  //Handle modal Image
  const [visibleModalImage, setVisibleModalImage] = useState(false);
  const [modalTextImage, setModalTextImage] = useState<String>("");

  const toggleShowModalImage = (text: String) => {

    setVisibleModalImage(true);
    setModalTextImage(text);
  };


  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
    setCamera(false);

  }, []);
  const handleSnapPress = useCallback(() => {
    setCamera(true);
    bottomSheetRef.current?.expand();
  }, []);


  const toggleResetDate = () => {

    setDateInput(undefined)
    setSelected(today);
  };

  const handleScan = (data: string) => {
    console.log('Scanned data:', data);
    setCamera(false);
    bottomSheetRef.current?.close();
    router.push({
      pathname: '/(protected)/kendaraan/detail',
      params: { data: data },
    });
    // toast.success('Barcode Scan Success')
    // Alert.alert('Scan Success', `Scanned data: ${data}`, [
    //   { text: 'OK', onPress: () => console.log('OK Pressed') },
    // ]);
  };

  return (
    <>
      <View className="flex-1 bg-slate-300" >
      <View className='absolute w-full bg-teal-500 font-light h-44 rounded-br-[50] rounded-bl-[50]  pb-10 shadow-lg' />
        <View className='p-2'>

          <View className='p-3'>
            <Text className="text-2xl font-bold text-center mb-4 text-white">Scan Barcode Here</Text>
            <TouchableOpacity onPress={() => handleSnapPress()}
              className="flex-row items-center justify-center bg-indigo-700 py-3 px-6 rounded-lg"
            >
              <MaterialIcons name="qr-code-scanner" size={24} color="white" />
              <Text className="text-white font-bold ml-2">Scan Barcode</Text>
            </TouchableOpacity>
          </View>

        </View>
        {/* Input date picker **/}
        <View className='mt-5 mb-1'>
          <TouchableOpacity onPress={() => setVisibleModalDate(true)} className='relative mx-5'>
            <Fontisto className='absolute z-10 left-3 top-2' name="date" size={24} color="black" />
            <TextInput className='border border-black bg-white rounded-lg ps-12' editable={false} placeholder='Choose date' value={dateInput} />
            {dateInput && <Entypo name='circle-with-cross' size={24} color='black' className='absolute right-2 top-2.5' onPress={() => toggleResetDate()} />}

          </TouchableOpacity>
        </View>
        <ScrollView>
          <Card containerStyle={{ borderRadius: 10 }}>
            <Card.Title>HELLO WORLD</Card.Title>
            <Pressable onPress={() => console.log('Pressed kiri')}
              className="flex-row bg-indigo-200 p-2 my-2 rounded-xl shadow-md active:scale-95 active:shadow-lg"
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
            </Pressable>
            <Pressable onPress={() => console.log('Pressed kiri')}
              className="flex-row bg-amber-200 p-2 my-2 rounded-xl shadow-md active:scale-95 active:shadow-lg"
            >
              <Image source={require('@/assets/images/car.png')} className='transform scale-x-[-1] w-24 h-24' />
              <View
                className="left-3 items-start justify-center">
                <Text className="font-bold ">Akhir</Text>
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
            </Pressable>
          </Card>
          <Card containerStyle={{ borderRadius: 10 }}>
            <Card.Title>HELLO WORLD</Card.Title>
            <Pressable onPress={() => toggleShowModalImage('Kanan')}
              className="flex-row bg-indigo-200 p-2 my-2 rounded-xl shadow-md active:scale-95 active:shadow-lg"
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
            </Pressable>
            <Pressable onPress={() => toggleShowModalImage('Kiri')}
              className="flex-row bg-amber-200 p-2 my-2 rounded-xl shadow-md active:scale-95 active:shadow-lg"
            >
              <Image source={require('@/assets/images/car.png')} className='transform scale-x-[-1] w-24 h-24' />
              <View
                className="left-3 items-start justify-center">
                <Text className="font-bold ">Akhir</Text>
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
            </Pressable>
          </Card>
        </ScrollView>

        {/* Modal Dialog Date */}
        <Modal
          isVisible={visibleModalDate}
          animationIn="fadeInDownBig"
          animationOut="fadeOutDownBig"
          animationInTiming={1000} animationOutTiming={1000}
          onBackdropPress={() => setVisibleModalDate(!visibleModalDate)}
          onBackButtonPress={() => setVisibleModalDate(!visibleModalDate)}
        >
          <View className='items-center bg-slate-100 rounded-lg p-5'>
            <Text className='text-3xl font-bold'>Calender</Text>
            <Divider color='#000' width={1} style={{ width: "100%", margin: 10 }} />
            <DateTimePicker
            className='border border-black rounded-md bg-white'
              mode="single"
              date={selected}
              onChange={({ date }) => toggleChangeDate(date)}
              classNames={{
                ...defaultClassNames,
                today: 'border-teal-500 border', // Add a border to today's date
                selected: 'bg-teal-500 border border-teal-500', // Highlight the selected day
                selected_label: "text-white", // Highlight the selected day label
                day: `${defaultClassNames.day} hover:bg-amber-100`, // Change background color on hover
                disabled: 'bg-gray-100', // Make disabled dates appear more faded
                button_next:'border bg-teal-500',
                button_prev:'border bg-teal-500',
                outside_label:'text-gray-300'
              }}
              showOutsideDays
              weekdaysFormat='short'
            />
          </View>

        </Modal>
        {/* Dialog Image */}
        <Modal
          isVisible={visibleModalImage}
          animationIn="fadeInDownBig"
          animationOut="fadeOutDownBig"
          animationInTiming={1000} animationOutTiming={1000}
          onBackdropPress={() => setVisibleModalImage(!visibleModalImage)}
        >
          <View className='items-center bg-white rounded-lg p-5'>
            <Text>{modalTextImage}</Text>
          </View>

        </Modal>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['100%']}
        index={-1}
        enablePanDownToClose={true}
      >
        <BottomSheetView className='flex-1 items-center bg-slate-300 justify-center'>
          {camera && <BarcodeScanner
            onScan={handleScan}
            onClose={() => handleClosePress()}
          />}

        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

