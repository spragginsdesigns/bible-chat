import { View, Text, SafeAreaView, TextInput } from "react-native";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { styled } from "nativewind";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledInput = styled(Input);

export default function ChatScreen() {
	return (
		<StyledSafeAreaView className="flex-1 bg-background">
			<StyledView className="flex-1 p-4">
				<StyledText className="text-foreground">
					Messages will appear here...
				</StyledText>
			</StyledView>

			<StyledView className="flex-row items-center p-4 border-t border-border">
				<StyledInput
					placeholder="Ask a question..."
					placeholderTextColor="#a1a1aa"
					className="flex-1 mr-2 bg-input text-foreground border-0"
				/>
				<Button>
					{/* Button text will use default defined in component, or we can customize */}
					{/* Example: <Text className="text-primary-foreground">Send</Text> */}
				</Button>
			</StyledView>
		</StyledSafeAreaView>
	);
}
