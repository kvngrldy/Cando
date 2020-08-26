import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Image, AsyncStorage, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelopeSquare, faUsers, faBuilding } from '@fortawesome/free-solid-svg-icons'

const Profile = ({ navigation, route }) => {

    let { name, email, position, imageUrl } = route.params
    let [department, setDepartment] = useState('')
    let [bar, setBar] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(data => {
                if (data === null || data === '' || data === undefined) {
                    navigation.navigate('login')
                } else {
                    return fetch(`http://192.168.0.126:3001/data/userData`, {
                        method: 'get',
                        headers: {
                            "token": data
                        }
                    })
                }
            })
            .then(res => res.json())
            .then(response => {
                setDepartment(response.userDept)
                setBar(response.userTodo)
            })
            .catch(err => console.log)
    }, [])

    function logout() {
        AsyncStorage.removeItem('token')
            .then(_ => {
                navigation.navigate('login')
            })
            .catch(err => console.log)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.task}>
                <View style={styles.description}>
                    <View style={styles.imgContainer}>
                        <Image style={{ width: 150, height: 150, marginBottom: 30, marginTop: 100, borderRadius: 100000000, marginLeft: 'auto', borderWidth: 5, borderColor: 'white', marginRight: 'auto' }} source={{ uri: imageUrl }} />
                    </View>
                    <View>
                        <Text style={styles.category}>Handana Williyantoro</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%', marginLeft: '15%', marginBottom: '5%' }}>
                        <View>
                            <Text style={styles.email}><FontAwesomeIcon icon={faEnvelopeSquare} /> {email}</Text>
                        </View>
                        <View>
                            <Text style={styles.position}><FontAwesomeIcon icon={faUsers} /> {position}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.department}> <FontAwesomeIcon icon={faBuilding} /> {
                            department && department.map((text, index) => {
                                return text.name
                            })
                        }</Text>
                    </View>
                    <View style={{ width: '100%', backgroundColor: '#32CD32', marginTop: 32, height: '50%' }}>
                        <Text style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 20, fontSize: 21, fontWeight: 'bold' }}>TASK OVERVIEW</Text>
                        <View>
                            {
                                bar && bar.map((datum, index) => {
                                    return <Text style={{ textAlign: 'center' }} key={index}>{JSON.stringify(datum.category.name)}</Text>
                                })
                            }
                        </View>
                        <View style={styles.btn}>
                            <Button onPress={() => logout()} title="LOGOUT" />
                        </View>
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
        width: '100%',
        height: '100%',
    },
    category: {
        fontSize: 21,
        textAlign: "center",
        marginBottom: 20,
        width: '80%',
        marginLeft: '10%',
        marginTop: 50,
    },
    email: {
        fontSize: 14,
        textAlign: 'center',
    },
    position: {
        textAlign: "left",
        fontSize: 14,
        marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    department: {
        textAlign: "left",
        fontSize: 14,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    btn: {
        marginTop: 50,
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    imgContainer: {
        width: '100%',
        height: '30%',
        backgroundColor: '#32CD32',
    }
})

export default Profile
