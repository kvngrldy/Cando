import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, AsyncStorage, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Profile = ({ navigation, route }) => {

    let { name, email, position, imageUrl } = route.params
    let [debug, setDebug] = useState('')
    let [userId, setUserId] = useState('')

    useEffect(() => {
        fetch('https://dummycando.herokuapp.com/data', {
            method: 'get'
        })
            .then(res => res.json())
            .then(check => {
                for (let i = 0; i < check.allUser.length; i++) {
                    if (check.allUser[i].email === email) {
                        setUserId(check.allUser[i].id)
                    }
                }
            })
            .catch(err => console.log)
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(data => {
                if (data === null || data === '' || data === undefined) {
                    navigation.navigate('login')
                }
            })
            .catch(err => console.log)
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(data => {
                if (data === null || data === '' || data === undefined) {
                    navigation.navigate('login')
                } else {
                    return fetch(`https://dummycando.herokuapp.com/data/${userId}`, {
                        method: 'get',
                        headers: {
                            "token": data
                        }
                    })
                }
            })
            .then(res => res.json())
            .then(response => {
                setDebug(response)
            })
            .catch(err => console.log)
    }, [userId])

    function logout() {
        AsyncStorage.removeItem('token')
            .then(_ => {
                navigation.navigate('login')
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.task}>
                <View style={styles.description}>
                    <View>
                        <Image resizeMode="center" style={{ width: "50%", height: 150, borderRadius: 100000, borderWidth: 1, borderColor: "black", marginBottom: 30, marginTop: 50, marginLeft: "25%" }} source={{ uri: imageUrl }} />
                    </View>
                    <View>
                        <Text style={styles.category}>{name}</Text>
                    </View>
                    <View>
                        <Text style={styles.email}>Email: {email}</Text>
                    </View>
                    <View>
                        <Text style={styles.position}>Position: {position}</Text>
                    </View>
                    <View>
                        <Text style={styles.department}>Department: Technology Information</Text>
                    </View>
                    <View style={styles.btn}>
                        <Button onPress={() => logout()} title="LOGOUT" />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    task: {
        backgroundColor: "white",
        marginTop: 10,
        marginBottom: 20,
        width: 320,
        height: 500,
        borderRadius: 30
    },
    category: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10
    },
    email: {
        textAlign: "center",
        fontSize: 14,
        marginBottom: 10
    },
    position: {
        textAlign: "center",
        fontSize: 14,
        marginBottom: 10
    },
    department: {
        textAlign: "center",
        fontSize: 14
    },
    btn: {
        marginTop: 40,
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})

export default Profile
