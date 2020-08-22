import React, { useState, useEffect } from 'react'
import { ScrollView, Text, StyleSheet, View, Button, AsyncStorage, Picker } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const Todo = ({ navigation }) => {

    let [debug, setDebug] = useState("")
    let [email, setEmail] = useState('')
    let [todo, setTodo] = useState([])
    let [debug2, setDebug2] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('email')
            .then(data => {
                setEmail(data)
            })
    }, [])

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

    useEffect(() => {
        fetchData()
    }, [todo])

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
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {
                todo && todo.map((todo, index) => {
                    return <ScrollView key={index}>
                        <View style={styles.task}>
                            <View style={styles.description}>
                                <View >
                                    <Text onPress={() => goToDetail(todo.title, todo.category.name, todo.deadline.slice(0, 10), todo.priority, todo.description, todo.categoryId, todo.category.departmentId, todo.userId, todo.id)} style={styles.title}>{todo.title}</Text>
                                </View>
                                <View>
                                    <Text style={styles.category}>Category: {todo.category.name}</Text>
                                </View>
                                <View>
                                    <Text style={styles.deadline}>Deadline: {todo.deadline.slice(0, 10)}</Text>
                                </View>
                                <View>
                                    <Text style={styles.priorities}>Priorities: {todo.priority}</Text>
                                </View>
                                <View>
                                    <Text style={styles.priorities}>Department: {todo.category.department.name}</Text>
                                </View>
                                <View>
                                    <Text  style={styles.priorities}>Category ID: {todo.categoryId}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                })
            }
        </SafeAreaView>
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
