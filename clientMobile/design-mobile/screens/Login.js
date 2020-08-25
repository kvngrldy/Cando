import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

const Login = ({ navigation }) => {
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [status, setStatus] = useState("")

  function emailHandler(email) {
    setEmail(email)
  }

  // useEffect(() => {
  //   AsyncStorage.getItem('token')
  //   .then(data => {
  //     if(data){
  //       navigation.navigate('TodoPage', {
  //         screen: 'TASKS'
  //       })
  //     }
  //   })
  //   .catch(err => console.log)
  // }, [])

  function passwordHandler(password) {
    setPassword(password)
  }

  function loginHandler(event) {
    event.preventDefault()
    fetch('http://192.168.0.126:3001/data/login', {
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
        if(data === 'Password dan Email Harus Di Isi' || data === 'Password atau Email Salah'){
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
      <Text style={styles.title}>CANDO</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderBottomWidth: 1,
    width: 250,
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
    width: 250,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: "black",
    marginTop: 20
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  title: {
    marginBottom: 15,
    fontSize: 32,
    fontWeight: "bold",
    marginTop: -50
  },
  textStatus: {
    marginBottom: 25
  }
});


export default Login
