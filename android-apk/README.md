# SahYog — Android APK

WebView-based Android app that wraps the mobile web app.

## APK Download
The built APK is available at ../sahyog/public/sahyog.apk.

## Build Requirements
- Android Studio
- Java 17+
- Gradle 8.11.1

## Build Steps
\\\ash
# Set JAVA_HOME to Android Studio JBR
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr

# Build debug APK
gradlew.bat assembleDebug

# Output: app/build/outputs/apk/debug/app-debug.apk
\\\

## Configuration
- Target URL: https://shayog-rb55.vercel.app/customer/dashboard
- Custom User-Agent: SahYogApp/1.0 (added to default UA)
- WebView with JS, LocalStorage, DOM Storage enabled

## Key Files
- pp/src/main/java/com/sahyog/app/MainActivity.java — Main WebView wrapper
- pp/src/main/res/layout/activity_main.xml — Layout
- pp/src/main/AndroidManifest.xml — Permissions + config
