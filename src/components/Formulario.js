import React, { useState, useEffect } from 'react';
import {
  Modal,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

const Formulario = ({ 
  modalVisible, 
  setModalVisible, 
  setTareas, 
  tareas, 
  tarea: tareaObj, 
  setTarea: setTareaApp 
}) => {

  const [id, setId] = useState('')
  const [tarea, setTarea] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (Object.keys(tareaObj).length > 0) {
      setId(tareaObj.id)
      setTarea(tareaObj.tarea)
      setFecha(tareaObj.fecha)
      setDescripcion(tareaObj.descripcion)
    
    }
  }, [tareaObj])

  const handleTarea = () => {

    //* validar
    if ([tarea, fecha,].includes('')) {

      Alert.alert(
        'Error',
        'Todos los campos son obligatorios'
      )
      return
    }

    //* revisamos si el registro va ser nuevo o es edición
    
    const nuevaTarea = {
      tarea,
      fecha,
      descripcion,
    }

    if(id){
      //* editando

      nuevaTarea.id = id

      const tareasActualizados = tareas.map(tareaState =>tareaState.id === nuevaTarea.id ? nuevaTarea : tareaState)

      setTareas(tareasActualizados)
      setTareaApp({})

    }else{
      //* nuevo registro

      nuevaTarea.id = Date.now()
      setTareas([...tareas, nuevaTarea])

    }

    setModalVisible(!modalVisible)

    setId('')
    setTarea('')
    setFecha(new Date())
    setDescripcion('')


  }

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.conttenido}>
        <ScrollView>

          <Text style={styles.titulo}>{tareaObj.id ? 'Editar Tarea': 'Nueva Tarea'}</Text>

          <Pressable
            style={styles.btnCancelar}
            onPress={() => {
               setModalVisible(!modalVisible)
               setTareaApp({})
               setId('')
               setTarea('')
               setFecha(new Date())
               setDescripcion('')
               }}
          >
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>

          <View>
            <Text style={styles.label}>Nombre de tarea</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la tarea"
              placeholderTextColor={'#666'}
              value={tarea}
              onChangeText={setTarea}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha de creación</Text>
            <View style={styles.fechaContenedor}>
              <DatePicker
                date={fecha}
                locale="es"
                onDateChange={date => setFecha(date)}
              />
            </View>
          </View>

          <View>
            <Text style={styles.label}>Descripción:</Text>
            <TextInput
              style={[styles.input]}
              placeholder="Describe tu tarea"
              placeholderTextColor={'#666'}
              multiline={true}
              numberOfLines={8}
              value={descripcion}
              onChangeText={setDescripcion}
            />
          </View>

          <Pressable
            style={styles.btnNuevaTarea}
            onPress={handleTarea}
          >
            <Text style={styles.btnNuevaTareaTexto}>{tareaObj.id ? 'Editar Tarea': 'Agregar Tarea'}</Text>
          </Pressable>


        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  conttenido: {
    backgroundColor: '#39405D',
    flex: 1,
  },
  titulo: {
    marginTop: 15,
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 30,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 15,
    marginHorizontal: 30,
  },
  fechaContenedor: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 30,
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#44588A',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  btnNuevaTarea: {
    marginVertical: 50,
    backgroundColor: '#0E75B9',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10
  },
  btnNuevaTareaTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  }
});

export default Formulario;
