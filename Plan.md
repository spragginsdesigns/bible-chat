# Bible AI Explorer: React Native Expo Migration Plan

## Overview

This document outlines the plan to migrate the **Bible AI Explorer** web application from its current Next.js implementation to a **React Native Expo mobile application**. The primary target platform is Android. The goal is to retain the core question-answering functionality while introducing new features like note-taking and implementing a distinct gold and black theme [cite: uploaded:bible-ai-explorer.zip/docs/NextJS_to_Expo_Migration_Plan.md].

## Key Considerations

- **Core Functionality:** The essential Bible AI question-answering capability must be preserved [cite: uploaded:bible-ai-explorer.zip/docs/NextJS_to_Expo_Migration_Plan.md].
- **Vector Database:** Integration with AstraDB for Bible text retrieval will be maintained but is _not_ part of the initial migration scope [cite: uploaded:bible-ai-explorer.zip/docs/NextJS_to_Expo_Migration_Plan.md].
- **AI Responses:** The existing system prompt for generating AI responses will remain consistent [cite: uploaded:bible-ai-explorer.zip/docs/NextJS_to_Expo_Migration_Plan.md].
- **New Features:**
  - Note-taking capabilities (creation, editing, local storage) need to be added.
  - A specific gold and black color scheme needs to be implemented [cite: uploaded:bible-ai-explorer.zip/docs/NextJS_to_Expo_Migration_Plan.md].
- **Tavily Search:** The current Tavily search integration might require replacement or modification for the mobile environment [cite: uploaded:bible-ai-explorer.zip/docs/NextJS_to_Expo_Migration_Plan.md].
- **Platform:** The initial development focus is the **Android platform** [cite: uploaded:bible-ai-explorer.zip/docs/NextJS_to_Expo_Migration_Plan.md].

## Detailed Migration Plan

The migration process is divided into four distinct phases [cite: uploaded:bible-ai-explorer.zip/docs/NextJS_to_Expo_Migration_Plan.md]:

### Phase 1: Project Setup and Environment Configuration

- Initialize a new React Native Expo project:
  ```bash
  npx create-expo-app@latest BibleAIExplorerMobile
  ```
- Install necessary dependencies:
  - `react-navigation` (and its related packages like `@react-navigation/native`, `@react-navigation/stack`, `react-native-screens`, `react-native-safe-area-context`)
  - `react-native-paper` (or another UI library for theming/components)
  - Review `package.json` from the Next.js project and install relevant non-web-specific libraries [cite: uploaded:bible-ai-explorer.zip/package.json].
- Configure the project specifically for Android development (e.g., `app.json` settings).
- Set up version control (Git) and initialize the repository.

### Phase 2: Core Functionality Migration

- **Backend API Setup:**
  - Develop or adapt the backend API using Python (Flask/FastAPI recommended).
  - Ensure API endpoints align with the Next.js structure (e.g., `/api/ask-question`) [cite: uploaded:bible-ai-explorer.zip/src/app/api/ask-question/route.ts].
  - Implement the core logic for processing Bible queries, reusing the existing system prompt [cite: uploaded:bible-ai-explorer.zip/src/utils/systemPrompt.ts] and data handling mechanisms.
  - Deploy the backend API (e.g., using Linode, Vercel Serverless Functions, or another provider).
- **Frontend Implementation:**
  - Recreate UI components using React Native equivalents (e.g., `View`, `Text`, `TextInput`, `FlatList`, `TouchableOpacity`). Adapt designs from existing components [cite: uploaded:bible-ai-explorer.zip/src/components/BibleAIExplorer.tsx, uploaded:bible-ai-explorer.zip/src/components/QuestionInput.tsx, uploaded:bible-ai-explorer.zip/src/components/ChatHistory.tsx, uploaded:bible-ai-explorer.zip/src/components/ClientResponse.tsx].
  - Build the primary chat interface.
  - Integrate API calls to the backend for submitting questions and receiving answers.
  - Implement state management (React Context API is often sufficient for moderate complexity, or consider Zustand/Redux if needed) to manage chat history, loading states, and user input.

### Phase 3: Feature Enhancement

- **Note-Taking Feature:**
  - Design the UI screens for creating, viewing, editing, and deleting notes.
  - Implement local persistence for notes using `AsyncStorage` or a more robust solution like `expo-sqlite` or `realm-js` if complex querying is needed.
  - _(Optional)_ Plan for data synchronization if user accounts and cloud backup are future considerations.
- **UI/UX Adaptation:**
  - Implement the gold and black theme using `react-native-paper`'s Theming or custom styling.
  - Ensure the layout is responsive and adapts well to different Android device screen sizes and orientations.
  - Focus on intuitive mobile navigation patterns (e.g., using StackNavigator or TabNavigator from `react-navigation`).
- **Tavily Alternative / Search Integration:**
  - Research and select a suitable mobile-friendly alternative for web search/information retrieval if Tavily's direct integration proves problematic or unsuitable.
  - Implement the chosen search functionality within the app.

### Phase 4: Testing and Deployment

- **Testing:**
  - Conduct thorough testing on various physical Android devices and emulators.
  - Validate all core features: question answering, note-taking, search (if implemented).
  - Test user flows, edge cases, and error handling.
  - Address any UI/UX inconsistencies or performance bottlenecks.
- **Deployment:**
  - Prepare the application for deployment according to Expo and Android guidelines.
  - Generate the Android App Bundle (`.aab`) or APK (`.apk`) for distribution.
  - Follow the procedures for submitting the app to the Google Play Store (if intended).
  - _(Optional)_ Set up a Continuous Integration/Continuous Deployment (CI/CD) pipeline (e.g., using EAS Build/Submit, GitHub Actions) for streamlined updates.

## Project Structure (VS Code Outline)

A recommended project structure:

````

BibleAIExplorerMobile/
├── app/ # Main app entry point, navigation, screens
│ ├── screens/ # Individual screen components
│ │ ├── ChatScreen.tsx
│ │ ├── NotesListScreen.tsx
│ │ ├── NoteDetailScreen.tsx
│ │ └── SettingsScreen.tsx # (Example)
│ ├── navigation/ # Navigation setup (Stack, Tabs)
│ │ └── AppNavigator.tsx
│ └── \_layout.tsx # Expo Router layout (if using file-based routing)
│ └── index.tsx # Expo Router entry (if using file-based routing)
├── components/ # Reusable UI components shared across screens
│ ├── ChatBubble.tsx
│ ├── NoteEditor.tsx
│ ├── NoteListItem.tsx
│ ├── StyledTextInput.tsx
│ └── LoadingIndicator.tsx
├── services/ # API interaction and external services
│ ├── api.ts # Functions for backend communication
│ ├── storage.ts # Functions for AsyncStorage/local DB interaction
│ └── searchService.ts # Functions for the search feature
├── context/ # React Context API providers (or state management)
│ ├── AuthContext.tsx # (If authentication is added)
│ └── ChatContext.tsx
├── hooks/ # Custom React Hooks
│ └── useKeyboardVisible.ts # (Example)
├── utils/ # Utility functions, helpers
│ └── helpers.ts
├── constants/ # Constant values (e.g., colors, API URLs)
│ ├── theme.ts # Theme configuration (colors, fonts)
│ └── apiConfig.ts
├── assets/ # Static assets (images, fonts)
│ ├── fonts/
│ └── images/
├── .gitignore
├── app.json # Expo configuration file
├── eas.json # EAS Build configuration
├── package.json
└── tsconfig.json

```
*Note: The structure might vary slightly depending on whether you use Expo Router (file-based routing) or React Navigation's programmatic setup.*

## Example Git Commit Messages

Use clear and concise commit messages following conventional commit standards if possible:

* `feat: Initial setup of React Native Expo project with TypeScript`
* `feat: Install and configure React Navigation`
* `feat: Implement basic ChatScreen UI layout`
* `feat: Add react-native-paper and base theme setup`
* `feat(api): Setup backend API service structure`
* `feat(api): Implement /ask-question endpoint integration`
* `feat: Implement chat state management using Context API`
* `feat(notes): Add NotesListScreen and NoteDetailScreen`
* `feat(notes): Implement note persistence using AsyncStorage`
* `style: Apply gold and black theme across components`
* `fix: Resolve keyboard overlapping input field on Android`
* `test: Add basic unit tests for api service`
* `chore: Configure EAS build for Android`
* `docs: Update README with setup and run instructions`
```

This Markdown file provides a structured version of your plan. Let me know if you'd like any adjustments or further details added!
````
