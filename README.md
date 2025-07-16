# ⏳ National-Test-Abhyash
A full-stack clone of "JEE" test interface. Features of this website includes image-based questions,two-paper exam handling, score-calculation, response handling and real-time user-validation.

---

## 🖥️ Tech-Stack
* 🎨Frontend:- HTML, CSS, Javascript
* ⚙️Backend:- ExpressJs
* 💾Database:- MongoDB

---

## 🗂️ Project Structure
```bash
Project/
├── public/
│   ├── index.html
│   ├── exam.html
│   ├── result.html
│   ├── script.js
│   └── style.css
├── server.js
├── package.json
├── package-lock.json 
├── .gitignore
├── vercel.json
```

---

## 📌 Pre-requisites
* 🟢 [Node.js (v16+ recommended)](https://nodejs.org/)
* 📦 [npm](https://www.npmjs.com/)
* 🧪 [express-validator](https://www.npmjs.com/package/express-validator)
* 🍃 [Mongoose](https://www.npmjs.com/package/mongoose)
* 💾 [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
* 🌐 [Git](https://git-scm.com/)
* 📄 `.env` file – with environment variables like database connection string (e.g., `MONGO_URI`,`PORT`)

---

## 🛠️ Set-up Procedure

```bash
# 1. Fork the GitHub repository and clone your fork
`git clone` https://github.com/piyushmishra0620/National-Test-Abhyash.git

# 2. Navigate to the project folder
`cd` test-interface

# 3. Install all required dependencies
`npm install` express cors express-validator mongodb mongoose dotenv nodemon

# 4. Create a .env file in the root directory and add:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/test-interface

# 5. Start the development server with nodemon
`nodemon` server.js
```
---

## 🌐 Deployment Link

https://national-test-abhyash.vercel.app/

---
