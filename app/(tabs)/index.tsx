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
			{/* Softer corners and uniform rounding */}
			<View
				className={`rounded-3xl px-4 py-3 ${message.isUser ? "bg-primary" : "bg-secondary/80"}`}
				style={{
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 1.5 },
					// Subtler shadows
					shadowOpacity: 0.08,
					shadowRadius: 3,
					elevation: 2
				}}
			>
				<Text
					className={`${message.isUser
						? "text-primary-foreground"
						: "text-secondary-foreground"} text-base`}
				>
					{message.text}
				</Text>
			</View>
			{/* Refined timestamp */}
			<Text className={`text-[11px] text-muted-foreground/80 mt-1.5 ${message.isUser ? 'text-right mr-1' : 'text-left ml-1'}`}>
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
				// Making logo much smaller
				className="h-8 w-8 rounded-full mb-2"
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
		<TouchableOpacity onPress={onPress}>
			{/* Refined chip styling */}
			<View className="bg-secondary/70 px-3.5 py-2 rounded-xl my-1 border border-border/10">
				<Text className="text-secondary-foreground text-sm">{text}</Text>
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
			<StatusBar barStyle="light-content" backgroundColor="#1f2937" />

			<View
				// Refined header: removed shadow, adjusted padding
				className="px-4 py-2.5 flex-row items-center bg-background border-b border-border/40"
				// style prop removed
			>
				<Text className="text-foreground font-semibold text-lg flex-1">Bible Chat</Text>
				{/* Adjusted icon padding and color */}
				<TouchableOpacity className="p-1.5 mr-[-6px]">
					{/* TODO: Replace with actual theme color if needed */}
					<Ionicons name="menu-outline" size={26} className="text-muted-foreground" />
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
						<ActivityIndicator size="small" color="#e5e7eb" />
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
				{/* Refined Input Area Container */}
				<View className="border-t border-border/40 bg-background/95">
					<View className="flex-row items-center p-2.5 pb-3.5">
						<Input
							ref={inputRef}
							value={inputText}
							onChangeText={setInputText}
							placeholder="Ask about the Bible..."
							// placeholderTextColor removed, should inherit
							// Adjusted background, border, padding, removed inline shadow
							className="flex-1 mr-2.5 bg-input/60 border border-input/30 rounded-2xl px-4 py-2.5 text-base native:py-3"
							onSubmitEditing={handleSend}
							multiline
							blurOnSubmit={false} // Keep true if you want keyboard to dismiss on send
							style={{
								minHeight: 46, // Adjusted height
								maxHeight: 120,
								// Inline shadow removed
							}}
						/>
						<Button
							variant="default"
							// Adjusted size, removed inline shadow
							className={`rounded-full h-11 w-11 items-center justify-center p-0 ${!inputText.trim() || isLoading ? 'opacity-60' : ''}`}
							onPress={handleSend}
							disabled={isLoading || !inputText.trim()}
							// style prop removed to rely on variant styles
						>
							<Ionicons name="arrow-up" size={22} color="#FFFFFF" />
						</Button>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
