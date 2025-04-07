import { useState, useCallback, useEffect } from "react";
import { generateText } from "ai";
import { openai, createOpenAI } from "@ai-sdk/openai";
import { systemPrompt } from "../systemPrompt";
import { getEnv } from "../utils/env";

// Get API key from environment variables with Windows fallback handling
const { OPENAI_API_KEY } = getEnv();

export interface Message {
	id: string;
	text: string;
	isUser: boolean;
	timestamp: Date;
}

export function useChat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Create custom OpenAI provider with API key
	const customOpenAI = createOpenAI({
		apiKey: OPENAI_API_KEY
	});

	// Initialize with a welcome message
	useEffect(() => {
		if (messages.length === 0) {
			setMessages([
				{
					id: "1",
					text: "Hello! How can I help you with Bible study today?",
					isUser: false,
					timestamp: new Date()
				}
			]);
		}
	}, [messages.length]);

	const sendMessage = useCallback(
		async (text: string) => {
			if (!text.trim()) return;

			// Add user message to the chat
			const userMessage: Message = {
				id: Date.now().toString(),
				text,
				isUser: true,
				timestamp: new Date()
			};

			setMessages((prev) => [...prev, userMessage]);
			setIsLoading(true);
			setError(null);

			try {
				// Build the conversation history for context
				const conversationHistory = messages
					.map((msg) => `${msg.isUser ? "Human" : "Assistant"}: ${msg.text}`)
					.join("\n");

				// Generate response using o3-mini model with custom OpenAI provider
				const { text: responseText } = await generateText({
					model: customOpenAI("o3-mini"),
					prompt: `${conversationHistory}\nHuman: ${text}\nAssistant:`,
					system: systemPrompt,
					providerOptions: {
						openai: {
							reasoningEffort: "high" // Use high reasoning effort for biblical questions
						}
					}
				});

				// Add AI response to the chat
				const aiMessage: Message = {
					id: (Date.now() + 1).toString(),
					text: responseText.trim(),
					isUser: false,
					timestamp: new Date()
				};

				setMessages((prev) => [...prev, aiMessage]);
			} catch (err) {
				console.error("Error generating response:", err);
				setError("Failed to get response. Please try again.");
			} finally {
				setIsLoading(false);
			}
		},
		[messages]
	);

	return {
		messages,
		isLoading,
		error,
		sendMessage
	};
}
