import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, Text, StyleSheet, View, Button, AsyncStorage, Picker, Dimensions } from 'react-native'
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
    const [name, setName] = useState('')
    let [picker, setPicker] = useState('')

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
                setTodo(response.userTodo)
                setName(response.userData.name)
            })
            .catch(err => console.log)
    }

    function fetchDataSocket() {
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
            setPicker(itemValue)
        }
        else if (itemValue === 'newest') {
            let data = deepCloneTodo.sort(function (a, b) {
                return new Date(a.deadline) - new Date(b.deadline)
            }).reverse()
            setTodo(data)
            setPicker(itemValue)
        } else {
            fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerUser}>
                <Text style={styles.hello}>Hello,</Text>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.length}>You have {todo.length} task at this moment.</Text>
            </View>
            <View style={styles.headersContainer}>
                <Picker selectedValue={picker} style={styles.pickerDeadline} onValueChange={(itemValue, itemIndex) => sortByDeadline(itemValue)}>
                    <Picker.Item label="Sort by oldest" value="oldest" />
                    <Picker.Item label="Sort by newest" value="newest" />
                </Picker>
            </View>
            <ScrollView showsVerticalScrollIndicator={true}>
                {
                    todo && todo.map((todo, index) => {
                        return <View key={index} onPress={() => goToDetail(todo.title, todo.category.name, todo.deadline.slice(0, 10), todo.priority, todo.description, todo.categoryId, todo.category.departmentId, todo.userId, todo.id)} style={styles.task}>
                            <View onPress={() => goToDetail(todo.title, todo.category.name, todo.deadline.slice(0, 10), todo.priority, todo.description, todo.categoryId, todo.category.departmentId, todo.userId, todo.id)} style={styles.description}>
                                <View >
                                    <Text onPress={() => goToDetail(todo.title, todo.category.name, todo.deadline.slice(0, 10), todo.priority, todo.description, todo.categoryId, todo.category.departmentId, todo.userId, todo.id)} style={styles.title}>{todo.title}</Text>
                                </View>
                                <View>
                                    <Text onPress={() => goToDetail(todo.title, todo.category.name, todo.deadline.slice(0, 10), todo.priority, todo.description, todo.categoryId, todo.category.departmentId, todo.userId, todo.id)} style={styles.deadline}>Deadline: {todo.deadline.slice(0, 10)}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50, width: 200 }}>
                                    <View style={todo.category.name === 'Backlog' ? { backgroundColor: 'green', width: 70 } : todo.category.name === 'Done' ? { backgroundColor: 'red', width: 50 } : { backgroundColor: 'purple', width: 70 }}>
                                        <Text onPress={() => goToDetail(todo.title, todo.category.name, todo.deadline.slice(0, 10), todo.priority, todo.description, todo.categoryId, todo.category.departmentId, todo.userId, todo.id)} style={styles.category}>{todo.category.name}</Text>
                                    </View>
                                    <View style={todo.priority === 'low' ? { backgroundColor: 'green', width: 50 } : todo.priority === 'urgent' ? { backgroundColor: 'red', width: 50 } : { backgroundColor: 'orange', width: 70 }}>
                                        <Text onPress={() => goToDetail(todo.title, todo.category.name, todo.deadline.slice(0, 10), todo.priority, todo.description, todo.categoryId, todo.category.departmentId, todo.userId, todo.id)} style={styles.priorities}>{todo.priority}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    })
                }
            </ScrollView >
            <View style={{height: 10}}>
                <Text></Text>
            </View>
        </SafeAreaView>
    );
}

export default Todo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    task: {
        backgroundColor: "black",
        marginTop: 5,
        marginBottom: 5,
        width: 250,
        height: 150,
        borderRightColor: 'whitesmoke',
    },
    description: {
        marginTop: 12,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    btn: {
        marginTop: 20
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: 'white'
    },
    category: {
        fontSize: 14,
        textAlign: "center",
        color: 'white'

    },
    deadline: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
        color: 'white'

    },
    priorities: {
        fontSize: 14,
        textAlign: "center",
        color: 'white'

    },
    done: {
        width: 200,
        marginLeft: 60,
        marginBottom: 10,
        marginTop: 20
    },
    pickerDeadline: {
        height: 80,
        width: '50%',
        color: '#344953',
        marginRight: 'auto',
        marginLeft: 'auto',
        justifyContent: 'center',
    },
    headersContainer: {
        width: '100%',
        flexDirection: 'row'
    },
    headerUser: {
        height: '25%',
        width: '100%',
        backgroundColor: 'grey',
        borderBottomRightRadius: 80
    },
    hello: {
        color: 'white',
        fontSize: 32,
        marginTop: '10%',
        marginLeft: 10
    },
    name: {
        color: 'white',
        marginLeft: 10,
        fontSize: 26,
        fontWeight: 'bold'
    },
    length: {
        color: 'whitesmoke',
        opacity: 0.5,
        marginLeft: 10,
        marginTop: 10
    }
})
