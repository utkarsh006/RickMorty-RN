import { CharacterCard } from '@/components/CharacterCard';
import { fetchCharacters } from '@/services/rickAndMorty';
import { Character } from '@/types/character';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await fetchCharacters();
        if (isMounted) setCharacters(data);
      } catch (e) {
        if (isMounted) setErrorMessage('Failed to load characters');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
          <Text style={[styles.loaderText, { color: colors.secondaryText }]}>Loading characters...</Text>
        </View>
      ) : errorMessage ? (
        <Text style={[styles.errorText, { color: colors.error }]}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ gap: 12, padding: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/character/[id]', params: { id: String(item.id) } })}
              activeOpacity={0.7}
            >
              <CharacterCard character={{ name: item.name, species: item.species, image: item.image }} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 8,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
  },
});