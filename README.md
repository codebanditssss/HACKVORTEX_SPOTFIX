# 📱 SpotFix — Citizen Complaint Management App

SpotFix is a mobile-first solution empowering citizens to raise, track, and resolve civic issues in their locality. It connects users with municipal authorities and ensures quick redressal of complaints like potholes, garbage dumps, waterlogging, and more.  

Built with: React Native (Expo) · Firebase · Node.js (for admin dashboard)  

---

## 🚀 Features

### User App (Mobile - Expo)
- Raise Complaint: Upload issue photos, add details, and report location
- Track Complaint: See real-time status, progress stages, and notifications
- Nearby Issues: View reported problems in your area with map pins
- Profile Section: Manage user details and complaint history

### Admin Web Dashboard
- Complaint Management: Assign, track, and resolve complaints
- Analytics & Stats: Visual insights into area-wise complaint trends
- User Management: Moderate users and handle feedback

---

## 🛠️ Tech Stack

| Area         | Technology     |
|--------------|----------------|
| Mobile App   | React Native (Expo) |
| Backend      | Firebase (Auth, Firestore, Storage) |
| Admin Panel  | React + Tailwind + Firebase |
| Maps & Geo   | MapView (Expo), Geolocation API |
| UI Kit       | NativeBase / React Native Elements |

---

## 📁 Project Structure

```
spotfix/
├── app/
│   ├── (auth)/
│   │   ├── login.js
│   │   └── signup.js
│   ├── (onboarding)/
│   │   └── index.js
│   ├── (profile-setup)/
│   │   └── index.js
│   ├── (tabs)/
│   │   ├── home/
│   │   │   └── index.js
│   │   ├── raise/
│   │   │   └── index.js
│   │   ├── track/
│   │   │   └── index.js
│   │   ├── nearby/
│   │   │   └── index.js
│   │   ├── profile/
│   │   │   └── index.js
│   │   ├── _layout.js
│   │   └── index.js
│   └── _layout.js
├── assets/
│   ├── fonts/
│   └── images/
├── components/
│   ├── auth/
│   ├── common/
│   └── onboarding/
├── constants/
│   ├── theme.js
│   └── index.js
├── hooks/
│   └── useAuth.js
├── services/
│   ├── auth.js
│   └── storage.js
├── utils/
│   └── helpers.js
├── .gitignore
├── app.json
├── babel.config.js
├── package.json
└── README.md
```

## 📱 App Navigation Structure

1. Onboarding Flow
   - Welcome screens for first-time users
   - App introduction and features

2. Authentication
   - Login screen
   - Sign up screen
   - Password recovery

3. Profile Setup
   - User details collection
   - Location preferences

4. Main Tab Navigation
   - Home: Dashboard with statistics
   - Raise: Complaint submission form
   - Track: List of user complaints
   - Nearby: Map view of local issues
   - Profile: User settings and info

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/codebanditssss/HACKVORTEX_SPOTFIX.git
cd HACKVORTEX_SPOTFIX
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npx expo start
```

4. Run on your device
   - Scan QR code with Expo Go app (Android)
   - Press 'i' for iOS simulator
   - Press 'a' for Android emulator

## 📄 Environment Setup

1. Node.js & npm
2. Expo CLI
3. Android Studio (for emulator)
4. Xcode (for iOS development, Mac only)
5. Firebase project configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📝 License

This project is licensed under the MIT License.
