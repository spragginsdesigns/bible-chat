/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				border: "#333333", // Dark grey border
				input: "#404040", // Slightly lighter grey for input backgrounds
				ring: "#D4AF37", // Gold for focus rings
				background: "#121212", // Very dark grey/off-black background
				foreground: "#E0E0E0", // Light grey/off-white text
				primary: {
					DEFAULT: "#D4AF37", // Gold
					foreground: "#121212" // Dark text on gold background
				},
				secondary: {
					DEFAULT: "#333333", // Dark grey for secondary elements
					foreground: "#E0E0E0" // Light text on secondary background
				},
				destructive: {
					DEFAULT: "#b91c1c", // Red for destructive actions
					foreground: "#E0E0E0" // Light text on red background
				},
				muted: {
					DEFAULT: "#27272a", // Muted background
					foreground: "#a1a1aa" // Muted foreground text
				},
				accent: {
					DEFAULT: "#404040", // Accent background
					foreground: "#E0E0E0" // Accent foreground text
				},
				popover: {
					DEFAULT: "#1E1E1E", // Popover background
					foreground: "#E0E0E0" // Popover text
				},
				card: {
					DEFAULT: "#1E1E1E", // Card background (slightly lighter dark)
					foreground: "#E0E0E0" // Card text
				}
			}
		}
	},
	plugins: []
};
