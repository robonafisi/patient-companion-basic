import "@fontsource/inter";
import "./App.css";

import {
  // Box,
  ChakraProvider,
  // Flex,
  // Spacer,
  // Text,
  // VStack,
} from "@chakra-ui/react";
import Conversation from "./components/Conversation";

// import { isChrome, isMobile, isSafari } from "react-device-detect";
// import { WarningIcon } from "@chakra-ui/icons";
import {
  DeepgramTranscriberConfig,
  // LLMAgentConfig,
  AzureSynthesizerConfig,
  VocodeConfig,
  // EchoAgentConfig,
  ChatGPTAgentConfig,
  // RESTfulUserImplementedAgentConfig,
  // WebSocketUserImplementedAgentConfig,
} from "vocode";

const App = () => {
  const transcriberConfig: Omit<
    DeepgramTranscriberConfig,
    "samplingRate" | "audioEncoding"
  > = {
    type: "transcriber_deepgram",
    chunkSize: 2048,
    endpointingConfig: {
      type: "endpointing_punctuation_based",
    },
  };
  const agentConfig: ChatGPTAgentConfig = {
    type: "agent_chat_gpt",
    initialMessage: { type: "message_base", text: "Hey there! I'm Peter, your friendly companion. I can help you successfully complete your treatment. What is your name?" },
    promptPreamble:
      "You are a friendly and credible companion helping a patient complete their treatment. Please provide engaging but concise responses and ask them specific questions about their lifestyle and how they feel. They will tell you their name. Start everything you say by referencing their name. Then ask when you can checkup with them.",
    endConversationOnGoodbye: true,
    generateResponses: true,
    cutOffResponse: {},
  };
  const synthesizerConfig: Omit<
    AzureSynthesizerConfig,
    "samplingRate" | "audioEncoding"
  > = {
    type: "synthesizer_azure",
    shouldEncodeAsWav: true,
    voiceName: "en-US-SteffanNeural",
  };
  const vocodeConfig: VocodeConfig = {
    apiKey: process.env.REACT_APP_VOCODE_API_KEY || "",
  };

  return (
    <ChakraProvider>
      {/* {(isMobile || !isChrome) && !isSafari ? (
        <VStack padding={10} alignItems="center">
          <WarningIcon boxSize={100} />
          <Text paddingTop={4}>
            This demo works on: Chrome (desktop) and Safari (desktop, mobile)
            only!
          </Text>
        </VStack>
      ) : (
        <Conversation
          config={{
            transcriberConfig,
            agentConfig,
            synthesizerConfig,
            vocodeConfig,
          }}
        />
      )} */}

      <Conversation
          config={{
            transcriberConfig,
            agentConfig,
            synthesizerConfig,
            vocodeConfig,
          }}
        />
    </ChakraProvider>
  );
};

export default App;
