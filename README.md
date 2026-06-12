Install Dependencies
For Backend - npm i

For Frontend - cd frontend npm i

Env Variables
Make Sure to Create a config.env file in backend/config directory and add appropriate variables in order to use the app.

Essential Variables PORT= DB_URL = STRIPE_API_KEY= STRIPE_SECRET_KEY= JWT_SECRET= JWT_EXPIRE= COOKIE_EXPIRE= SMPT_SERVICE = SMPT_MAIL= SMPT_PASSWORD= SMPT_HOST= SMPT_PORT= CLOUDINARY_NAME CLOUDINARY_API_KEY CLOUDINARY_API_SECRET fill each filed with your info respectively



# Things

A modern task and productivity management application designed to help users organize, prioritize, and track their daily activities efficiently.

## 🚀 Features

- Create, update, and delete tasks
- Task prioritization
- Status tracking
- Responsive UI
- User authentication
- Real-time updates
- Search and filtering
- Dashboard overview

## 🛠️ Tech Stack

### Frontend
- React.js / Angular
- TypeScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### DevOps
- GitHub Actions
- Docker

## 📂 Project Structure

```text
things/
├── client/
├── server/
├── public/
├── src/
├── .github/
│   └── workflows/
├── package.json
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/mustafagaut/things.git
cd things
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_connection_string
JWT_SECRET=your_secret
```

## 🎯 Objectives

- Improve personal productivity
- Organize daily activities
- Track task progress
- Provide a clean and intuitive experience

## 📈 Future Enhancements

- AI-powered task recommendations
- Calendar integration
- Team collaboration
- Notifications
- Analytics dashboard

## 👨‍💻 Author

### Mustafa Gautampurawala

Software Engineer | MERN Stack Developer | AI/ML Enthusiast

- GitHub: https://github.com/mustafagaut
- LinkedIn: https://www.linkedin.com/in/mustafa-gautampurawala

---

⭐ If you find this project useful, consider giving it a star.
