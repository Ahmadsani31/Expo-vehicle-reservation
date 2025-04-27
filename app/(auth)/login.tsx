// import Button from "@/components/Button";
import ButtonCostum from "@/components/ButtonCostum";
import Input from "@/components/Input";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Modal from 'react-native-modal';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Entypo } from "@expo/vector-icons";
import SafeAreaView from "@/components/SafeAreaView";

const validationSchema = yup.object().shape({
    username: yup.string().required('Username harus diisi'),
    password: yup.string().min(6, 'Minimal 6 karakter').required('Password harus diisi'),
});


export default function RegisterScreen() {
    const { login, isLoading } = useAuth();

    const router = useRouter();

    const [isVisible, setIsVisible] = useState(false);


    const [showPassword, setShowPassword] = useState(true);

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validationSchema,
        onSubmit: async (values) => {
            const username = values.username;
            const password = values.password;
            await login({ username, password });
        },
    });

    const openBottomSheet = () => {
        setIsVisible(true);
    };


    return (
        <SafeAreaView className='flex-1 p-3 justify-center'>
            <View className="absolute -z-10 bg-teal-500 h-80 w-80 top-0 left-0 rounded-full shadow-lg -translate-x-32 -translate-y-32" />
            <View className="absolute -z-10 bg-teal-500 h-80 w-80 top-0 right-0 rounded-full shadow-lg translate-x-36 translate-y-12" />
            <Text className="text-2xl font-bold text-center mb-4">
                Login Screen
            </Text>
            <View className="top-safe-or-80 justify-center flex-row gap-2">
                <TouchableOpacity className="flex-1 bg-indigo-500 py-3 px-4 rounded-lg items-center" onPress={openBottomSheet}>
                    <Text className="text-white font-bold">Login</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 bg-amber-500 py-3 px-4 rounded-lg items-center" onPress={() => router.push('/(auth)/register')}>
                    <Text className="text-white font-bold">Register</Text>
                </TouchableOpacity>
            </View>
            <Modal isVisible={isVisible} animationIn={'slideInUp'} animationOut={'slideOutDown'} style={{ margin: 0 }} animationInTiming={1000} animationOutTiming={1000} onBackdropPress={() => setIsVisible(!isVisible)}
                onBackButtonPress={() => setIsVisible(!isVisible)}>

                <View className="flex-1 justify-end bg-black/50">
                    <View className="items-center justify-center bottom-14 rounded-md">
                        <Image className="rounded-xl" source={require('../../assets/images/logo/login.png')}
                            style={{ width: 200, height: 200 }} />
                    </View>
                    <View className="bg-white p-5 shadow-lg rounded-tr-[25] opacity-100 rounded-tl-[25] border-radix-blue-500">


                        <Text className="font-bold text-center text-5xl m-5">Log-In</Text>
                        <Input
                            label="Username"
                            placeholder="Enter your username"
                            value={formik.values.username}
                            onChangeText={formik.handleChange('username')}
                            error={formik.touched.username ? formik.errors.username : undefined}
                            className='bg-gray-200'
                        />


                        <View className='relative'>
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                value={formik.values.password}
                                onChangeText={formik.handleChange('password')}
                                secureTextEntry={showPassword}
                                error={formik.touched.password ? formik.errors.password : undefined}
                                className='bg-gray-200'
                            />
                            <TouchableOpacity className='absolute top-10 right-3' onPress={() => setShowPassword(!showPassword)}>
                                {showPassword ? <Entypo name='eye-with-line' size={26} /> : <Entypo name='eye' size={26} />}
                            </TouchableOpacity>
                        </View>
                        <View>
                            <ButtonCostum
                                classname="bg-indigo-500"
                                title="Login"
                                onPress={formik.handleSubmit}
                                loading={isLoading}
                                variant="primary"
                            />
                            <ButtonCostum classname="bg-red-500" title="Close" onPress={() => setIsVisible(!isVisible)} />
                        </View>

                    </View>

                </View>
            </Modal>
            <View className="absolute bg-teal-500 h-60 w-60 bottom-1/4 -z-10 left-0 rounded-full shadow-lg -translate-x-16 translate-y-20" />
            <View className="absolute -z-10 bg-teal-500 h-40 w-40 bottom-0 right-0 rounded-full shadow-lg translate-x-16 translate-y-20" />
        </SafeAreaView>
    );
}


