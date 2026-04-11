# TalentLoop
## 📝 Description

jobportal is a high-performance, full-stack recruitment platform built with Node.js and JavaScript. Designed for scalability and reliability, it features a comprehensive REST API, a secure authentication system , RBAC(Role Base authentication controller ) and a responsive web interface. The project integrates a robust database layer, automated testing suites, and a convenient CLI tool, providing a  developer-friendly environment for managing job listings and candidate interactions.


## 🛠️ Tech Stack


- Frontend : REACT + VITE , TAILWIND , REDUX TOOLKIT.
- Backend : NODE.JS , EXPRESS.JS.
- Database : MONGO DB.



## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/adeedkhann/jobportal.git

# Install dependencies
npm install

# Start development server
npm run dev
```




## 📸 Screenshots
### authentication
<img width="300" alt="Screenshot 2026-04-11 160137" src="https://github.com/user-attachments/assets/91fe576b-2c1a-465c-8604-a7265bba45f2" />
### Home Page
<img width="300" alt="Screenshot 2026-04-11 160200" src="https://github.com/user-attachments/assets/a6706c5f-e32e-4dae-a222-7cd306d5c70d" />
### Job Section
<img width="300" alt="Screenshot 2026-04-11 160212" src="https://github.com/user-attachments/assets/e8406ee0-f0d8-460b-9b56-350ae99fdc74" />
<img width="300" alt="Screenshot 2026-04-11 160231" src="https://github.com/user-attachments/assets/b059ffd2-70b7-406e-bef3-325cb3c06d7b" />
<img width="300" alt="Screenshot 2026-04-11 160250" src="https://github.com/user-attachments/assets/8cf33272-2e0e-4620-b8bf-303f42a5c3c5" />

### Seeker Profile
<img width="300" alt="Screenshot 2026-04-11 160301" src="https://github.com/user-attachments/assets/10e0c6af-17ac-4b90-98e4-4ee73858ba7f" />
<img width="300" alt="Screenshot 2026-04-11 160316" src="https://github.com/user-attachments/assets/020d01ea-d774-422a-b42c-120498cb72d9" />
### Job Details 
<img width="300" alt="Screenshot 2026-04-11 160337" src="https://github.com/user-attachments/assets/aab49ae5-4c96-4f5b-bb96-e0575c901cfb" />
### Seeker Dashboard
<img width="300" alt="Screenshot 2026-04-11 160350" src="https://github.com/user-attachments/assets/e4e5840d-43a8-4d75-857c-06442a93deb9" />
### Recruiter Profile
<img width="300" alt="Screenshot 2026-04-11 160405" src="https://github.com/user-attachments/assets/3a5a3631-ee69-40ef-8ceb-d74810077f43" />
### Post A Job
<img width="300" alt="Screenshot 2026-04-11 160622" src="https://github.com/user-attachments/assets/1fd59af6-26ae-427e-a56a-ff522787908d" />
### Company Dashboard
<img width="300" alt="Screenshot 2026-04-11 160643" src="https://github.com/user-attachments/assets/e5afdfd5-a203-46ea-854f-f2b0d2899079" />
### Applications Table
<img width="300" alt="Screenshot 2026-04-11 160708" src="https://github.com/user-attachments/assets/c6670978-0eba-48ee-89ce-8cd04044978b" />
<img width="300" alt="Screenshot 2026-04-11 160724" src="https://github.com/user-attachments/assets/f6ad00a7-fc66-4e2d-b1d1-1bdb458c54a9" />





## 📁 Project Structure

```
.
├── backend
│   ├── controllers
│   │   ├── application.controller.js
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   └── user.controller.js
│   ├── index.js
│   ├── middlewares
│   │   ├── error.middleware.js
│   │   ├── isAuthenticated.js
│   │   ├── multer.js
│   │   └── role.middleware.js
│   ├── models
│   │   ├── application.model.js
│   │   ├── company.model.js
│   │   ├── job.model.js
│   │   └── user.model.js
│   ├── package.json
│   ├── routes
│   │   ├── application.route.js
│   │   ├── company.route.js
│   │   ├── job.route.js
│   │   └── user.route.js
│   └── utils
│       ├── ApiError.js
│       ├── ApiResponse.js
│       ├── asyncHandler.js
│       ├── cloudinary.js
│       └── db.js
└── frontend
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── jsconfig.json
    ├── package.json
    ├── public
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src
    │   ├── App.jsx
    │   ├── company
    │   │   ├── CompanyCreate.jsx
    │   │   ├── CompanyDashboard.jsx
    │   │   ├── CompanySetup.jsx
    │   │   ├── PostJob.jsx
    │   │   └── RecruiterProfile.jsx
    │   ├── components
    │   │   ├── FeaturedOpportunities.jsx
    │   │   ├── FeaturesAndCTA.jsx
    │   │   ├── HeroSection.jsx
    │   │   ├── shared
    │   │   │   ├── Footer.jsx
    │   │   │   └── Navbar.jsx
    │   │   └── ui
    │   │       ├── UpdateProfileDialog.jsx
    │   │       ├── avatar.jsx
    │   │       ├── button.jsx
    │   │       ├── dialog.jsx
    │   │       ├── dropdown-menu.jsx
    │   │       ├── input.jsx
    │   │       ├── label.jsx
    │   │       └── sonner.jsx
    │   ├── index.css
    │   ├── layout
    │   │   ├── MainLayout.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── lib
    │   │   └── utils.js
    │   ├── main.jsx
    │   ├── pages
    │   │   ├── Applicants.jsx
    │   │   ├── AuthPage.jsx
    │   │   ├── Home.jsx
    │   │   ├── JobDetails.jsx
    │   │   └── JobSearchSection.jsx
    │   ├── store
    │   │   ├── authSlice.js
    │   │   └── store.js
    │   └── student
    │       ├── StudentDashboard.jsx
    │       └── StudentProfile.jsx
    └── vite.config.js
```

## 🛠️ Development Setup

Environment Configuration
Create a file named .env in the backend directory and add the following variables.


### Server Configuration
PORT=8000
SECRET_KEY=your_jwt_secret_key_here


### Get your URI from MongoDB Atlas
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/jobportal

### Cloudinary Configuration (For Image & Resume Uploads)
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret


### Node.js/JavaScript Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` .
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)


## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/adeedkhann/jobportal.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

Please ensure your code follows the project's style guidelines and includes tests where applicable.








