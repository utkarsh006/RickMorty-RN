import { Character } from '@/types/character';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  character: Pick<Character, 'name' | 'species' | 'image'>;
};

export function CharacterCard({ character }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} contentFit="cover" />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {character.name}
        </Text>
        <Text style={styles.species} numberOfLines={1}>
          {character.species}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: 96,
    height: 96,
  },
  info: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  species: {
    color: 'gray',
    marginTop: 4,
  },
}); 