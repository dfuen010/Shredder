import React, {  useState } from "react";
import { View, Text, Image, ViewStyle } from "react-native";
import CustomInput from "../Components/CustomInput";

const SignInScreen = () => { 
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    return (
        <View>
            <Text>
                Shredder
            </Text>

            <CustomInput 
            value={email }
            setValue = {setEmail}
            placeholder={"Email Adress"}
            ></CustomInput>

            <CustomInput 
            value={password }
            setValue = {setPassword}
            placeholder={"Password"}
            ></CustomInput>

        </View>
    )

}


export default SignInScreen