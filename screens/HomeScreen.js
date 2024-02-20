import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { StatusBar } from "expo-status-bar";
import {
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/moviedb";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { styles } from "../theme";
//Added before because api is not working so gettind data from json
import trendingMovies from "../response/popular.json";
import upcomingMovies from "../response/upcoming.json";
import topRatedMovies from "../response/top_rated.json";
import nowPlayingMovies from "../response/now_playing.json";

const ios = Platform.OS === "ios";

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
    getNowPlayingMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    console.log("got trending::", data);
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    console.log("got upcoming::", data);
    if (data && data.results) setUpcoming(data.results);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    console.log("got top rated::", data,);
    if (data && data.results) setTopRated(data.results);
  };

  const getNowPlayingMovies = async () => {
    const data = await fetchNowPlayingMovies();
    console.log("got now playing::", data);
    if (data && data.results) setNowPlaying(data.results);
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >

          {/* Trending Movies Carousel */}
          { trending?.length>0 && <TrendingMovies data={trending} /> }

          {/* upcoming movies row */}
          {nowPlaying?.length > 0 && ( <MovieList title="Now Playing" data={nowPlaying} />)}

          {/* upcoming movies row */}
          { upcoming?.length>0 && <MovieList title="Upcoming" data={upcoming} /> }
            
          {/* top rated movies row */}
          { topRated?.length>0 && <MovieList title="Top Rated" data={topRated} /> }
        </ScrollView>
      )}
    </View>
  );
}
