import { View, Text, SafeAreaView, TextInput } from "react-native";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatScreen() {
	return (
		<SafeAreaView className="flex-1 bg-background">
			<View className="flex-1 p-4">
				<Text className="text-foreground">Messages will appear here...</Text>
			</View>

			<View className="flex-row items-center p-4 border-t border-border">
				<Input
					placeholder="Ask a question..."
					placeholderTextColor="#a1a1aa"
					className="flex-1 mr-2 bg-input text-foreground border-0"
				/>
				<Button>
					{/* Button text will use default defined in component, or we can customize */}
					{/* Example: <Text className="text-primary-foreground">Send</Text> */}
				</Button>
			</View>
		</SafeAreaView>
	);
}
