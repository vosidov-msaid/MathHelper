# Math Homework Helper

A mobile app (Expo SDK 54 / React Native) that scans a photo of a math problem, solves it with an AI model, and helps you review and practice what you've learned — no account or sign-in required.

## Features

- **Dashboard** — take or upload a photo of a math problem; it's sent to an AI model that transcribes, solves, and explains it step by step. Save any result for later. If the scan fails because the device is offline, it's queued and retried automatically once you reconnect (a "Pending Scans" list on the Dashboard shows progress; a true API-level failure instead shows an error with a manual Retry button).
- **Saved** — a compact list of everything you've saved; tap one to see the full image, answer, and breakdown, with a Remove action.
- **Learn** — a course catalog (Elementary → Middle School → High School → College, 17 courses / 68 lessons) with real explanations, key points, and worked examples. Mark lessons "Reviewed" to track real progress.
- **Quiz** — 12 short quizzes across Easy/Medium/Hard difficulty. Finishing one shows your score, an Attempt History trend (last 20 attempts, after the first retake) and a full per-question review (correct answer highlighted, your pick marked if wrong, with an explanation). Best score per quiz is remembered.
- **Settings** — Theme (Light / System / Dark — System follows the OS appearance live via `useColorScheme`), Push Notifications / Daily Reminder (schedules a real local reminder at a custom time), Sound Effects (plays a confirmation chime on save / mark-reviewed / quiz-complete), plus Help & Support and Privacy Policy screens.

There is no backend and no user accounts. Everything you save lives only on your device (via `AsyncStorage`); the only thing that ever leaves the device is the photo sent to OpenRouter for analysis.

## Tech stack

- [Expo SDK 54](https://docs.expo.dev/) + [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing, TypeScript)
- [OpenRouter](https://openrouter.ai/) chat-completions API (`deepseek/deepseek-v4.1-flash`, vision-capable) for solving scanned problems
- `@react-native-async-storage/async-storage` for all local persistence (saved problems, learn progress, quiz scores, settings)
- `expo-image-picker` (camera/photo library), `expo-audio` (sound effects), `expo-notifications` (daily reminder), `expo-network` (offline detection for the scan retry queue)
- Plain `StyleSheet` + a small `ThemeContext` for light/dark theming — no UI/styling library

## Setup

### Prerequisites

- Node.js
- An [OpenRouter](https://openrouter.ai/) API key (for the photo-scanning feature)

### Install

```bash
npm install
```

### Configure environment variables

Copy the example file and fill in your key:

```bash
cp .env.example .env
```

```
EXPO_PUBLIC_OPENROUTER_API_KEY=sk-or-v1-...
```

`.env` is git-ignored — never commit your real key. `.env.example` (tracked) documents the variable name for anyone else setting up the project.

**Security note**: because this is a frontend-only app with no backend, the key is read via `process.env.EXPO_PUBLIC_OPENROUTER_API_KEY` and gets inlined into the shipped JS bundle (Expo's convention for any `EXPO_PUBLIC_*` variable). That means it's extractable by anyone who inspects the built app or web bundle — fine for personal/demo use, but before any public release you'd want a small backend proxy that holds the key server-side instead.

### Run

```bash
npx expo start
```

Then press `w` for web, `a` for an Android emulator, `i` for an iOS simulator (macOS only), or scan the QR code with [Expo Go](https://expo.dev/go) on a physical device.

Other scripts: `npm run android`, `npm run ios`, `npm run web`, `npm run lint`.

> `npm run reset-project` is a leftover script from the original Expo template scaffold — it moves `app/` into `app-example/` and creates a blank app. **Don't run it**; it would discard this entire app.

## Project structure

```
app/
  _layout.tsx                      # Root layout — providers, StatusBar
  (tabs)/
    _layout.tsx                    # Tab bar (5 tabs, theme-aware colors)
    index.tsx                      # Dashboard
    saved/                         # index (list) + [problemId] (preview)
    learn/                         # index (catalog) + [courseId] + lesson/[lessonId]
    quiz/                          # index (catalog) + [quizId] (play + results)
    settings/                      # index + help + privacy
components/                        # Shared presentational components
contexts/                          # SavedProblems, LearnProgress, QuizProgress, Settings, Theme
data/                              # courses.ts, quizzes.ts, settings.ts (static content/config)
lib/                               # openrouter.ts, notifications.ts, sounds.ts, time.ts
constants/                         # colors.ts (light/dark palettes), layout.ts (spacing/sizes)
assets/sounds/confirm.wav          # Synthesized confirmation chime (sound effects)
```

Routes that take a dynamic segment (`[courseId]`, `[lessonId]`, `[quizId]`, `[problemId]`) are plain sibling files, not nested inside a same-named folder with an `index.tsx` — that pattern previously caused a real routing bug in this app (Expo Router misrouted an `index` segment as a dynamic param), so it's deliberately avoided throughout.

## Configuration reference (`app.json`)

| Plugin | Purpose |
|---|---|
| `expo-router` | File-based routing |
| `expo-splash-screen` | Splash screen image/background |
| `expo-image-picker` | Camera + photo library access, with the permission prompt text shown to the user |
| `expo-audio` | Sound effect playback |
| `expo-notifications` | Daily reminder local notification |
| `expo-asset` | Required peer dependency of `expo-audio` |
| `@react-native-community/datetimepicker` | Native time picker for setting a custom Daily Reminder time |

Other notable settings: `scheme: mathhomeworkhelper` (deep-link scheme), `experiments.typedRoutes: true` (Expo Router generates typed route params), `experiments.reactCompiler: true`.

## Local data (AsyncStorage keys)

No data is ever sent to a server except the photo sent to OpenRouter for solving. Everything else is stored under these keys, entirely on-device:

| Key | What it holds |
|---|---|
| `math-homework-helper/saved-problems` | Saved problems: image (base64 data URI), question, subject, answer, steps, timestamp |
| `math-homework-helper/reviewed-lessons` | Set of lesson IDs marked "Reviewed" in Learn |
| `math-homework-helper/quiz-best-scores` | Best score per quiz |
| `math-homework-helper/quiz-attempts` | Last 20 attempts per quiz (score, total, timestamp), shown as an Attempt History trend on the results screen |
| `math-homework-helper/scan-queue` | Scans that failed due to no connectivity, queued for automatic retry on reconnect |
| `math-homework-helper/settings` | Notifications / Theme (`light`/`dark`/`system`) / Sound Effects / Daily Reminder toggle values, plus the custom reminder hour/minute |

## Known limitations

- **No accounts** — by design. There's nothing to back up or sync across devices; uninstalling the app (or clearing its storage) deletes everything.
- **Notifications on web**: local notifications aren't supported there, so the toggle persists but no notification actually fires. On native, local notifications work fine in Expo Go — only *remote/push* notifications require a development build (unrelated to this app's Daily Reminder feature, which is local-only; `expo-notifications` prints an informational console message about this remote-push limitation on Android that this app explicitly suppresses via `LogBox.ignoreLogs`, since it doesn't apply here).
- **OpenRouter key exposure** — see the Security note above.
