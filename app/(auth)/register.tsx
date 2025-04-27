// import Button from "@/components/Button";
import Button from "@/components/ButtonCostum";
import Input from "@/components/Input";
import SafeAreaView from "@/components/SafeAreaView";
import { useAuth } from "@/context/authContext";
import { Feather } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Image, Modal, Text, TouchableOpacity, View } from "react-native";

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register, isLoading } = useAuth();

    const [showPassword, setShowPassword] = useState(true);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            setError('Please fill all fields');
            return;
        }
        setError('');
        try {
            // await register(name, email, password,password);
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <SafeAreaView className='flex-1 p-5 justify-center'>
            <View className="absolute bg-teal-500 h-80 w-80 top-0 left-0 rounded-full shadow-lg -translate-x-52 -translate-y-52" />
            <View className="absolute bg-teal-500 h-80 w-80 top-0 right-0 rounded-full shadow-lg translate-x-36 translate-y-12" />
            <View className=" bg-white p-6 rounded-xl z-10">
                <Text className="text-3xl font-bold text-gray-800 mb-8 text-center">Create Account</Text>

                {/* {error && <Text className="text-red-500 mb-4">{error}</Text>} */}

                <Input
                    label="Full Name"
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    error={error && !name ? 'Name is required' : undefined}
                    className='bg-gray-200'
                />

                <Input
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    error={error && !email ? 'Email is required' : undefined}
                    className='bg-gray-200'
                />

                <Input
                    label="Username"
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={setUsername}
                    error={error && !username ? 'Username is required' : undefined}
                    className='bg-gray-200'
                />
                <View className='relative'>
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={showPassword}
                        error={error && !password ? 'Password is required' : undefined}
                        className='bg-gray-200'
                    />
                    <TouchableOpacity className='absolute top-11 right-3' onPress={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Feather name='eye-off' size={24} /> : <Feather name='eye' size={24} />}
                    </TouchableOpacity>
                </View>

                <Button
                classname="bg-indigo-500"
                    title="Register"
                    onPress={handleRegister}
                    loading={isLoading}
                    variant="primary"
                />

                <View className="flex-row justify-center mt-4">
                    <Text className="text-gray-600">Already have an account?  </Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text className="text-blue-500 font-medium">Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="absolute bg-teal-500 h-40 w-40 bottom-0 left-0 rounded-full shadow-lg translate-x-16 translate-y-20" />
        </SafeAreaView>
    );
}


