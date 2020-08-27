import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  Image
} from 'react-native';

const Login = ({ navigation }) => {
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [status, setStatus] = useState("")

  function emailHandler(email) {
    setEmail(email)
  }

  function passwordHandler(password) {
    setPassword(password)
  }

  function loginHandler(event) {
    event.preventDefault()
    fetch('https://candone.herokuapp.com/data/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data === 'Password dan Email Harus Di Isi' || data === 'Password atau Email Salah') {
          setStatus(data)
        } else {
          navigation.navigate("TodoPage", {
            screen: 'PROFILE',
            params: {
              name: data.name,
              email: data.email,
              imageUrl: data.imageUrl,
              position: data.position
            }
          })
          return data
        }
      })
      .then(access => {
        AsyncStorage.setItem('token', access.token)
      })
      .catch(err => console.log)
  }

  return (
    <View style={styles.container}>
      <View style={styles.divContainer}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: 'https://thumbs2.imgbox.com/69/dd/UnwMpA98_t.jpg',
          }}
        />
        <Text style={styles.textStatus}>{status}</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => emailHandler(email)} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => passwordHandler(password)} />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={(event) => loginHandler(event)}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableHighlight>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderBottomWidth: 1,
    width: 230,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 15,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 230,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5
  },
  loginButton: {
    backgroundColor: "#32CD32",
    marginTop: 10
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  textStatus: {
    marginTop: 10,
    marginBottom: 30,
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  divContainer: {
    backgroundColor: 'black',
    height: 450,
    width: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  tinyLogo: {
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginBottom: -30,
    marginRight: 'auto',
    borderRadius: 100000000,
  }
});


export default Login
