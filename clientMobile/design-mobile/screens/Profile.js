import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.task}>
                <View style={styles.description}>
                    <View>
                        <Image resizeMode="center" style={{ width: "50%", height: 150, borderRadius: 100000, borderWidth: 1, borderColor: "black", marginBottom: 50, marginTop: 50, marginLeft: "25%" }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png' }} />
                    </View>
                    <View>
                        <Text style={styles.category}>Bartholomew JoJo Simpson</Text>
                    </View>
                    <View>
                        <Text style={styles.email}>bart@gmail.com</Text>
                    </View>
                    <View>
                        <Text style={styles.position}>Software Engineer</Text>
                    </View>
                    <View>
                        <Text style={styles.department}>Technology Information</Text>
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
        fontSize: 21,
        textAlign: "center",
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    email: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: '15%'
    },
    position: {
        textAlign: "center",
        fontSize: 20,
        marginBottom: 10
    },
    department: {
        textAlign: "center",
    }
})

export default Profile
