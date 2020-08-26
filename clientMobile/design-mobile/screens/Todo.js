import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, Text, StyleSheet, View, Button, AsyncStorage, Picker } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import socket from '../config/socket';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    try {
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

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }
    catch (err) {
        console.log(err)
    }
}

async function sendPushNotification(expoPushToken, title, body) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: title,
        body: body,
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

const Todo = ({ navigation }) => {
    let [todo, setTodo] = useState([])
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    let [notif, setNotif] = useState([])
    const notificationListener = useRef();
    const responseListener = useRef();

    socket.off('update-data').on('update-data', _ => {
        fetchDataSocket()
    })

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
        });

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response, 'dont mind this');
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    function fetchData() {
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
                setTodo(response.userTodo)
            })
            .catch(err => console.log)
    }

    function fetchDataSocket() {
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
                console.log(response)
                if (response.userTodo.length > todo.length) {
                    let temp = []
                    for (let i = 0; i < response.userTodo.length; i++) {
                        temp.push(response.userTodo[i])
                    }
                    setTodo(temp)
                    sendPushNotification(expoPushToken, 'New task', 'Task has been successfully assigned')
                } else if (response.userTodo.length < todo.length) {
                    let temp = []
                    for (let i = 0; i < response.userTodo.length; i++) {
                        temp.push(response.userTodo[i])
                    }
                    setTodo(temp)
                    sendPushNotification(expoPushToken, 'Delete task', 'Task has been successfully deleted')
                } else {
                    let temp = []
                    for (let i = 0; i < response.userTodo.length; i++) {
                        temp.push(response.userTodo[i])
                    }
                    setTodo(temp)
                    sendPushNotification(expoPushToken, 'Update task', 'Task has been successfully updated')
                }
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

    function sortByDeadline(itemValue) {
        let deepCloneTodo = JSON.parse(JSON.stringify(todo))
        if (itemValue === 'oldest') {
            let data = deepCloneTodo.sort(function (a, b) {
                return new Date(a.deadline) - new Date(b.deadline)
            })
            setTodo(data)
        }
        else if (itemValue === 'newest') {
            let data = deepCloneTodo.sort(function (a, b) {
                return new Date(a.deadline) - new Date(b.deadline)
            }).reverse()
            setTodo(data)
        } else {
            fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.headersContainer}>
                    <Picker selectedValue='' style={styles.pickerDeadline} onValueChange={(itemValue, itemIndex) => sortByDeadline(itemValue)}>
                        <Picker.Item label="Sort by deadline" value='' />
                        <Picker.Item label="Sort by oldest" value="oldest" />
                        <Picker.Item label="Sort by newest" value="newest" />
                    </Picker>
                </View>
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
        alignItems: 'center'
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
    },
    pickerDeadline: {
        height: 50,
        width: 150,
        color: '#344953',
        marginRight: 'auto',
        marginLeft: 'auto',
        justifyContent: 'center',
    },
    headersContainer: {
        width: '100%',
        flexDirection: 'row'
    }
})
