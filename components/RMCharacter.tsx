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
  useState
} from 'react';

import Api from '../services/Api';

import { ICharacter } from '../types';

function RMCharacter() {

  const [character, setCharacter] = useState<ICharacter[]>();
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    Api.get('character').then(
      res => {
        setCharacter(res.data.results)
      }
    )
  }, [])

  return (
    <SafeAreaView
      style={{ backgroundColor: '#7B25F0' }}
    >
      <ScrollView>
        <View
          style={styles.container}
        >
          {character?.map(
            (item, index) => (
              <Pressable
                onPress={() => { setShowModal(true) }}
                style={styles.card}
                key={index}
              >
                <Modal
                  animationType='slide'
                  visible={showModal}>
                  <View
                    style={styles.modal}
                  >
                    <Text
                      style={styles.text}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => { setShowModal(false) }}
                  >
                    <Text>exit</Text>
                  </Pressable>
                </Modal>

                <Image
                  style={{ width: 100, height: 100 }}
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
                </View>
              </Pressable>
            )
          )}
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
  modal: {
    margin: 20,
    backgroundColor: '#7B25F0',
    height: 200
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
    color: '#fff'
  },
})

export default RMCharacter