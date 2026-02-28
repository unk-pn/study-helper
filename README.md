<p align="center">
    <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="center" width="30%">
</p>
<p align="center"><h1 align="center">STUDY-HELPER</h1></p>
<p align="center">
	<em>Master any subject with interactive flashcards and smart study tools</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/unk-pn/study-helper?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/unk-pn/study-helper?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/unk-pn/study-helper?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/unk-pn/study-helper?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<br>

## Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Installation](#-installation)
  - [Usage](#-usage)
  - [Testing](#-testing)
- [Project Roadmap](#-project-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## Overview

**Study Helper** is a web application designed to make exam preparation more effective and organized. Built with Next.js 16 and React 19, it provides students with powerful tools to structure their knowledge, memorize material, and successfully pass exams through an intuitive flashcard system.

The application helps you create subjects, build comprehensive question banks with detailed answers, and study using interactive flashcards with a self-assessment system. All your data is securely stored and accessible only after authentication.

## Features

### 📚 **Subject Management**

- Create and organize subjects by topic
- Set exam dates and track deadlines
- Monitor preparation status
- View question counts per subject

### ❓ **Question Bank**

- Add unlimited questions with detailed answers
- Rich text support for complex explanations
- Easy editing and deletion
- Search and filter capabilities

### 🎴 **Interactive Flashcards**

- Study with flip-card interface
- Self-assessment system
- Track your progress during sessions
- Randomized card order for better learning

### 📄 **PDF Export**

- Export questions to PDF format
- Perfect for offline study
- Print-friendly formatting
- Organized by subject

### 🔐 **Secure Authentication**

- Email verification system
- Password recovery via verification code
- Secure password hashing with bcrypt
- Session management with NextAuth

### 🌍 **Internationalization**

- Full support for English and Russian
- Automatic language detection
- Easy language switching
- Persistent language preferences

### 🎨 **Modern UI/UX**

- Clean and intuitive interface
- Responsive design for all devices
- Dark/Light theme support (via Gravity UI)

## Technology Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Gravity UI Kit** - Components library
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend

- **Next.js API Routes** - Server-side API
- **NextAuth** - Authentication
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Database
- **bcryptjs** - Password hashing

### Tools & Libraries

- **i18next** - Internationalization
- **React PDF** - PDF generation
- **Resend** - Email service
- **Jest** - Testing framework
- **Testing Library** - Component testing
- **ESLint** - Code linting

## Project Structure

```sh
└── study-helper/
    ├── LICENSE
    ├── README.md
    ├── eslint.config.mjs
    ├── global.d.ts
    ├── i18next.d.ts
    ├── jest.config.ts
    ├── jest.setup.ts
    ├── next-auth.d.ts
    ├── next.config.ts
    ├── package.json
    ├── prisma/
    │   ├── migrations/
    │   └── schema.prisma       # Database schema (User, Subject, Question models)
    ├── prisma.config.ts
    ├── redux-persist.d.ts
    ├── tsconfig.json
    └── src/
        ├── app/                # Next.js App Router pages
        │   ├── api/            # API routes
        │   ├── auth/           # Authentication pages
        │   └── subjects/       # Subject pages
        ├── components/         # Shared components
        │   ├── Navbar/
        │   ├── Loader/
        │   └── FormFields/
        ├── features/           # Feature-specific components
        │   ├── auth/
        │   ├── subjects/
        │   ├── questions/
        │   ├── cards/
        │   ├── guest/
        │   └── home/
        ├── hooks/              # Custom React hooks
        ├── i18n/               # Internationalization
        │   └── locales/
        ├── lib/                # Utility functions
        ├── store/              # Redux store and slices
        └── proxy.ts
```

## Getting Started

### Prerequisites

Before getting started with study-helper, ensure your runtime environment meets the following requirements:

- **Node.js:** 20.x or higher
- **Package Manager:** npm, yarn, pnpm, or bun
- **Database:** PostgreSQL (local or hosted)
- **Email Service:** Resend account (for email verification)

### Installation

1. Clone the study-helper repository:

```sh
git clone https://github.com/unk-pn/study-helper
```

2. Navigate to the project directory:

```sh
cd study-helper
```

3. Install the project dependencies:

```sh
npm install
```

4. Set up environment variables:

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/study_helper"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"
RESEND_MAIL="noreply@yourdomain.com"
```

5. Set up the database:

```sh
npx prisma migrate dev
```

### Usage

**Development mode:**

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production build:**

```sh
npm run build
npm start
```

### Testing 

> *More tests will be added later*

Run the test suite:

```sh
npm test
```

Run tests in watch mode:

```sh
npm run test:watch
```

<!-- ##  Project Roadmap

- [X] **Core Features**
  - [X] User authentication with email verification
  - [X] Subject management (CRUD)
  - [X] Question bank (CRUD)
  - [X] Interactive flashcard study sessions
  - [X] PDF export functionality

- [X] **User Experience**
  - [X] Multilingual support (EN/RU)
  - [X] Responsive design
  - [X] Progress tracking
  - [X] Theme support

- [ ] **Future Enhancements**
  - [ ] Spaced repetition algorithm
  - [ ] Study statistics and analytics
  - [ ] Collaborative study groups
  - [ ] Mobile app (React Native)
  - [ ] AI-powered question generation
  - [ ] Image support in questions/answers
  - [ ] Tags and categories for questions
  - [ ] Import/Export data (JSON, CSV) -->

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **[Gravity UI](https://gravity-ui.com/)** - Beautiful and accessible UI components
- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[Resend](https://resend.com/)** - Email API for developers

## 📧 Contact

For questions, suggestions, or feedback:

- **GitHub Issues**: [Create an issue](https://github.com/unk-pn/study-helper/issues)
- **Discussions**: [Join the discussion](https://github.com/unk-pn/study-helper/discussions)

---

**Happy studying! 🎓**
