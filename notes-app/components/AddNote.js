/*****                      All Imports                   ******/
import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Alert, Keyboard, ScrollView} from 'react-native';
import * as Style from '../assets/styles';

/********            Add New Note Main Component        *******/
const AddNote = ({navigation, ...props}) => {

    return (
        <ScrollView>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            behavior='padding'
           >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                {/**********         Add Note Container           **********/}
                <View style={{ padding: 20, justifyContent: "space-around"}}> 

                    {/**************            Input Field to add new note             *************/}
                    <TextInput style={[styles.input]} placeholder='Type Here...' 
                            onChangeText={(text) => props.setNote(text)} value={props.note}
                            multiline={true}
                    />

                    {/*************             Add Note Button          **********/}
                    <TouchableOpacity style={styles.button} onPress={() => {
                        if(props.note == ''){
                            Alert.alert('Please type something!')
                        }else{
                            props.handleNote();
                            navigation.navigate('Notes')
                        }
                        }}
                    >
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    )
}

/*******      Styles            *******/
export const styles = StyleSheet.create({
    addNoteContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        padding: 20,
        paddingTop: 20,
        width: '100%',
        fontSize: 19,
        color: 'black',
        fontWeight: '600',
        opacity: 0.8,
        shadowColor: Style.color,
        shadowOpacity: 0.4,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderColor: Style.color,
        borderWidth: 2,
        borderRadius: 5,
        height: 300
    },
    button: {
        backgroundColor: Style.color,
        width: '40%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        alignSelf: 'flex-end',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700'
    }
})
export default AddNote;
