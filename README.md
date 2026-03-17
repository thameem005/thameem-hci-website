# 🕶️ Aura Optics — Visionary Interface

A premium eyewear e-commerce platform that transcends traditional interaction. **Aura Optics** integrates cutting-edge AI-driven hand gesture control and instant voice commands to provide a seamless, high-end browsing experience. This project was built with a core focus on **Human-Computer Interaction (HCI)** principles.

---

## 🚀 Features

### 🎮 5 Mandatory Interaction Modes
1.  **Keyboard Interaction**: Full navigation using shortcuts and Tab traversal.
2.  **Mouse Interaction**: Smooth 3D transforms and hover effects for immersive browsing.
3.  **Touch Interaction**: Mobile-responsive layout with large, touch-friendly hit areas.
4.  **Voice Interaction**: Hands-free control using the Web Speech API.
5.  **Visual Feedback**: Instant system status updates via animated toast notifications and glassmorphism UI elements.

### 🤖 AI Hand Gesture Control
Integrated using **Google MediaPipe Hands**, allowing users to control the interface without touching their device:
-   **👍 Thumbs Up**: Add current product to cart.
-   **🖐️ Open Palm**: Scroll down smoothly.
-   **✌️ Peace Sign**: Scroll up smoothly.

---

## 🛠️ Technology Stack
-   **Frontend**: Vanilla HTML5, CSS3 (Glassmorphism), JavaScript (ES6+).
-   **Icons**: [Lucide Icons](https://lucide.dev/).
-   **AI Engine**: [Google MediaPipe](https://google.github.io/mediapipe/) (Real-time Hand Pose Estimation).
-   **Voice**: [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

---

## 💻 Getting Started

### Prerequisites
To run this project, you only need a modern web browser (Chrome or Edge recommended for full Speech and Gesture support).

### Setup Instructions
Since this project uses modern web APIs (Webcam and Microphone), it **must be run via a local server** for security reasons (browser security policies often block these APIs on `file://` paths).

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/nadheemcr7/aura-optics-hci.git
    cd aura-optics-hci
    ```

2.  **Run with a Local Server**:
    -   **VS Code**: Right-click `index.html` and select **"Open with Live Server"**.
    -   **Python**: Run `python -m http.server 8000` in the terminal.
    -   **Node.js**: Run `npx live-server` in the terminal.

3.  **Permissions**:
    -   Grant **Camera Access** for Gesture Mode.
    -   Grant **Microphone Access** for Voice Mode.

---

## ⌨️ Control Guide

### Keyboard Shortcuts
-   **`V`**: Toggle Voice Interaction Mode.
-   **`G`**: Toggle AI Gesture Mode.
-   **`C`**: Toggle Shopping Cart Drawer.
-   **`Ctrl + Z`**: Undo last cart action.

### Voice Commands
Activate Voice Mode and try these:
-   *"Add to Cart"*
-   *"Go Home"* / *"Show Collection"*
-   *"Scroll Down"* / *"Scroll Up"*
-   *"Open Cart"* / *"Close Cart"*
-   *"Undo"*

---

## 📚 HCI Principles
This project strictly adheres to **Shneiderman's 8 Golden Rules of Interface Design**:
-   **Consistency**: Unified color palette and icon sets.
-   **Informative Feedback**: Toast notifications for every user action.
-   **Locus of Control**: AI modes are strictly opt-in (Manual toggle).
-   **Error Handling**: Fail-safe mechanisms for webcam/mic access.

---

## 📝 License
This project is for educational purposes as part of the HCI curriculum.
