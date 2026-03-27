# CommentMe Web 🌐
**The visual powerhouse for your `commentme` CLI.**

CommentMe Web is the premium companion dashboard for the [CommentMe CLI](https://github.com/Vidhanvyrs/commentme). While the CLI handles the efficient "skimming" and "unskimming" of comments in your local development environment, the Web platform provides a sleek, modern interface to manage, edit, and explore your extracted comments in the cloud.

---

## ✨ Key Features
- **Cloud Management**: Sync your local comment skims and access them from any device.
- **Interactive Editor**: A rich, UI-friendly environment for refining AI-generated comments and documentation.
- **AI-Powered Insights**: Enhanced visualization of project architecture and code explanations.
- **Secure Sync**: Seamless integration with the CLI via protected API sessions.
- **Premium Design**: A high-performance interface built with React 19 and Tailwind CSS 4.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (via [Mongoose](https://mongoosejs.com/))
- **Auth**: JWT (JSON Web Tokens) & Bcrypt

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: >= 18.0.0
- **MongoDB**: A running instance (Local or MongoDB Atlas)
- **CLI**: `npm install -g commentme`

### Project Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Vidhanvyrs/commentme-web.git
   cd commentme-web
   ```

2. **Backend Configuration**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend/` directory with the following keys:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `OPENROUTER_API_KEY` (Optional, for AI features)

3. **Frontend Configuration**:
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend/` directory:
   - `VITE_API_URL=http://localhost:5000` (or your backend URL)

4. **Run the Application**:
   - Start Backend: `cd backend && npm run dev`
   - Start Frontend: `cd frontend && npm run dev`

---

## 🔗 Related Projects
- **[CommentMe CLI](https://github.com/Vidhanvyrs/commentme)**: The core toolkit for decluttering your codebase.

## 📄 License
This project is licensed under the MIT License.
