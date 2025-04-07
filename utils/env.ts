// Environment variables utility
import { Platform } from "react-native";
import { OPENAI_API_KEY as ENV_OPENAI_API_KEY } from "@env";

// Fallback API key warning - DO NOT hardcode actual keys
// For development purposes, prompt the user to set environment variables
const FALLBACK_WARNING = "API key not found. Please set OPENAI_API_KEY in your environment variables.";

/**
 * Gets environment variables safely with type checking
 */
export function getEnv() {
	// For Web: process.env is injected by Webpack/Vite
	// For Native: Constants.expoConfig.extra contains values from app.config.js

	// Use environment variable without hardcoded fallback
	const apiKey = ENV_OPENAI_API_KEY || "";

	const env = {
		OPENAI_API_KEY: apiKey
	};

	// Validate that we have the required environment variables
	if (!env.OPENAI_API_KEY) {
		console.warn(FALLBACK_WARNING);
	}

	return env;
}
