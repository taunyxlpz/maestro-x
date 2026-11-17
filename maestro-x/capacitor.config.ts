import type { CapacitorConfig } from "@capacitor/cli";

// The native apps load the live site, so every web update reaches the apps
// instantly without a new App Store / Play Store release.
// native-shell/ holds the offline screen shown when there's no internet.
const config: CapacitorConfig = {
  appId: "com.mannyxgoat.maestrox",
  appName: "Maestro X",
  webDir: "native-shell",
  backgroundColor: "#070707",
  server: {
    url: "https://maestro-x.vercel.app",
    errorPath: "index.html",
    cleartext: false,
  },
  ios: { contentInset: "never", backgroundColor: "#070707" },
  android: { backgroundColor: "#070707" },
  plugins: {
    SplashScreen: { launchShowDuration: 1200, backgroundColor: "#070707", showSpinner: false },
    StatusBar: { style: "DARK", backgroundColor: "#070707", overlaysWebView: false },
  },
};

export default config;
