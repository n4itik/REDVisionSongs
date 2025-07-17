import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  trackTimeMillis: number;
}

export default function HomeScreen() {
  const router = useRouter();

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchSongs = async () => {
    try {
      const response = await fetch(
        'https://itunes.apple.com/search?term=Justin+beiber'
      );
      const json = await response.json();
      setSongs(json.results);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Failed to fetch songs', error.message);
      } else {
        Alert.alert('Failed to fetch songs', 'An unknown error occurred');
      }
    }
  };

  const loadInitialData = async () => {
    setLoading(true);
    await fetchSongs();
    setLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchSongs();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadInitialData();
  }, []);

  const renderItem = ({ item }: { item: Song }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/details/[id]',
          params: {
            id: item.trackId.toString(),
            title: item.trackName,
            artist: item.artistName,
            artwork: item.artworkUrl100,
            time: Math.round(item.trackTimeMillis / 60000) + 'm',
          },
        })
      }
      style={styles.card}
    >
      <Image source={{ uri: item.artworkUrl100 }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.trackName} numberOfLines={2}>
          {item.trackName}
        </Text>
        <View style={styles.info}>
          <Text style={styles.artistName}>{item.artistName}</Text>
          <Text style={styles.time}>{Math.round(item.trackTimeMillis / 60000)}m</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.hotPink} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SONGS</Text>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.hotPink} />
          <Text style={styles.loaderText}>Please wait</Text>
        </View>
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.trackId.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.hotPink,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.hotPink,
  },
  list: {
    padding: 16,
    paddingVertical: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.lightPink,
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  trackName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: Colors.black,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  artistName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.grey,
  },
  time: {
    fontSize: 14,
    color: Colors.grey,
  },
});
