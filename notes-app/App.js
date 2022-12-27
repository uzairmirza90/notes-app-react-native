/* ************                All Imports               **********/
import AddNote from './components/AddNote';
import Notes from './components/Notes';
import EditNote from './components/EditNote';
import DeletedNotes from './components/DeletedNotes';
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

/************         Stack navigator to move between screens                ***********/
const Stack = createNativeStackNavigator();

//**************            Main App function              ***********/
export default function App() {
  const [note, setNote] = useState();
  const [notes, setNotes] = useState([]);
  const [date, setDate] = useState(new Date().toUTCString());
  const [edit, setEdit] = useState();
  const [moveToBin, setMoveToBin] = useState([]);
  
  //***************             Function to Submit new note             ***********/
  function handleNote(){
    let newNote = note;
    let newNotes = [newNote, ...notes];
    setNotes(newNotes);
    setNote('')



    AsyncStorage.setItem('storedNotes', JSON.stringify(newNotes)).then(() => {
      setNotes(newNotes);
    }).catch(error => console.log(error));

    AsyncStorage.setItem('date', JSON.stringify(date)).then(() => {
      setDate(date);
    });
  };

  // **********             Hook to load saved notes when app restarts            ***********/
  useEffect(() => {
    loadNotes();
  }, [])

  // ************              Function to get Notes from async storage in Notes component              ***********/
  const loadNotes = () => {
    AsyncStorage.getItem('storedNotes').then(data => {
      if(data !== null){
        setNotes(JSON.parse(data));
      }
    }).catch((error) => console.log(error));

    AsyncStorage.getItem('deletedNotes').then(data => {
      if(data !== null){
        setMoveToBin(JSON.parse(data));
      }
    }).catch((error) => console.log(error));

    AsyncStorage.getItem('date');
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* **********           Notes Component Screen             ***********/}
        <Stack.Screen name="Notes">
          {props => <Notes {...props} notes={notes} setNotes={setNotes} date={date} setDate={setDate} note={note} setNote={setNote} 
          edit={edit} setEdit={setEdit} moveToBin={moveToBin} setMoveToBin={setMoveToBin}/>}
        </Stack.Screen>

        {/* ***********            Add new note Component Screen              ***********/}
        <Stack.Screen name="AddNote">
          {props => <AddNote {...props} note={note} setNote={setNote} handleNote={handleNote} />}
        </Stack.Screen>

        {/* ************                 Edit Note Component Screen             **********/}
        <Stack.Screen name="EditNote">
          {props => <EditNote {...props} edit={edit} setEdit={setEdit} notes={notes} setNotes={setNotes} note={note} moveToBin={moveToBin} setMoveToBin={setMoveToBin}/>}
        </Stack.Screen>

        {/**********              Deleted Notes component Screen                ************/}
        <Stack.Screen name="DeletedNotes">
          {props => <DeletedNotes {...props} moveToBin={moveToBin} setMoveToBin={setMoveToBin} notes={notes} setNotes={setNotes} date={date}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
