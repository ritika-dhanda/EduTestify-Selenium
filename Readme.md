# 🧠 EduTestify - Selenium Automation Project

**EduTestify** is a web-based quiz application tested using **Selenium WebDriver** in Java.  
This project demonstrates **automated UI testing** for an educational web app where users take quizzes and receive instant feedback.  

The purpose of this project is to **validate the functionality, usability, and reliability** of the EduTestify quiz module through automation.

---

## 🎯 Project Objectives
- Automate user interactions, including:
  - Launching the quiz page
  - Selecting answers
  - Submitting the quiz
  - Validating the score or output text
- Demonstrate the use of **Selenium WebDriver with Java**
- Learn integration of automation with locally hosted web apps

---

## 🏗️ Project Setup & Structure

The project is organized as follows:

```
EduTestify-Selenium/
│
├── backend/                  # Backend code (API, server, etc.)
│   └── ...                   # Refer to the exact backend folder
│
├── frontend/                 # Frontend files (HTML, CSS, JS)
│   └── ...                   # Refer to the exact frontend folder
│
├── libs/                     # Selenium libraries (JAR files)
│   ├── selenium-api-4.xx.xx.jar
│   ├── selenium-chrome-driver-4.xx.xx.jar
│   ├── selenium-support-4.xx.xx.jar
│   └── ...                   # Other JAR files required for Selenium
│
├── node_modules/             # Node.js modules (if needed for frontend/backend)
│   └── ...
│
├── src/                      # Java source files and ChromeDriver
│   ├── chromedriver.exe      # ChromeDriver executable
│   ├── SeleniumTest.java     # Selenium automation script
│   └── SeleniumTest.class    # Compiled Java class
│
├── package.json              # Node.js package info
├── package-lock.json         # Node modules lock file
├── results.json              # Automation results storage
└── README.md                 # Project documentation
```

---

## ⚙️ Tools & Technologies Used

| Tool / Technology       | Purpose                                   |
|-------------------------|-------------------------------------------|
| **Java (JDK 17+)**       | Programming language for automation      |
| **Selenium WebDriver 4.x** | UI automation framework                  |
| **ChromeDriver**          | Automates Google Chrome actions         |
| **Node.js & Express**     | Backend server for the quiz app         |
| **HTML/CSS/JS**           | Frontend quiz interface                  |
| **Git & GitHub**          | Version control and project hosting     |

---

## 🧩 How the Project Works

1. **Backend Setup (Express Server)**  
   - Serves the frontend quiz files  
   - Runs on **http://localhost:5000/quiz** by default  

2. **Frontend (Quiz Page)**  
   - Simple HTML-based quiz page with multiple-choice questions  
   - Displays the user’s score upon submission  

3. **Selenium Script**  
   - Opens the Chrome browser automatically  
   - Navigates to the quiz page  
   - Selects answers and submits the quiz  
   - Reads and validates the output (score text)  

---

## 🚀 Setup Instructions

### 1️⃣ Install Prerequisites

Ensure you have installed:

- **Java JDK 17+**  
- **Node.js (LTS)**  
- **Google Chrome (latest)**  
- **ChromeDriver** (matching your Chrome version)  
- **Selenium JAR files** in the `libs/` folder  

---

### 2️⃣ Start the Backend Server

From your project root:

```bash
cd backend
node server.js
```

You should see:

```
Server running on port 5000
```

Verify in your browser:

```
http://localhost:5000/quiz
```

If the quiz page loads — ✅ Backend + Frontend working fine.

---

### 3️⃣ Run the Selenium Test

From the `src/` folder:

```bash
javac -cp ".;../libs/*" SeleniumTest.java
java -cp ".;../libs/*" SeleniumTest
```

🧪 Example Test Output:

```
Page opened successfully
Quiz Result: You scored 2 out of 2
```

Chrome will automatically open, interact with your quiz, and close after completion.

---
## Update:
Note:
This project uses Selenium Manager (Selenium 4.6+) which automatically manages browser drivers.
No manual ChromeDriver download is required.

## 👩‍💻 Author

**Ritika Dhanda**  
QA Automation Engineer | Selenium | Java | API Testing | GitHub  
📧 Email: ritikadhanda6@gmail.com  
🔗 GitHub: [github.com/ritika-dhanda](https://github.com/ritika-dhanda)

---

## 🏁 License

This project is open-source and available under the **MIT License**.



