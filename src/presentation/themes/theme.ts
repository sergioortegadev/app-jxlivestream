import { StyleSheet } from "react-native";

export interface ThemeColors {
  main: string,
  primary: string;
  secondary: string,
  text: string;
  background: string;
  cardBackground: string;
  buttonTextColor: string;
}

export const colors: ThemeColors = {
  main: '#219bff',
  primary: "#5856D6",
  secondary: '#b3974b',
  text: "black",
  background: "#F3F2F7",
  cardBackground: "white",
  buttonTextColor: "white",
};

export const globalStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginVertical: 12,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },

  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  globalMargin: {
    paddingHorizontal: 20,
    flex: 1,
  },

  btnPrimary: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  btnPrimaryText: {
    color: colors.text,
    fontSize: 16,
  },
  menuItems: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.cardBackground
  },
  
  // Animation101Screen
  Animation101Screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  Animation101ScreenPurpleBox: {
    backgroundColor: colors.primary,
    width: 150,
    height: 150,
    borderRadius: 18,
  },

  // Custom Switch
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },

  // Webview
  webview: {
    flex: 1,
  },
});