# 📚 Firebase React Books CRUD App

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-12.0.0-FFCA28?style=for-the-badge&logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.1.0-646CFF?style=for-the-badge&logo=vite)

_A modern, full-stack book management application built with React 19 and Firebase_

</div>

---

## ✨ Features

- 🔐 **User Authentication** - Secure login and signup with Firebase Auth
- 📚 **Book Management** - Full CRUD operations for books
- 🎨 **Modern UI** - Beautiful interface built with Tailwind CSS and DaisyUI
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔥 **Real-time Updates** - Live data synchronization with Firestore
- 🚀 **Fast Performance** - Built with Vite for optimal development experience

## 🛠️ Tech Stack

### Frontend

- **React 19** - Latest React with modern hooks and features
- **Tailwind CSS 4** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS
- **Heroicons** - Beautiful SVG icons
- **React Router DOM** - Client-side routing

### Backend & Services

- **Firebase 12** - Backend-as-a-Service platform
- **Firestore** - NoSQL cloud database
- **Firebase Auth** - User authentication service

### Development Tools

- **Vite** - Fast build tool and dev server

## 🔐 Security & Environment Variables

This project uses environment variables to securely store Firebase credentials. Your `.env` file is automatically ignored by Git to prevent accidental exposure of sensitive information.

### Environment Variables Structure

- `VITE_FIREBASE_API_KEY` - Your Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Your Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Your Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Your Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Your Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Your Firebase app ID

### Security Best Practices

- ✅ **DO**: Use environment variables for all sensitive data
- ✅ **DO**: Keep your `.env` file local and never commit it
- ✅ **DO**: Use `env.example` as a template for other developers
- ❌ **DON'T**: Hardcode credentials in your source code
- ❌ **DON'T**: Share your `.env` file or commit it to version control

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Firebase account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/aziz-elb2/firebase-react-app
   cd firebase-react-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Firebase Setup**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Add a web app to your project
   - Copy your configuration object
   - **Secure Setup**: Create a `.env` file in the project root:

   ```bash
   # Copy the example environment file
   cp env.example .env
   ```

   - Edit `.env` file with your actual Firebase credentials with no quotes ' or " :

   ```env
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

   ⚠️ **Security Note**: Never commit your `.env` file to Git! It's already in `.gitignore`.

4. **Enable Firebase Services**

   - Enable **Authentication** (Email/Password)
   - Enable **Firestore Database** (start in test mode)

5. **Run the application**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` and enjoy! 🎉

## 📱 App Screenshots

<div align="center">

| Feature               | Screenshot                                          |
| --------------------- | --------------------------------------------------- |
| 🔐 **Login**          | ![Login](public/media/login-screenshot.png)         |
| ✍️ **Signup**         | ![Signup](public/media/signup-screenshot.png)       |
| 🏠 **Home**           | ![Home](public/media/home-screenshot.png)           |
| ➕ **Add Book**       | ![Add Book](public/media/add-book-screenshot.png)   |
| 👁️ **View Book** | ![View Book](public/media/view-book-screenshot.png) |
| ⚙️ **Update Book** | ![View Book](public/media/update-book-screenshot.png) |


</div>

## 🎥 Demo Video

<div align="center">

[![Demo Video](public/media/demo-thumbnail.png)](public/media/demo-video.mp4)

_Click to watch the full demo video_

</div>

## 🏗️ Project Structure

```
firebase-react-app/
├── public/
│   ├── media/           # 📸 Images and videos
│   │   ├── screenshots/ # App screenshots
│   │   └── demo/        # Demo videos
│   └── vite.svg
├── src/
│   ├── components/      # React components
│   │   ├── Login.jsx    # Authentication component
│   │   ├── Signup.jsx   # User registration
│   │   ├── HomeBook.jsx # Main dashboard
│   │   └── ViewBook.jsx # Book details/editing
│   ├── firebase.js      # Firebase configuration
│   ├── App.jsx          # Main app component
│   └── main.jsx         # App entry point
├── package.json
└── README.md
```

## 🌟 Key Features Explained

### Authentication System

- Secure user registration and login
- Session management with Firebase Auth

### Book Management

- **Create**: Add new books with title, author, and description
- **Read**: View all books in a beautiful grid layout
- **Update**: Edit existing book information
- **Delete**: Remove books from the collection

### Real-time Database

- Instant updates across all connected clients
- Automatic data synchronization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com/) for the amazing backend services
- [React](https://reactjs.org/) team for the incredible framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS approach
- [DaisyUI](https://daisyui.com/) for the beautiful components
- [Heroicons](https://heroicons.com/) for the stunning icons

## 📞 Support

If you have any questions or need help:

- 🐛 [Report a Bug](https://github.com/aziz-elb2/firebase-react-app/issues)
- 💡 [Request a Feature](https://github.com/aziz-elb2/firebase-react-app/issues)
- 📧 [Contact Developer](mailto:azizelabbassi18@gmail.com)

---

<div align="center">

**Made with ❤️ by [Aziz Elb2](https://github.com/aziz-elb2)**

⭐ **Star this repository if you found it helpful!**

</div>
