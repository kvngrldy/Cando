import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Image, AsyncStorage, Button, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelopeSquare, faUsers } from '@fortawesome/free-solid-svg-icons'
import { VictoryPie } from 'victory-native'

const Profile = ({ navigation, route }) => {

    let { name, email, position, imageUrl } = route.params
    let [department, setDepartment] = useState('')
    let [backlog, setBacklog] = useState(0)
    let [onGoing, setOnGoing] = useState(0)
    let [QC, setQC] = useState(0)
    let [done, setDone] = useState(0)

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(data => {
                if (data === null || data === '' || data === undefined) {
                    navigation.navigate('login')
                } else {
                    return fetch(`https://candone.herokuapp.com/data/userData`, {
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
                return response.userTodo
            })
            .then(data => {
                let backlogCounter = 0
                let qcCounter = 0
                let onGoingCounter = 0
                let done = 0
                for (let i = 0; i < data.length; i++) {
                    if (data[i].category.name === 'Backlog') {
                        backlogCounter++
                    } else if (data[i].category.name === 'On Going') {
                        onGoingCounter++
                    } else if (data[i].category.name === 'QC') {
                        qcCounter++
                    } else {
                        done++
                    }
                }
                setDone(done)
                setOnGoing(onGoingCounter)
                setQC(qcCounter)
                setBacklog(backlogCounter)
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
        // <SafeAreaView style={styles.container}>
            <View style={styles.task}>
                <View style={styles.description}>
                    <View style={styles.imgContainer}>
                        <Image resizeMode={'cover'} style={{ width: '100%', height: '100%', marginBottom: 30, marginLeft: 'auto', marginRight: 'auto' }} source={{ uri: imageUrl }} />
                    </View>
                    <View style={{
                        backgroundColor: 'black', marginTop: -30, width: '70%', marginLeft: 'auto', marginRight: 'auto', height: 50, borderWidth: 2, marginBottom: 30, shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.34,
                        shadowRadius: 6.27,

                        elevation: 10,
                        height: 80,
                        opacity: 0.8
                    }}>
                        <Text style={styles.category}>{name}</Text>
                        <View>
                            <Text style={styles.department}>{
                                department && department.map((text, index) => {
                                    if (index === department.length - 1) {
                                        return ' and ' + text.name
                                    } else if (index === department.length - 2) {
                                        return text.name
                                    } else {
                                        return text.name + ', '
                                    }
                                })
                            }</Text>
                        </View>
                    </View>
                    <View style={email.length > 20 ? {
                        flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: '5%', height: 0, marginLeft: '5%', marginRight: '5%'
                    }: {
                        flexDirection: 'row', justifyContent: 'space-between', width: '70%', marginBottom: '5%', height: 0, marginLeft: '15%', marginRight: '15%'
                    }}>
                        <View>
                            <Text style={styles.email}><FontAwesomeIcon icon={faEnvelopeSquare} /> {email}</Text>
                        </View>
                        <View>
                            <Text style={email.length > 20 ? {marginLeft: 10, marginRight: 25} : styles.position}><FontAwesomeIcon icon={faUsers} /> {position}</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', backgroundColor: 'whitesmoke', marginTop: 32, height: '50%' }}>
                        <Text style={{textAlign: 'center', fontSize: 18, marginTop: 20, marginBottom: -20, fontWeight: 'bold'}}>TASK OVERVIEW</Text>
                        <View>
                            <VictoryPie style={{ labels: { fontSize: 10 } }} height={250} animate={{ duration: 200 }} data={
                                backlog && !onGoing && !QC && !done ? [
                                    { x: 'Backlog', y: backlog },
                                ] : backlog && onGoing && !QC && !done ? [
                                    { x: 'Backlog', y: backlog },
                                    { x: 'On Going', y: onGoing }
                                ] : backlog && onGoing && QC && !done ? [
                                    { x: 'Backlog', y: backlog },
                                    { x: 'On Going', y: onGoing },
                                    { x: 'QC', y: QC },
                                ] : backlog && onGoing && QC && done ? [
                                    { x: 'Backlog', y: backlog },
                                    { x: 'On Going', y: onGoing },
                                    { x: 'QC', y: QC },
                                    { x: 'Done', y: done }
                                ] : backlog && !onGoing && QC && !done ? [
                                    { x: 'Backlog', y: backlog },
                                    { x: 'QC', y: QC },
                                ] : backlog && !onGoing && !QC && done ? [
                                    { x: 'Backlog', y: backlog },
                                    { x: 'Done', y: done }
                                ] : !backlog && onGoing && QC && !done ? [
                                    { x: 'On Going', y: onGoing },
                                    { x: 'QC', y: QC },
                                ] : !backlog && onGoing && !QC && done ? [
                                    { x: 'On Going', y: onGoing },
                                    { x: 'Done', y: done }
                                ] : !backlog && onGoing && !QC && !done ? [
                                    { x: 'On Going', y: onGoing },
                                ] : !backlog && !onGoing && QC && !done ? [
                                    { x: 'QC', y: QC },
                                ] : !backlog && !onGoing && QC && done ? [
                                    { x: 'QC', y: QC },
                                    { x: 'Done', y: done }
                                ] : !backlog && !onGoing && !QC && done ? [
                                    { x: 'Done', y: done }
                                ] : backlog && onGoing && !QC && done ? [
                                    { x: 'Backlog', y: backlog },
                                    { x: 'On Going', y: onGoing },
                                    { x: 'Done', y: done } 
                                ] : [{x: 'No task assigned', y: 2}]
                            }
                                colorScale={["yellow", "purple", "cyan", "red"]}
                            />
                        </View>
                        <View style={styles.btn}>
                            <Button color="red" style={{ fontWeight: 'bold' }} onPress={() => logout()} title="LOGOUT" />
                        </View>
                    </View>
                </View>
            </View>
        // </SafeAreaView>
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
        marginBottom: 20,
        width: '100%',
        height: '100%',
    },
    category: {
        fontSize: 18,
        textAlign: "center",
        width: '80%',
        marginLeft: '10%',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: 'white'
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
        marginRight: 'auto',
        color: 'white'
    },
    btn: {
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    imgContainer: {
        width: '100%',
        height: '33%',
        backgroundColor: '#32CD32',
    },
    description: {
        height: '100%',
        backgroundColor: 'white'
    }
})

export default Profile
