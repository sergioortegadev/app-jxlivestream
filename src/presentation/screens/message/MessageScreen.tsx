import React, { useRef, useState } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View 
  } from "react-native"
import { globalStyles, colors } from "../../themes/theme"
import { useMessage } from "../../../hooks/useMessages";
import { ConnectionBanner } from "../../../components/message/ConnectionBanner";
import { EmptyHistory } from "../../../components/message/EmptyHistory";
import { MessageBubble } from "../../../components/message/MessageBubble";
import { MessageInput } from "../../../components/message/MessageInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePlayerStore } from "../../../store/playerStore";

export const MessageScreen: React.FC = () => {
  const isLive =
        usePlayerStore(state => state.isLive);

  const scrollRef = useRef<ScrollView>(null);
  const [text, setText] = useState('');

  const {
    messages,
    sendMessage,
    retryMessage,
  } = useMessage({
    publisherConnected: isLive,
  })

  const handleSend = () => {
    const value = text.trim();

    if (!value) {
      return;
    }

    sendMessage(value);

    setText('');
  };


  return (
  <SafeAreaView 
                  style={globalStyles.containerFlex}
                  edges={['top']}
                  >
    <KeyboardAvoidingView 
    style={globalStyles.mainContainer}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={globalStyles.globalMargin}>
        <ConnectionBanner
        connected={isLive}
        />

        <View style={globalStyles.messageTitleCard}>
          <Text style={globalStyles.subTitle}>Envianos tu mensaje</Text>
          <Text style={globalStyles.messageSubTitle}>Esta función estará disponible en futuras actualizaciones</Text>
        </View>

        <ScrollView
         ref={scrollRef}
         style={globalStyles.messageHistory}
         contentContainerStyle={
           messages.length === 0
           ? globalStyles.messageEmptyContainer
           : globalStyles.messageHistoryContent
          }
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({
              animated: true,
            })
          }
          >
          {messages.length === 0 ? (
            <EmptyHistory />
          ) : (
            messages.map(message => (
              <MessageBubble
              key={message.clientId}
              message={message}
              onRetry={() =>
                retryMessage(message)
              }
              />
            ))
          )}
        </ScrollView>

         <MessageInput
          value={text}
          disabled={!isLive}
          onChangeText={setText}
          onSend={handleSend}
          />

      </View>

    </KeyboardAvoidingView>
  </SafeAreaView>
  )
}