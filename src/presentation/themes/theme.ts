import { StyleSheet } from "react-native";
import { TimerDisplay } from '../../components/player/TimerDisplay';

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
    fontSize: 18,
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

  // ======= Home Screen =====

  homeScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  homeBackgroundImage: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  homeOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(12, 20, 34, 0.52)",
  },
  homeContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 28,
    marginVertical: 50,
  },
  homeTitle: {
    color: colors.cardBackground,
    fontSize: 40,
    fontWeight: "800",
    letterSpacing: 1,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.45)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 10,
    marginTop: 60,
  },
  homeSubtitle: {
    marginTop: 10,
    color: colors.secondary,
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  homeDescription: {
    marginTop: 20,
    color: colors.background,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: 8,
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  homeSmallText: {
    marginTop: 30,
    color: colors.background,
    fontSize: 12,
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: 8,
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,

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
    top: 150,
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


  // === Message Screen ===
  /* MessageScreen  */
  messageTitleCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  messageHistory: {
    flex: 1,
  },
  messageHistoryContent: {
    paddingBottom: 12,
  },
  messageEmptyContainer: {
    flexGrow: 1,
  },

  /* MessageBubble */
  messageRow: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  messageBubble: {
    backgroundColor: colors.main,
    maxWidth: '80%',
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  messageFailedBubble: {
    backgroundColor: '#d9534f',
  },
  message: {
    color: 'white',
    fontSize: 16,
  },
  messageFooter: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  messageTime: {
    color: 'rgba(255,255,255,.8)',
    fontSize: 11,
    marginRight: 6,
  },
  messageStatus: {
    fontSize: 12,
  },
  messageRetry: {
    color: '#ffe9e9',
    fontSize: 11,
    marginTop: 6,
    textAlign: 'right',
  },
  /* Message Input */
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingVertical: 12,
  },
  messageInput: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 24,
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 16,
  },
  messageInputDisabled: {
    backgroundColor: '#EEE',
  },
  messageButton: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    width: 60,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  messageButtonDisabled: {
    opacity: .5,
  },
  messageBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  /* Coonection Banner */
  messageSubTitle: {
    fontSize: 12,
    color: colors.grayBgColor,
    textAlign:'center',
    marginBottom: -10,
  },
  messageReady: {
    backgroundColor: '#E9F8EF',
    borderColor: '#20ac51',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  messageReadyText: {
    textAlign: 'center',
    color: '#0d6b31',
    fontWeight: '600',
  },
  messageOffline: {
    backgroundColor: '#FDECEC',
    borderColor: '#e74c3c',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  messageOfflineText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#a11',
  },
  messageOfflineSub: {
    marginTop: 4,
    textAlign: 'center',
    color: '#666',
  },
  /* Empty History */
  messageHistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  messageHistIcon: {
    fontSize: 48,
    marginBottom: 20,
  },
  messageHistTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageHistPlaceholder: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },

  
  // ==== Profile ====
  /*  ProfileLogin component */
  profileContainer: {
    width: '100%',
    paddingHorizontal: 20,
    gap: 16,
    alignItems: 'center',
    paddingTop: 40
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  profileInput: {
    backgroundColor: colors.cardBackground,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 14,
    width: 250,
  },
  profileButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    width: 150,
  },
  profileButtonDisabled: {
    opacity: 0.6,
  },
  profileButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  /*  ProfileScreen */
  profileNoticeCard: {
    backgroundColor: colors.cardBackground,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 8,
  },
  profileNoticeIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  profileNoticeText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  profileNoticeSubText: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  profileInfoContainer: {
    //position: 'absolute',
    //bottom: 30,
    marginTop: 40,
    alignItems: 'center',
  },
  profileInfoText: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
});