import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	Image,
	ActivityIndicator,
	TouchableOpacity,
	StatusBar,
	Pressable
} from "react-native";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat, Message } from '@/hooks/useChat';
import { useState, useRef, useEffect, ElementRef } from "react";
import { Ionicons } from '@expo/vector-icons';

function MessageBubble({ message }: { message: Message }) {
	const formattedTime = message.timestamp.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});

	return (
		<View
			className={`mb-4 max-w-[85%] ${message.isUser ? "self-end" : "self-start"}`}
		>
			<View
				className={`rounded-2xl px-4 py-3 ${
					message.isUser
						? "bg-primary"
						: "bg-secondary/90"
				}`}
				style={{
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.1,
					shadowRadius: 3,
					elevation: 2,
					borderWidth: 1,
					borderColor: message.isUser ? "rgba(212, 175, 55, 0.3)" : "rgba(51, 51, 51, 0.2)",
				}}
			>
				<Text
					className={`${
						message.isUser
							? "text-primary-foreground"
							: "text-secondary-foreground"
					} text-base leading-5`}
				>
					{message.text}
				</Text>
			</View>
			<Text
				className={`text-[11px] text-muted-foreground/70 mt-1 ${
					message.isUser ? 'text-right mr-1' : 'text-left ml-1'
				}`}
			>
				{formattedTime}
			</Text>
		</View>
	);
}

function WelcomeMessage({ onSelectSuggestion }: { onSelectSuggestion: (text: string) => void }) {
	const suggestions = [
		"Who wrote Psalms?",
		"Explain John 3:16",
		"What is grace?",
		"Tell me about Moses",
		"What does the Bible say about love?",
		"Meaning of Proverbs 3:5-6"
	];

	return (
		<View className="items-center justify-center mb-6 mt-10">
			<Image
				source={require('@/assets/images/bible-chat-logo.png')}
				style={{ width: 120, height: 120, resizeMode: 'contain' }}
				className="rounded-lg mb-4"
			/>
			<Text className="text-foreground text-xl font-semibold mb-2">Welcome to Bible Chat</Text>
			<Text className="text-muted-foreground text-center px-6 mb-6">
				Ask questions about Scripture, explore Biblical themes, and deepen your understanding of God's Word.
			</Text>
			{/* Adjusted spacing */}
			<View className="flex-row flex-wrap justify-center gap-2.5 px-4 mb-6">
				{suggestions.map((suggestion, index) => (
					<SuggestionChip
						key={index}
						text={suggestion}
						onPress={() => onSelectSuggestion(suggestion)}
					/>
				))}
			</View>
		</View>
	);
}

function SuggestionChip({ text, onPress }: { text: string; onPress: () => void }) {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.7}
		>
			<View
				className="bg-muted px-4 py-2.5 rounded-xl my-1 border border-primary/20"
				style={{
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 1 },
					shadowOpacity: 0.08,
					shadowRadius: 2,
					elevation: 1,
				}}
			>
				<Text className="text-secondary-foreground text-sm font-medium">{text}</Text>
			</View>
		</TouchableOpacity>
	);
}

export default function ChatScreen() {
	const { messages, isLoading, error, sendMessage } = useChat();
	const [inputText, setInputText] = useState('');
	const scrollViewRef = useRef<ScrollView>(null);
	const hasMessages = messages.length > 1;
	const inputRef = useRef<ElementRef<typeof Input>>(null);

	useEffect(() => {
		if (messages.length > 0) {
			setTimeout(() => {
				scrollViewRef.current?.scrollToEnd({ animated: true });
			}, 100);
		}
	}, [messages]);

	const handleSend = () => {
		if (inputText.trim() && !isLoading) {
			sendMessage(inputText);
			setInputText('');
		}
	};

	const handleSuggestionTap = (text: string) => {
		setInputText(text);
		inputRef.current?.focus();
	};

	return (
		<SafeAreaView className="flex-1 bg-background">
			<StatusBar barStyle="light-content" backgroundColor="#121212" />

			<View
				className="px-4 py-3.5 flex-row items-center justify-between bg-background border-b border-border/40"
			>
				<View className="flex-row items-center">
					<Image
						source={require('@/assets/images/bible-chat-logo.png')}
						style={{ width: 30, height: 30, resizeMode: 'contain' }}
						className="mr-3"
					/>
					<Text className="text-foreground font-semibold text-lg">Bible Chat</Text>
				</View>
				<TouchableOpacity className="p-1.5 rounded-full bg-muted/50">
					<Ionicons name="menu-outline" size={24} color="#D4AF37" />
				</TouchableOpacity>
			</View>

			<ScrollView
				ref={scrollViewRef}
				className="flex-1 px-4"
				contentContainerStyle={{
					paddingTop: 20,
					paddingBottom: 16,
					flexGrow: hasMessages ? undefined : 1,
				}}
				keyboardShouldPersistTaps="handled"
			>
				{!hasMessages ? (
					<WelcomeMessage onSelectSuggestion={handleSuggestionTap} />
				) : (
					messages.slice(1).map(message => (
						<MessageBubble key={message.id} message={message} />
					))
				)}
				{isLoading && (
					<View className="self-start bg-secondary/80 rounded-2xl px-6 py-4 rounded-bl-none mb-4" style={{ elevation: 2 }}>
						<ActivityIndicator size="small" color="#D4AF37" />
					</View>
				)}
				{error && (
					<View className="self-center bg-destructive/90 rounded-xl px-4 py-3 mb-4 mx-6" style={{ elevation: 3 }}>
						<Text className="text-destructive-foreground text-center">{error}</Text>
						<TouchableOpacity className="mt-2.5 bg-destructive/70 py-1.5 rounded-md">
							<Text className="text-destructive-foreground text-center font-semibold text-sm">Try Again</Text>
						</TouchableOpacity>
					</View>
				)}
			</ScrollView>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
			>
				<View className="border-t border-border/40 bg-background/95">
					<View className="flex-row items-center p-3 pb-4">
						<Input
							ref={inputRef}
							value={inputText}
							onChangeText={setInputText}
							placeholder="Ask about the Bible..."
							className="flex-1 mr-3 bg-input/60 border border-input/30 rounded-2xl px-4 py-3 text-base"
							onSubmitEditing={handleSend}
							multiline
							blurOnSubmit={false}
							style={{
								minHeight: 46,
								maxHeight: 120,
							}}
						/>
						<Button
							variant="default"
							className={`rounded-full h-12 w-12 items-center justify-center p-0 ${!inputText.trim() || isLoading ? 'opacity-60' : ''}`}
							onPress={handleSend}
							disabled={isLoading || !inputText.trim()}
						>
							<Ionicons name="arrow-up" size={22} color="#FFFFFF" />
						</Button>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
