import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Modal,
  FlatList,
  ScrollView,
  Alert
} from 'react-native';

import Formulario from './src/components/Formulario';
import Tarea from './src/components/Tarea';

const App = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [tareas, setTareas] = useState([])
  const [tarea, setTarea] = useState({})

 const tareaEditar= id => {
  const tareaEditar = tareas.filter(tarea=>tarea.id === id)

  setTarea(tareaEditar[0])
 }

 const tareaEliminar = id =>{
  Alert.alert(
    '¿deseas eliminar esta tarea?',
    'recuerda que no podras ver esta tarea',
    [
      { text: 'Cancelar' },
      { text: 'Si, eliminar', onPress: ()=>{
         const tareasActualizados = tareas.filter(tareasState =>tareasState.id !==id)

         setTareas(tareasActualizados)
      } },
    ]
  )
 }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Text style={styles.titulo}>GESTIÓN DE TAREAS</Text>
      <Text style={styles.subtitulo}>Mis encargos personales</Text>

      <Pressable
        style={styles.btnNuevasTarea}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}>
        <Text style={styles.btnTextNuevasTarea}>Agregar Nueva Tarea</Text>
      </Pressable>

      {tareas.length === 0 ? 
          <Text style={styles.noTareas}>No hay tareas aún</Text> :
          <FlatList
            style={styles.listado}
            data={tareas}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
              return(
                  <Tarea 
                  item={item}  
                  setModalVisible={setModalVisible}
                  tareaEditar={tareaEditar}
                  tareaEliminar={tareaEliminar}
                   />
              )
            }}
          />
      }

      <Formulario
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setTareas={setTareas}
        tareas={tareas}
        tarea={tarea}
        setTarea={setTarea}
      />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A8CFE9',
    flex: 1,
  },
  titulo: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 30,
    color: 'blue',
    fontWeight: '500',
  },
  subtitulo: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
  },
  btnNuevasTarea: {
    textAlign: 'center',
    backgroundColor: '#276792',
    padding: 20,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextNuevasTarea: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noTareas: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30
  },
});

export default App;
