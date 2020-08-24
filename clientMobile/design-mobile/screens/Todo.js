import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, Text, StyleSheet, View, Button, AsyncStorage, Picker } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import socket from '../../../clientWeb/clientTest/src/config/socket';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function sendPushNotification(expoPushToken, title) {
    const message = {
        to: expoPushToken,
        title: 'Please check your task!!',
        body: `${title} must be finished before tomorrow!`,
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

const Todo = ({ navigation }) => {
    let [todo, setTodo] = useState([])
    let [debug, setDebug] = useState([])
    let [expoPushToken, setExpoPushToken] = useState('');
    let [notification, setNotification] = useState(false);
    let notificationListener = useRef();
    let responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    socket.on('update-date', _ => {
        fetchData()
    })

    function fetchData() {
        AsyncStorage.getItem('token')
            .then(data => {
                if (data === null || data === '' || data === undefined) {
                    navigation.navigate('login')
                } else {
                    return fetch(`https://dummycando.herokuapp.com/data/userData`, {
                        method: 'get',
                        headers: {
                            "token": data
                        }
                    })
                }
            })
            .then(res => res.json())
            .then(response => {
                setTodo(response.userTodo)
            })
            .catch(err => console.log)
    }

    function goToDetail(title, category, deadline, priority, description, categoryId, deptId, userId, id) {
        navigation.navigate("DETAIL", {
            title,
            category,
            deadline,
            priority,
            description,
            categoryId,
            deptId,
            userId,
            id
        })
    }

    useEffect(() => {
        fetchData()
    }, [todo])

    useEffect(() => {
        let edit = todo && todo.map(e => {
            let date = Date.parse(e.deadline) - (1000 * 60 * 60 * 24)
            let parsedBack = new Date(date)
            return parsedBack
        })

        for (let i = 0; i < todo.length; i++) {
            if (Date.parse(edit[i]) === Date.parse(new Date())) {
                sendPushNotification(expoPushToken, todo[i].title)
            }
        }
    }, [])

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                {
                    todo && todo.map((todo, index) => {
                        return <View key={index} style={styles.task}>
                            <View style={styles.description}>
                                <View >
                                    <Text onPress={() => goToDetail(todo.title, todo.category.name, todo.deadline.slice(0, 10), todo.priority, todo.description, todo.categoryId, todo.category.departmentId, todo.userId, todo.id)} style={styles.title}>{todo.title}</Text>
                                </View>
                                <View>
                                    <Text onPress={() => goToDetail(todo.title, todo.category.name, todo.deadline.slice(0, 10), todo.priority, todo.description, todo.categoryId, todo.category.departmentId, todo.userId, todo.id)} style={styles.category}>Category: {todo.category.name}</Text>
                                </View>
                                <View>
                                    <Text onPress={() => goToDetail(todo.title, todo.category.name, todo.deadline.slice(0, 10), todo.priority, todo.description, todo.categoryId, todo.category.departmentId, todo.userId, todo.id)} style={styles.deadline}>Deadline: {todo.deadline.slice(0, 10)}</Text>
                                </View>
                                <View>
                                    <Text onPress={() => goToDetail(todo.title, todo.category.name, todo.deadline.slice(0, 10), todo.priority, todo.description, todo.categoryId, todo.category.departmentId, todo.userId, todo.id)} style={styles.priorities}>Priorities: {todo.priority}</Text>
                                </View>
                            </View>
                        </View>
                    })
                }
            </SafeAreaView>
        </ScrollView >
    );
}

export default Todo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    },
    task: {
        backgroundColor: "white",
        marginTop: 10,
        width: 320,
        height: 200,
    },
    description: {
        marginLeft: 12,
        marginTop: 12
    },
    btn: {
        marginTop: 20
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        height: 30
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
    done: {
        width: 200,
        marginLeft: 60,
        marginBottom: 10,
        marginTop: 20
    }
})
