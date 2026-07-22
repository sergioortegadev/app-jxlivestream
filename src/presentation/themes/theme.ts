import { StyleSheet } from "react-native";
import { TimerDisplay } from '../../components/TimerDisplay';

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
  darkGrayBgColor: string;
  TimerDisplay: string;
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
  TimerDisplay: '#667eea50',
  liveColor: '#20ac51',
  offlineColor: '#e74c3c',
  grayBgColor: '#bbb',
  darkGrayBgColor: '#333',
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
    flexGrow: 1,
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
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 18,
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
  
  // === Player ===
  containerLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(18, 18, 18, 0.85)',
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: 100,
  },
  textLoadingOverlay: {
    marginTop: 16,
    color: colors.liveColor,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center'
  },
  containerStatusBadge: {
    alignItems: 'center',
    marginBottom: 40,
  },
  containerReconnectingOverlay: {
    alignItems: 'center',
    marginBottom: 30,
  },
  containerPlayerControl: {
    width: '80%',
    gap: 12,
    marginBottom: 30,
  },
  // TIMER (linearGradient) y Webview
  containerFlex: {
    flex: 1,
  },
  containerTimerDisplay: {
    alignItems: 'center',
    position: 'absolute',
    top: 180,
  },
  timerBox: {
    width: 140,
    backgroundColor: colors.TimerDisplay,
    borderColor: colors.main,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    overflow: 'hidden'
  },
  timerText: {
    zIndex: 2,
    color: colors.main,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subText: {
    zIndex: 3,
    color: colors.darkGrayBgColor,
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
  shine: { // brillo del timer
    zIndex: 1,
    position: 'absolute',
    width: 160,
    top: 0,
    bottom: 0,
    left: 20,
    //height: 60,
  },
});