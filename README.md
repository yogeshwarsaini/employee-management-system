# 🏢 Employee Management System
### *Enterprise-Grade 3-Tier Cloud-Native Application*

<div align="center">

![EMS Banner](https://img.shields.io/badge/Employee%20Management%20System-Production%20Ready-00c8ff?style=for-the-badge&logo=kubernetes&logoColor=white)

[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestrated-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![AWS](https://img.shields.io/badge/AWS-Cloud%20Deployed-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)

<br/>

> **A production-ready, cloud-native Employee Management System built with modern DevOps practices — containerized with Docker, orchestrated with Kubernetes, deployed on AWS, and automated with CI/CD pipelines.**

</div>

---

## 📸 Preview

<div align="center">

| Login Page | Dashboard |
|:---:|:---:|
| ![Login](https://img.shields.io/badge/Cyberpunk%20Dark%20Theme-Login%20Page-00c8ff?style=flat-square) | ![Dashboard](https://img.shields.io/badge/Real--time%20Stats-Dashboard-00ff88?style=flat-square) |

</div>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CI/CD PIPELINE                           │
│         GitHub Push → GitHub Actions → AWS ECR             │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   AWS EKS CLUSTER                           │
│                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐   │
│   │  TIER 1     │    │  TIER 2     │    │  TIER 3     │   │
│   │  Frontend   │───▶│  Backend    │───▶│  Database   │   │
│   │  React      │    │  Node.js    │    │  MySQL      │   │
│   │  Port: 3000 │    │  Port: 5000 │    │  Port: 3306 │   │
│   │  (Nginx)    │    │  (Express)  │    │  (Docker)   │   │
│   └─────────────┘    └─────────────┘    └─────────────┘   │
│                                                             │
│          All services in dedicated Kubernetes Pods          │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚡ Tech Stack

### 🎨 Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI Framework |
| React Router v6 | Client-side Routing |
| Axios | HTTP Client |
| Custom CSS | Cyberpunk Dark Theme |
| Nginx | Production Web Server |

### ⚙️ Backend
| Technology | Purpose |
|-----------|---------|
| Node.js 18 | Runtime Environment |
| Express.js | REST API Framework |
| JWT | Authentication & Authorization |
| bcryptjs | Password Hashing |
| mysql2 | Database Driver |

### 🗄️ Database
| Technology | Purpose |
|-----------|---------|
| MySQL 8.0 | Relational Database |
| Docker Volume | Persistent Storage |

### ☁️ DevOps & Cloud
| Technology | Purpose |
|-----------|---------|
| Docker | Containerization |
| Docker Compose | Local Orchestration |
| Kubernetes (EKS) | Production Orchestration |
| AWS ECR | Container Registry |
| AWS EKS | Managed Kubernetes |
| GitHub Actions | CI/CD Pipeline |

---

## 🚀 Features

- 🔐 **JWT Authentication** — Secure login with role-based access
- 👥 **Employee CRUD** — Add, View, Delete employee records
- 📊 **Real-time Dashboard** — Live stats (Total employees, departments, avg salary)
- 🏬 **Department Management** — IT, HR, Finance, Marketing & more
- 🌙 **Cyberpunk Dark UI** — Modern glassmorphism design with glow effects
- 🐳 **Fully Containerized** — Docker + Docker Compose
- ☸️ **Kubernetes Ready** — Production-grade K8s manifests
- 🔄 **CI/CD Pipeline** — Automated build & deploy via GitHub Actions
- ☁️ **AWS Native** — Deployed on EKS with ECR image registry

---

## 📁 Project Structure

```
employee-management-system/
│
├── 📂 frontend/                  # React Application
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── Login.js          # Auth page (Cyberpunk UI)
│   │   │   ├── Dashboard.js      # Main dashboard
│   │   │   ├── EmployeeList.js   # Employee table
│   │   │   └── AddEmployee.js    # Add employee form
│   │   ├── App.js                # Routes & PrivateRoute
│   │   └── index.js              # Entry point
│   ├── Dockerfile                # Multi-stage build
│   └── nginx.conf                # Nginx config
│
├── 📂 backend/                   # Node.js API
│   ├── 📂 routes/
│   │   ├── auth.js               # Login endpoint
│   │   └── employees.js          # CRUD endpoints
│   ├── 📂 middleware/
│   │   └── auth.js               # JWT verification
│   ├── db.js                     # MySQL connection pool
│   ├── server.js                 # Express server
│   └── Dockerfile                # Backend container
│
├── 📂 k8s/                       # Kubernetes Manifests
│   ├── namespace.yaml
│   ├── mysql-deployment.yaml
│   ├── backend-deployment.yaml
│   └── frontend-deployment.yaml
│
├── 📂 .github/
│   └── 📂 workflows/
│       └── cicd.yaml             # GitHub Actions Pipeline
│
├── docker-compose.yml            # Local development
├── init.sql                      # Database schema & seed
└── README.md
```

---

## 🛠️ Local Setup

### Prerequisites
```
✅ Node.js 18+
✅ Docker Desktop
✅ Git
```

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/employee-management-system.git
cd employee-management-system
```

### 2️⃣ Run with Docker Compose
```bash
docker-compose up --build
```

### 3️⃣ Access the Application
```
🌐 Frontend  →  http://localhost:3000
⚙️  Backend   →  http://localhost:5000/health
🗄️  MySQL     →  localhost:3306
```

### 4️⃣ Login Credentials
```
📧 Email    : admin@company.com
🔑 Password : admin123
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | User login | ❌ |
| GET | `/api/employees` | Get all employees | ✅ JWT |
| POST | `/api/employees` | Add employee | ✅ JWT |
| PUT | `/api/employees/:id` | Update employee | ✅ JWT |
| DELETE | `/api/employees/:id` | Delete employee | ✅ JWT |
| GET | `/health` | Health check | ❌ |

---

## ☸️ Kubernetes Deployment

```bash
# Apply all manifests
kubectl apply -f k8s/

# Check pods
kubectl get pods -n ems

# Get service URLs
kubectl get svc -n ems
```

---

## 🔄 CI/CD Pipeline

```
Developer pushes code
        │
        ▼
GitHub Actions triggered
        │
   ┌────┴────┐
   │  Build  │ → Docker image build
   │  Test   │ → Run tests
   │  Push   │ → Push to AWS ECR
   └────┬────┘
        │
        ▼
  Deploy to EKS
        │
        ▼
  Application Live ✅
```

---

## 👨‍💻 Author

**Yogeshwar Saini**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com)

---

## 📜 License

```
MIT License — Free to use, modify and distribute
```

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

![Footer](https://img.shields.io/badge/Built%20with-❤️%20%26%20DevOps-00c8ff?style=for-the-badge)

</div>
