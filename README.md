# Bible AI Explorer - Mobile App

## Overview
Bible AI Explorer is a powerful mobile application that leverages AI to help users explore, understand, and study the Bible. This app features a sophisticated AI assistant that answers questions about scripture, provides contextual insights, and helps users deepen their biblical understanding—all with a sleek gold and black design aesthetic.

## Features

- **AI-Powered Bible Exploration**: Ask questions about the Bible and receive AI-generated answers based on scripture
- **Vector Search Technology**: Utilizes AstraDB's vector search for accurate contextual understanding of biblical content
- **Personal Bible Study Notes**: Create, save, and organize study notes linked to specific verses
- **Chat History**: Access your previous questions and answers for continued study
- **Modern UI**: Elegant gold and black themed interface designed specifically for mobile devices
- **Android Focus**: Optimized primarily for Android devices

## Tech Stack

- **React Native / Expo**: For cross-platform mobile development
- **TypeScript**: For type-safe code
- **Expo Router**: For navigation and routing
- **AstraDB**: Vector database for Bible text storage and semantic search
- **Clerk**: For user authentication
- **OpenAI**: For AI-powered responses
- **AsyncStorage**: For local data persistence

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn package manager
- Expo CLI (`npm install -g expo-cli`)
- An AstraDB account with API credentials
- A Clerk account for authentication
- OpenAI API key

### Installation

1. **Clone this repository**:
   ```bash
   git clone https://github.com/yourusername/bible-ai-explorer-mobile.git
   cd bible-ai-explorer-mobile
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the following variables:
   ```
   EXPO_PUBLIC_ASTRA_DB_TOKEN=your_astradb_token
   EXPO_PUBLIC_ASTRA_DB_ENDPOINT=your_astradb_endpoint
   EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

4. **Start the development server**:
   ```bash
   npx expo start
   ```

5. **Run on your device**:
   - Scan the QR code with the Expo Go app (Android)
   - Or press 'a' in the terminal to launch on an Android emulator

## Project Structure

```
bible-ai-explorer-mobile/
├── app/                  # Expo Router app directory
│   ├── (auth)/           # Authentication screens
│   ├── (main)/           # Main app screens
│   ├── _layout.tsx       # Root layout component
│   └── index.tsx         # Entry point
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── services/             # API and service integrations
├── utils/                # Utility functions
├── styles/               # Global styles and themes
├── types/                # TypeScript type definitions
├── .env                  # Environment variables (git-ignored)
├── app.json              # Expo configuration
└── package.json          # Dependencies and scripts
```

## Development Roadmap

- **Phase 1**: Project setup and environment configuration
- **Phase 2**: Core Bible AI functionality implementation
- **Phase 3**: Note-taking feature implementation
- **Phase 4**: Offline capabilities and performance optimization
- **Phase 5**: Testing and deployment to Google Play Store

## Contributing

This project is currently in its initial development phase. Contribution guidelines will be provided once the basic structure is established.

## License

[MIT License](LICENSE)

## Acknowledgments

- This mobile app is a migration of the original NextJS-based Bible AI Explorer web application
- Special thanks to the contributors of the KJV Bible text used for the vector database
