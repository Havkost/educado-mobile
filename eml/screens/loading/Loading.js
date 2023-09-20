import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BgLinearGradient } from "../../constants/BgLinearGradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { isFontsLoaded } from "../../constants/Fonts";

function WelcomeScreen({ navigation }) {
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state
  const logo = require("../../assets/images/logo.png");

  // Set the flag to 'false' on first render, used for development
  AsyncStorage.setItem("hasShownWelcome", "false");

  // Delay execution of useEffect for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      AsyncStorage.getItem("hasShownWelcome").then((value) => {
        if (value === "true") {
          // If the flag is 'true', the user has seen the welcome screen before
          // Navigate to the LoginStack directly
          navigation.navigate("LoginStack");
        } else {
          // The user hasn't seen the welcome screen before
          // Set the flag to 'true' to indicate that it has been shown
          AsyncStorage.setItem("hasShownWelcome", "true");
          // Update the state to render the welcome screen content
          setHasShownWelcome(true);
          navigation.navigate("WelcomeStack");
        }
      });
    }, 3000); // 3 seconds delay

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (!isFontsLoaded()) {
    return null; // Render null while loading font
  }

  // Conditional rendering to show content after the 3-second delay
  if (loading) {
    return (
      // You can replace this with a loading indicator or any other desired loading UI
      <BgLinearGradient>
        <SafeAreaView style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.text}>
            Transformando conhecimento em liberdade
          </Text>
        </SafeAreaView>
      </BgLinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    marginBottom: 16, // Add margin at the bottom of the image
  },
  text: {
    textAlign: "center",
    marginTop: 16, // Add margin at the top of the text
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;
