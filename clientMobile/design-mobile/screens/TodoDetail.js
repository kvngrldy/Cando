import React, {useEffect} from 'react'
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native'

const TodoDetail = ({ navigation, route }) => {

    useEffect(() => {
        AsyncStorage.getItem('token')
        .then(data => {
            if(data === null || data === undefined || data === ''){
                navigation.navigate('login')
            }
        })
    }, [])

    function backToHomepage(event) {
        event.preventDefault()
        navigation.navigate("TASKS")
    }

    return (
        <View style={styles.container}>
            <View style={styles.task}>
                <View style={styles.description}>
                    <Text style={styles.title}>TITLE</Text>
                    <Text style={styles.category}>Category: Development</Text>
                    <Text style={styles.deadline}>Deadline: 20 Agustus 2020</Text>
                    <Text style={styles.priorities}>Priorities: ****</Text>
                    <Text style={styles.descriptionTitle}>Description:</Text>
                    <View style={styles.descDiv}>
                        <Text style={styles.descriptionText}>THIS IS DESCRIPTION SECTION</Text>
                    </View>
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
        marginTop: 20
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
        width: 300,
        marginLeft: 10,
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
        height: 160
    }
})


export default TodoDetail
