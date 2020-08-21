import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Video } from "expo-av";
import videoData from "./videos.json";

let sideMenuHeight = Dimensions.get("window").width;

if (Dimensions.get("window").width > Dimensions.get("window").height) {
  sideMenuHeight = Dimensions.get("window").height;
}

export default function App() {
  const [movieUrl, setMovieUrl] = useState(videoData[0].url);
  const [videoName, setVideoName] = useState(videoData[0].name);
  const [videoId, setVideoId] = useState(videoData[0].id);

  const [width, setWidth] = useState(Dimensions.get("window").width);
  const [height, setHeight] = useState(Dimensions.get("window").height);

  const [activeMenu, setActiveMenu] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      setWidth(Dimensions.get("window").width);
      setHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  // if (activeMenu) {
  //   setTimeout(function () {
  //     setActiveMenu(false);
  //   }, 2800);
  // }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {width < height && (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Stream App</Text>
            </View>
          )}
          <TouchableWithoutFeedback
            onPress={() => setActiveMenu((prevState) => !prevState)}
          >
            <Video
              source={{
                uri: movieUrl,
              }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              useNativeControls
              style={{
                width: width,
                height: width >= height ? height - 25 : height / 2,
              }}
            />
          </TouchableWithoutFeedback>
          {activeMenu && width >= height && (
            <View style={{ position: "absolute", top: 40, left: 50 }}>
              <Text style={{ fontSize: 20, fontWeight: "700", color: "#fff" }}>
                {videoName}
              </Text>
            </View>
          )}
          {width < height && (
            <View style={{ paddingVertical: 16 }}>
              <Text style={{ fontSize: 20, fontWeight: "700", color: "#fff" }}>
                {videoName}
              </Text>
            </View>
          )}
          {width < height &&
            videoData.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={
                  videoId == video.id
                    ? styles.activePortraitElem
                    : styles.videoElem
                }
                onPress={() => {
                  setMovieUrl(video.url);
                  setVideoName(video.name);
                  setVideoId(video.id);
                }}
              >
                <View>
                  <Image
                    style={{ width: "100%", height: 60 }}
                    source={{ uri: video.imageUrl }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          {width >= height && activeMenu ? (
            <View style={styles.landscapeMenu}>
              <ScrollView>
                {videoData.map((video) => (
                  <TouchableOpacity
                    key={video.id}
                    style={
                      videoId == video.id
                        ? styles.activeElem
                        : styles.landscapeMenuElem
                    }
                    onPress={() => {
                      setMovieUrl(video.url);
                      setVideoName(video.name);
                      setVideoId(video.id);
                      setActiveMenu(false);
                    }}
                  >
                    <View>
                      <Image
                        style={{ width: "100%", height: 40 }}
                        source={{ uri: video.imageUrl }}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    paddingTop: 25,
  },
  titleContainer: {
    paddingTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  videoElem: {
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: "80%",
    marginVertical: 10,
    borderRadius: 10,
  },
  activePortraitElem: {
    borderColor: "rgba(230,0,0,0.8)",
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: "80%",
    marginVertical: 10,
    borderRadius: 10,
  },
  videoElemTxt: {
    fontSize: 16,
    color: "#fff",
  },
  landscapeMenu: {
    flex: 1,
    position: "absolute",
    top: 25,
    right: 0,
    width: "30%",
    height: sideMenuHeight,
    paddingBottom: 25,
  },
  landscapeMenuElem: {
    borderColor: "#000",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: "rgba(255,255,255, 0.6)",
    borderRadius: 10,
  },
  activeElem: {
    borderColor: "rgba(230,0,0, 0.9)",
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: "rgba(230,0,0, 0.5)",
    borderRadius: 10,
  },
});
