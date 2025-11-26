# AAC (Arabic Communication Board)

A cross-platform AAC (Augmentative & Alternative Communication) app for Arabic-speaking children built with Expo + TypeScript. The app ships with seeded core words and lets caregivers manage cards, categories, and settings completely offline after installation.

## Features
- RTL-first communication board with sentence bar, large card grid, and category bar
- Arabic Text-to-Speech with fallback to custom recorded audio per card
- Bilingual UI toggle (Arabic/English) that flips layout RTL/LTR and shows optional English labels
- Caregiver tools to add/edit/delete cards and categories, reorder categories, and toggle accessibility settings
- Local persistence using AsyncStorage with seed data in `assets/seedData.json`

## Running locally
1. Install dependencies (Node 18+ recommended):
   ```bash
   npm install
   ```
2. Start the Expo dev server:
   ```bash
   npm start
   ```
3. Use the Expo Go app or an emulator (`npm run android` / `npm run ios`) to load the project.

> Note: The project omits bundled icon/splash assets to avoid binary files in version control. You can add your own PNG assets and
> reference them in `app.json` under `icon`, `splash.image`, and `android.adaptiveIcon.foregroundImage` when preparing a store build.

## Building for testing
- **Android APK**: `expo build:android -t apk`
- **iOS Simulator/IPA**: `expo build:ios` (requires Apple credentials)

## Adding default words or categories
- Edit `assets/seedData.json` and add entries to `categories` and `cards`. The `storage` layer injects timestamps automatically on first run. After modifying seed data, reinstall the app or clear stored data to re-seed.

## Changing layout or colors
- Tweak the shared palette in `src/constants/colors.ts`.
- Card sizes respond to the `largeButtons` toggle (Settings screen) and layout logic in `HomeScreen`.

## Accessibility notes
- All text respects RTL direction.
- Large tap targets (~100px) with high-contrast labels.
- Sentence and action buttons remain visible at the top of the board for quick access.
