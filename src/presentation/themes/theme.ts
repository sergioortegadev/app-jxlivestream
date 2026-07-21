import { StyleSheet } from "react-native";

export interface ThemeColors {
  main: string,
  primary: string;
  secondary: string,
  text: string;
  background: string;
  cardBackground: string;
  buttonTextColor: string;
  blueBtn: string,
  liveColor: string;
  offlineColor: string;
  grayBgColor: string;
}

export const colors: ThemeColors = {
  main: '#219bff',
  primary: "#5856D6",
  secondary: '#b3974b',
  text: "black",
  background: "#F3F2F7",
  cardBackground: "white",
  buttonTextColor: "white",

  // Player
  blueBtn: '#667eea',
  liveColor: '#20ac51',
  offlineColor: '#e74c3c',
  grayBgColor: '#bbb',
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
  mainContainerCentered: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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

  // PlayerScreen
  player: {
    width: 0,
    height: 0,
    position: 'absolute',
  },
  statusCard: {
    marginBottom: 40,
    alignItems: 'center',
  },
  liveBadge: {
    borderColor: colors.liveColor,
    borderWidth: 2,
    borderStyle: 'dotted',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  liveText: {
    color: colors.liveColor,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  offlineBadge: {
    borderColor: colors.offlineColor,
    borderWidth: 2,
    borderStyle: 'dotted',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  offlineText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Reconnecting
  reconnectingCard: {
    alignItems: 'center',
    marginBottom: 30,
  },
  reconnectingText: {
    color: colors.liveColor,
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
  },

  // Error
  errorCard: {
    borderColor: colors.offlineColor,
    backgroundColor: colors.grayBgColor,
    borderWidth: 1,
    padding: 14,
    borderRadius: 8,
    marginBottom: 30,
    borderLeftWidth: 10,
    borderLeftColor: colors.offlineColor,
  },
  errorText: {
    //color: colors.main,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 13,
  },

  // Controls
  controlsContainer: {
    width: '80%',
    gap: 12,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  playingButton: {
    backgroundColor: colors.blueBtn,
  },
  grayButton: {
    backgroundColor: colors.grayBgColor,
  },
  stopButton: {
    backgroundColor: colors.offlineColor,
  },
   buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ========== INFO ==========
  infoContainer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  infoText: {
    color: '#888',
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'italic',
  },

});