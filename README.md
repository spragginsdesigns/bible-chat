# Bible Chat App

## Overview

Bible Chat is a mobile application that leverages AI to help users explore, understand, and study the Bible. This app features a sophisticated AI assistant that answers questions about scripture, provides contextual insights, and helps users deepen their biblical understanding—all with a sleek gold and black design aesthetic.

## Features

- **AI-Powered Bible Exploration**: Ask questions about the Bible and receive AI-generated answers based on scripture
- **Modern UI**: Elegant gold and black themed interface designed for mobile devices
- **Suggestion Chips**: Quick access to common biblical questions
- **Chat History**: View your conversation with the AI assistant

## Tech Stack

- **React Native / Expo**: For cross-platform mobile development
- **TypeScript**: For type-safe code
- **Tailwind CSS / NativeWind**: For styling
- **OpenAI SDK**: For AI-powered responses
- **Expo Router**: For navigation

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- pnpm package manager (`npm install -g pnpm`)
- OpenAI API key

### Installation

1. **Clone this repository**:

   ```bash
   git clone https://github.com/yourusername/bible-chat-app.git
   cd bible-chat-app
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory by copying the example:

   ```bash
   cp .env.example .env
   ```

   Then edit the `.env` file and add your OpenAI API key:

   ```
   OPENAI_API_KEY="your-openai-api-key-here"
   ```

4. **Windows-specific setup**:

   On Windows, you may need to set the environment variable in PowerShell before starting the app:

   ```powershell
   $env:OPENAI_API_KEY="your-openai-api-key-here"
   ```

5. **Start the development server**:

   ```bash
   pnpm expo start
   ```

6. **Run on your device**:
   - Scan the QR code with the Expo Go app
   - Or press 'a' in the terminal to launch on an Android emulator
   - Or press 'i' to launch on iOS simulator

## Troubleshooting

### API Key Issues on Windows

If you experience issues with the environment variables not being recognized on Windows:

1. Set the environment variable in your terminal session:

   ```powershell
   $env:OPENAI_API_KEY="your-openai-api-key-here"
   ```

2. Restart the development server:
   ```powershell
   pnpm expo start --clear
   ```

### GitHub Security Warnings

If you receive GitHub security warnings about API keys in your code:

1. Ensure you're not committing your `.env` file (it should be in `.gitignore`)
2. Double-check that no API keys are hardcoded in your source files
3. Use the `.env.example` file as a template without real keys

## License

[MIT License](LICENSE)

## Acknowledgments

- Built with Expo and React Native
- Powered by OpenAI's language models
