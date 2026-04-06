# Sim-Circuit 🧠⚡

<div align="center">

![Sim-Circuit Banner](https://img.shields.io/badge/Sim--Circuit-Beta-cyan?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)

**The World's First Generative Digital Twin for Electronics**

*Engineer circuit architectures from prompt to production in seconds*

[🚀 Live Demo](https://sim-circuit.vercel.app) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/yourusername/sim-circuit/issues) • [💡 Request Feature](https://github.com/yourusername/sim-circuit/issues)

</div>

---

## ✨ Overview

Sim-Circuit revolutionizes electronics design by combining artificial intelligence with interactive circuit simulation. Describe your circuit in natural language, and watch as our generative AI creates a complete, simulatable digital twin complete with schematic, bill of materials, and firmware code.

### 🎯 Key Features

- **🧠 Generative AI Design**: Transform natural language descriptions into complete circuit schematics
- **🎮 Interactive Simulation**: Real-time circuit simulation with visual feedback and serial monitoring
- **📋 Bill of Materials**: Automatically generated component lists with sourcing information
- **💻 Firmware Generation**: AI-generated microcontroller code ready for deployment
- **🔐 Secure Authentication**: Firebase-powered user management and project persistence
- **🎨 Modern UI**: Sleek, cyberpunk-inspired interface with smooth animations
- **📱 Responsive Design**: Works seamlessly across desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### Circuit Design & Simulation
- **React Flow** - Interactive node-based circuit diagrams
- **Custom Simulation Engine** - Real-time circuit state simulation

### Backend & Infrastructure
- **Firebase** - Authentication, database, and hosting
- **Vercel** - Deployment and serverless functions

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Firebase project (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sim-circuit.git
   cd sim-circuit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication with Email/Password provider
   - Copy your Firebase config to `src/utils/firebase.ts`

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Sign up or log in to start designing circuits!

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage

### Creating Your First Circuit

1. **Sign In**: Create an account or log in with existing credentials
2. **Describe Your Circuit**: Use natural language to describe what you want to build
   - Example: "Create a blinking LED circuit with a push button to control the timing"
3. **Watch the Magic**: Our AI generates:
   - Interactive circuit schematic
   - Complete bill of materials
   - Microcontroller firmware code
4. **Simulate**: Run the simulation to see your circuit in action
5. **Monitor**: View serial output and debug your design

### Advanced Features

- **Real-time Collaboration**: Share your designs with team members
- **Export Options**: Download schematics, BOM, and code
- **Version History**: Track changes and revert to previous versions
- **Component Library**: Access a vast library of electronic components

## 🎨 Screenshots

<div align="center">

### Landing Page
<img src="https://via.placeholder.com/800x400/0f172a/00f3ff?text=Landing+Page" alt="Sim-Circuit Landing Page" width="80%"/>

### Circuit Design Interface
<img src="https://via.placeholder.com/800x400/0f172a/00f3ff?text=Circuit+Design" alt="Circuit Design Interface" width="80%"/>

### Simulation in Action
<img src="https://via.placeholder.com/800x400/0f172a/00f3ff?text=Live+Simulation" alt="Live Circuit Simulation" width="80%"/>

</div>

## 🏗️ Architecture

```
src/
├── components/          # React components
│   ├── LandingPage.tsx  # Welcome screen
│   ├── AuthPage.tsx     # Authentication
│   ├── SimulationWorkspace.tsx  # Main design interface
│   ├── CircuitCanvas.tsx # Circuit diagram renderer
│   └── ...
├── hooks/              # Custom React hooks
│   └── useOrchestrator.ts  # AI orchestration logic
├── utils/              # Utility functions
│   ├── SimulationEngine.ts  # Circuit simulation
│   ├── firebase.ts     # Firebase configuration
│   └── ...
└── App.tsx             # Main application component
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint configuration
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Flow** for the amazing node-based diagram library
- **Firebase** for robust backend services
- **Tailwind CSS** for the utility-first styling approach
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons

## 📞 Contact

- **Project Lead**: [Your Name](https://github.com/yourusername)
- **Email**: your.email@example.com
- **Twitter**: [@yourhandle](https://twitter.com/yourhandle)
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

<div align="center">

**Made with ❤️ for the electronics community**

⭐ Star us on GitHub if you find this project useful!

[⬆️ Back to Top](#sim-circuit-)

</div>
