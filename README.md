# 🎮 BGMI Name Stylist (bgmiid.eu.cc)

A production-ready, SEO-optimized web application to generate fancy, stylish BGMI player names using Unicode fonts, special symbols, and combo styles. Works flawlessly within BGMI's 14-character limit.

![Screenshot](./public/og-image.png) *(Preview of the app)*

---

## 📑 Table of Contents
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🏗️ Build Instructions](#️-build-instructions)
- [🌍 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

- **Fancy Name Generator**: Transform normal names into stylish fonts *(Cyrillic, Bold, Cursive, Outline)*.
- **Symbol Library**: 29+ special symbols specifically tested to work in BGMI.
- **Rule-Compliant Check**: Instantly highlights names that exceed the 14-character limit.
- **One-Click Copy**: Easily copy your stylized name to the clipboard.
- **Dark & Light Themes**: Beautiful UI with multiple themes for better accessibility.
- **Firebase Integration**: Built-in Analytics and backend extensibility.

## 🛠️ Tech Stack

- **Framework**: React Router / Vite
- **Styling**: Tailwind CSS & Framer Motion
- **Database/Backend**: Firebase (Admin & Client SDKs)
- **Deployment**: Node.js ready

## 📂 Project Structure

```text
bgmiid/
├── src/                     # React Router pages, assets & logic
│   ├── app/                 # React Router pages & API routes
│   ├── components/          # Reusable UI components
│   ├── utils/               # Utility functions & Firebase config
│   ├── data/                # Constants and static data
│   └── client-integrations/ # External widgets/embeddings
├── public/                  # Public assets and icons
├── test/                    # Test suites
├── .env.example             # Template for local environment variables
├── .gitignore               # Standard git ignore rules
├── package.json             # npm configuration
├── package-lock.json        # Dependency lockfile
├── vite.config.ts           # Vite bundler config
├── react-router.config.ts   # React Router framework config
├── netlify.toml             # Netlify build/deployment config
├── LICENSE                  # MIT License
└── README.md                # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20 or higher
- **npm**: Package manager

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bgmiid.git
   cd bgmiid
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Copy the example environment variables file and update it with your credentials:
   ```bash
   cp .env.example .env
   ```
   *Example `.env` configuration:*
   ```env
   FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"..."}'
   NEXT_PUBLIC_CREATE_APP_URL="http://localhost:4000"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:4000](http://localhost:4000) to view it in your browser.

## 🏗️ Build Instructions

To build the project for production, run the following command:

```bash
npm run build
```

## 🌍 Deployment

Deploy the `build` or `dist` folder to your favorite hosting provider *(Vercel, Firebase Hosting, Netlify, etc.)* or run the server locally with `npm start`.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
