import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable
} from 'react-native';


// 
//   Created BY emirs 
// 
//!  İnstagram 
//   @1emirhanekinci 
// 
//!  Github 
//   emirs01 
//
//! Discord
//  emirs1
//


const NoteTakingApp = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      
      const notesJson = await AsyncStorage.getItem('notes');
      if (notesJson) {
        setNotes(JSON.parse(notesJson));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addNote = async () => {
    if (newNote === '') return;

    const newNotes = [...notes, { id: Date.now(), text: newNote }];
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    setNewNote('');
  };

  const removeNote = async (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };

  handleSubmitEdit = () => {
    
    this.setState({ text: '' });
  }

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container2}>
      <Text style={styles.headerText}>My Notes</Text>
      </View >
      <View style={styles.container3}>
      <TextInput
      scrollEnabled={true}
      multiline={true}
      maxFontSixeMultiplier={1}
      disableFullscreenUI={true}
      clearTextOnFocus={true}
      caretHidden={false}
      autoCorrect={true}
      autoCapitalize='words'
      
      placeholder="Not Yaz"
      style={styles.textInput}
      onChangeText={(text) => setNewNote(text)}
      onSubmitEditing={this.handleSubmitEdit}
      />
      </View>
      <Pressable onPress={addNote} style={styles.button}>
      <Text style={styles.buttonText}>Add Note</Text> 
      </Pressable> 
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.flatlist} onPress={() => removeNote(item.id) }>
            <Text style={styles.view2}
            >{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  container2: {
    top: "4%",
    width: "100%",
    height: 40,
  },
  container3: {
    width: "100%",
    height: 50,
    marginTop: 50,
  },
  button: {
    borderWidth: 0.4,
    borderBlockColor: "blue",
    width: 100,
    height: 50,
    backgroundColor: "#ecf0f1",
    borderRadius: 10,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    marginEnd: 15,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "black",
    fontWeight: "800",
  },
  textInput: {
    width: "100%",
    height: 50,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  headerText: {
    marginStart: 20,
    fontSize: 30,
    fontWeight: "800",
  },
  flatlist: {
    textAlignVertical: "top",
    width: "100%",
    height: 50,
    backgroundColor: "#1451",
    borderWidth: 0.3,
    borderRadius: 5,
    borderBlockColor: "black",
    marginTop: 8,
  },
  view2: {
    marginStart: 10,
    marginTop: 3,
    textAlignVertical: "top",
  },
});

export default NoteTakingApp;