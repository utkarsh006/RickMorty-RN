import { EpisodeListItem } from '@/components/EpisodeListItem';
import { fetchCharacterById, fetchEpisodesByUrls } from '@/services/rickAndMorty';
import { Character, Episode } from '@/types/character';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await fetchCharacterById(id);
        if (!isMounted) return;
        setCharacter(data);
        const eps = await fetchEpisodesByUrls(data.episode);
        if (!isMounted) return;
        setEpisodes(eps);
      } catch (e) {
        if (isMounted) setErrorMessage('Failed to load character');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: character?.name ?? 'Character', headerBackTitle: 'Back' }} />

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.muted}>Loading...</Text>
        </View>
      ) : errorMessage ? (
        <View style={styles.center}>
          <Text style={styles.error}>{errorMessage}</Text>
          <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}>
            <Text style={styles.backBtnText}>Go Back</Text>
          </Pressable>
        </View>
      ) : character ? (
        <FlatList
          data={episodes}
          keyExtractor={(item) => String(item.id)}
          ListHeaderComponent={
            <View style={styles.headerArea}>
              <Image source={{ uri: character.image }} style={styles.heroImage} contentFit="cover" />
              <Text style={styles.name}>{character.name}</Text>
              <Text style={styles.meta}>{character.species} · {character.status}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Origin:</Text>
                <Text style={styles.metaValue}>{character.origin?.name || 'Unknown'}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Location:</Text>
                <Text style={styles.metaValue}>{character.location?.name || 'Unknown'}</Text>
              </View>
              <Text style={styles.sectionTitle}>Episodes</Text>
            </View>
          }
          contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <EpisodeListItem episode={item} />
          )}
          ListEmptyComponent={<Text style={styles.muted}>No episodes found.</Text>}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  muted: {
    marginTop: 8,
    color: 'gray',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  backBtn: {
    marginTop: 12,
    backgroundColor: '#1f2937',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  headerArea: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  heroImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  meta: {
    color: 'gray',
    marginTop: 4,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  metaLabel: {
    color: '#6b7280',
    marginRight: 6,
  },
  metaValue: {
    color: '#111827',
    fontWeight: '500',
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  separator: {
    height: 12,
  },
}); 