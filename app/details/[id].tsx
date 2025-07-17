import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';


export default function SongDetails() {
    const router = useRouter();
    const { title, artist, artwork, time } = useLocalSearchParams<{
        title: string;
        artist: string;
        artwork: string;
        time: string;
    }>();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.hotPink} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>SONG DETAILS</Text>
                <View style={styles.spacer} />
            </View>

            <View style={styles.content}>
                <Image source={{ uri: artwork }} style={styles.image} />
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
                <Text style={styles.artist}>{artist}</Text>
                <Text style={styles.trackId}>{time}</Text>
            </View>
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
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        color: Colors.white,
        fontWeight: 'bold',
    },
    spacer: {
        width: 24,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
        paddingTop: 100,
        backgroundColor: Colors.lightPink,
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 12,
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.black,
        textAlign: 'center',
        marginBottom: 8,
    },
    artist: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.grey,
        marginBottom: 8,
    },
    trackId: {
        fontSize: 14,
        color: Colors.grey,
    },
});
