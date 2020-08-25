import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Button, AsyncStorage, Picker } from 'react-native'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import socket from '../config/socket';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        title: 'Update Successful',
        body: 'You have successfully update task!',
        data: { data: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

const TodoDetail = ({ navigation, route }) => {

    let { title, category, deadline, priority, description, categoryId, deptId, userId, id } = route.params
    let [categories, setcategories] = useState([])
    let [expoPushToken, setExpoPushToken] = useState('');
    let [notification, setNotification] = useState(false);
    let notificationListener = useRef();
    let responseListener = useRef();

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(data => {
                if (data === null || data === undefined || data === '') {
                    navigation.navigate('login')
                }
            })
    }, [])

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
            console.log(expoPushToken, '<<<< EXPO')
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(data => {
                if (data === null || data === '' || data === undefined) {
                    navigation.navigate('login')
                } else {
                    return fetch(`http://192.168.0.126:3001/data/${deptId}`, {
                        method: 'get',
                        headers: {
                            "token": data
                        }
                    })
                }
            })
            .then(res => res.json())
            .then(response => {
                setcategories(response.categories)
            })
            .catch(err => console.log)
    }, [deptId])

    function changeCategory(itemValue, title, deadline, priority, description, userId, id) {
        AsyncStorage.getItem('token')
            .then(data => {
                if (!data) {
                    navigation.navigate('/login')
                } else {
                    return fetch(`http://192.168.0.126:3001/data/todo/${id}`, {
                        method: "PUT",
                        headers: {
                            'token': data,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            title,
                            deadline,
                            categoryId: itemValue,
                            priority,
                            description,
                            userId
                        })
                    })
                }
            })
            .then(_ => {
                console.log('<<<<<< UPDATE MOBILE')
                socket.emit('update-data')
            })
            .then(_ => {
                sendPushNotification(expoPushToken)
                navigation.navigate('TASKS')
            })
            .catch(err => console.log)
    }

    function backToHomepage(event) {
        event.preventDefault()
        navigation.navigate("TASKS")
    }

    return (
        <View style={styles.container}>
            <View style={styles.task}>
                <View style={styles.description}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.category}>Category: {category}</Text>
                    <Text style={styles.deadline}>Deadline: {deadline}</Text>
                    <Text style={styles.priorities}>Priorities: {priority}</Text>
                    <Text style={styles.descriptionTitle}>Description:</Text>
                    <View style={styles.descDiv}>
                        <Text style={styles.descriptionText}>{description}</Text>
                    </View>
                </View>
                <View style={styles.picker}>
                    <Picker selectedValue={categoryId}
                        style={{ height: 50, width: 125 }}
                        onValueChange={(itemValue) => changeCategory(itemValue, title, deadline, priority, description, userId, id)} >
                        {
                            categories && categories.map((categoryOne, index) => {
                                return <Picker.Item key={index} label={categoryOne.name} value={categoryOne.id} />
                            })
                        }
                    </Picker>
                </View>
                <View style={styles.btn}>
                    <View style={styles.trash}>
                        <Button onPress={(event) => backToHomepage(event)} title="BACK TO HOMEPAGE" />
                    </View>
                </View>
            </View>
        </View>
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
        height: 400,
    },
    description: {
        marginTop: 12
    },
    btn: {
        marginTop: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 20,
        textAlign: "center",
        height: 50,
        marginRight: 20,
        marginLeft: 20
    },
    category: {
        fontSize: 10,
        textAlign: "center"
    },
    deadline: {
        fontSize: 10,
        textAlign: "center"
    },
    priorities: {
        fontSize: 10,
        textAlign: "center"
    },
    trash: {
        width: 250,
        marginLeft: "auto",
        marginRight: 'auto',
        marginBottom: 20
    },
    descriptionTitle: {
        marginTop: 10,
        marginBottom: 5,
        textAlign: "center"
    },
    descriptionText: {
        textAlign: "center",
        fontSize: 12
    },
    descDiv: {
        height: 100
    },
    picker: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})


export default TodoDetail
