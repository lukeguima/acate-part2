import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';

import {
  useEffect,
  useState,
} from 'react';

import Api from '../services/Api';

import { ICharacter } from '../types';
import { StatusBar } from 'expo-status-bar';

function RMCharacter() {

  const [character, setCharacter] = useState<ICharacter[]>();
  const [showModal, setShowModal] = useState(false);
  const [characterDetails, setCharacterDetails] = useState<ICharacter[] | undefined>();

  useEffect(() => {
    Api.get('character').then(
      res => {
        setCharacter(res.data.results)
      }
    )
  }, [])

  const getDataCharacter = (id: Number) => {
    const result: ICharacter[] | undefined = character?.filter(item => item.id == id)
    setCharacterDetails(result)
    console.log(result)
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: '#7B25F0' }}
    >
      <StatusBar backgroundColor="#7B25F0" />
      <ScrollView style={{ marginTop: 24 }}>
        <View
          style={styles.container}
        >

          {character?.map(
            (item, index) => (
              <View
                style={styles.card}
                key={index}
              >
                <Image
                  style={{ width: 100, height: 100, borderRadius: 100 }}
                  source={{ uri: item.image }}
                />
                <View
                  style={styles.textBox}
                >
                  <Text
                    style={styles.textName}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={styles.text}
                  >
                    {item.species}
                  </Text>
                  <Text
                    style={styles.text}
                  >
                    {item.gender}
                  </Text>
                  <Pressable
                    style={styles.buttonClose}
                    onPress={() => {
                      getDataCharacter(item.id)
                      setShowModal(!showModal)
                    }}
                  >
                    <Text
                      style={styles.text}
                    > ver mais </Text>
                  </Pressable>
                </View>
              </View>
            )
          )}
          <Modal
            animationType='slide'
            visible={showModal}
            onRequestClose={
              () => setShowModal(!showModal)
            }
          >
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#7B25F0'
            }}>
              <Text
                style={styles.text}
              >SELECIONADO:</Text>
              <Text
                style={styles.textName}>
                {characterDetails != undefined ? characterDetails[0].name : null}
              </Text>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setShowModal(!showModal)}
              >
                <Text
                  style={styles.text}
                >fechar</Text>
              </Pressable>
            </View>
          </Modal>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#7B25F0',
    width: Dimensions.get('window').width - 40,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 12,
    margin: 12
  },
  textBox: {
    flex: 1,
    paddingHorizontal: 15
  },
  textName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    fontWeight: "500"
  },
  buttonClose: {
    marginTop: 12,
    height: 45,
    width: Dimensions.get('window').width - 200,
    borderColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default RMCharacter