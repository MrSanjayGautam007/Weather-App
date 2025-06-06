import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'
const SignUpScreen = () => {
    const navigation = useNavigation();
    const handleRegister = () => {
        navigation.navigate("Login");
    };
    const openTwitter = ()=>{
        navigation.navigate("Twitter");
    }
    return (
        <View style={styles.container}>
            {/* <Text>LoginScreen</Text> */}
            <View style={styles.topImageContainer}>
                {/* <Image source={require("../screen/assests/")} style={styles.topImage}/> */}
            </View>
            <View style={styles.helloContainer}>
                {/* <Text style={styles.helloText}>Hello</Text> */}
                <TouchableOpacity onPress={handleRegister}>
                    <Ionicons name={"chevron-back"} size={24} color="black" style={styles.backIcon}/>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop:20}}>
                <Text style={styles.createAccountText}>Create your account</Text>
            </View>
            <View style={styles.inputContainer}>
                <FontAwesome name={"user"} size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput placeholder='Username' style={styles.textInput} />

            </View>
            <View style={styles.inputContainer}>
                <Entypo name={"mail"} size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput placeholder='E-mail' style={styles.textInput} secureTextEntry={true} />

            </View>
            <View style={styles.inputContainer}>
                <FontAwesome5 name={"mobile"} size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput placeholder='Mobile' style={styles.textInput} secureTextEntry={true} />

            </View>
            <View style={styles.inputContainer}>
                <Fontisto name={"locked"} size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput placeholder='Password' style={styles.textInput} secureTextEntry={true} />

            </View>
            {/* <Text style={styles.textForgot}>Forgot your Password?</Text> */}
            <View style={styles.signInBtnContainer}>
                <Text style={styles.singInText}>Create</Text>
                <TouchableOpacity>
                    <LinearGradient colors={['#F97794', '#623AA2']} style={styles.linearGradient}>
                        <AntDesign name={"arrowright"} size={24} color="white" style={styles.inputIcon} />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={styles.footerContainer}>

                <Text style={styles.footerText}>Or create using social media </Text>
                <View style={styles.socialMediaContainer}>
                    <TouchableOpacity>
                        <Entypo name={"facebook-with-circle"} size={30} color="blue" style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openTwitter}>
                        <Entypo name={"twitter-with-circle"} size={30} color="blue" style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>

                        <AntDesign name={"google"} size={30} color="blue" style={styles.socialIcon} />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.leftVectorContainer}>
                {/* <ImageBackground source={require("../screen/assests/")} style={styles.leftVectorImage}/> */}
            </View>
        </View>
    );
};

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingTop: 20,
        position: "relative",
    },
    topImageContainer: {

    },
    topImage: {
        width: "100%",
        height: 130,
    },
    helloContainer: {
        // borderWidth: 1,
       
        height: 50,
        width: 50,
        borderColor: "red",
        borderWidth: 1,
        borderRadius: 40,
        marginLeft: 15,
        justifyContent:"center",
        alignItems:"center",
    },
    backIcon: {
        // paddingTop:10,
        // marginTop:10,
        //  paddingBottom: 20,

    },
    createAccountText: {

        textAlign: "center",
        fontSize: 30,
        // color:""
        marginBottom: 30,
        fontWeight: "bold"
    },
    inputContainer: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        borderRadius: 20,
        color: "red",
        marginHorizontal: 40,
        elevation: 10,
        marginVertical: 20,
        alignItems: "center",
        height: 50,
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
    },
    inputIcon: {
        marginLeft: 14,
    },
    textForgot: {
        textAlign: "right",
        color: "#BEBEBE",
        // marginRight:20,
        width: "90%",
        fontSize: 15,
    },
    signInBtnContainer: {
        flexDirection: "row",
        marginTop: 40,
        width: "90%",
        justifyContent: "flex-end",

    },
    color: "#262626",
    singInText: {
        fontSize: 25,
        fontWeight: "bold"
    },
    linearGradient: {
        height: 34,
        width: 56,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
    },
    footerText: {
        color: "black",
        textAlign: "center",
        fontSize: 18,
        marginTop: 80,
    },
    // createText: {
    //     textDecorationLine: "underline"
    // },
    footerContainer: {
        // backgroundColor: "white",
        marginTop: 25,

    },
    socialMediaContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",

    },
    socialIcon: {
        backgroundColor: "white",
        elevation: 10,
        margin: 10,
        padding: 10,
        borderRadius: 50,

    },
    leftVectorContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,

    },
    leftVectorImage: {
        height: 250,
        width: 100,
    }
})