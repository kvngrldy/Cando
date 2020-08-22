import React, { useState, useEffect } from 'react'
import { ScrollView, Text, StyleSheet, View, Button, AsyncStorage } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const Todo = ({ navigation }) => {

    // let [todos, setTodos] = useState([])
    let [title, setTitle] = useState("Make kanban server board with Vue.js ASDSDSADASDSAD")
    let [category, setCategory] = useState("")
    let [deadline, setDeadline] = useState("")
    let [priorities, setPriorities] = useState("")
    let [titleTemp, setTitleTemp] = useState("")

    // useEffect(() => {

    // }, [])

    function goToDetail() {
        navigation.navigate("DETAIL")
    }

    useEffect(() => {
        AsyncStorage.getItem('token')
        .then(data => {
            if(data === null || data === undefined || data === ''){
                navigation.navigate('login')
            }
        })
    }, [])

    useEffect(() => {
        if (title.length >= 20) {
            setTitleTemp(title.substr(0, 18) + '...')
        }
    }, [title])

    return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.task}>
                        <View style={styles.description}>
                            {
                                titleTemp
                                    ? <View>
                                        <Text style={styles.title} >{titleTemp}</Text>
                                    </View>
                                    : <View>
                                        <Text style={styles.title}>{title}</Text>
                                    </View>

                            }
                            <View>
                                <Text onPress={() => goToDetail()} style={styles.category}>Category: Development</Text>
                            </View>
                            <View>
                                <Text onPress={() => goToDetail()} style={styles.deadline}>Deadline: 20 Agustus 2020</Text>
                            </View>
                            <View>
                                <Text onPress={() => goToDetail()} style={styles.priorities}>Priorities: ****</Text>
                            </View>
                        </View>
                        <View style={styles.btn}>
                            <View style={styles.done}>
                                <Button title="CHANGE STATUS" />
                            </View>
                        </View>
                    </View>
                    <View style={styles.task}>
                        <View style={styles.description}>
                            <Text onPress={() => goToDetail()} style={styles.title}>TITLE</Text>
                            <Text onPress={() => goToDetail()} style={styles.category}>Category: Development</Text>
                            <Text onPress={() => goToDetail()} style={styles.deadline}>Deadline: 20 Agustus 2020</Text>
                            <Text onPress={() => goToDetail()} style={styles.priorities}>Priorities: ****</Text>
                        </View>
                        <View style={styles.btn}>
                            <View style={styles.done}>
                                <Button title="CHANGE STATUS" />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
    );
}

export default Todo

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
