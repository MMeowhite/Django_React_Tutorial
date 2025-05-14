# Django + React Tutorial Project

This is a full-stack web application built using **Django** as the backend framework and **React** as the frontend framework. The project demonstrates how to integrate Django REST Framework (DRF) with a React frontend to create a modern web application.

---

## 1. Features

- **Backend**:
  - Built with Django and Django REST Framework.
  - PostgreSQL database integration.
  - API endpoints for managing `Projects`, `Employees`, and `Project Managers`.
  - CORS support for frontend-backend communication.

- **Frontend**:
  - Built with React and Material-UI for a modern UI design.
  - Axios for API communication.
  - React Router for navigation.
  - Dynamic data fetching and rendering.

---


## 2. Prerequisites
Before running the project, ensure you have the following installed:

- Python 3.8+  
- Node.js 14+ and npm  
- PostgreSQL  

---

## 3. Installation in Local Environment

### Backend Setup

1. Navigate to the backend directory:
```bash
   cd backend
```

2. Create and activate a virtual environment
```bash
    source venv/bin/activate
```

3. Install the required Python packages:
```python
    pip install -r requirements.txt
```

4. Apply database migrations
```python
    python manage.py makemigrations
    python manage.py migrate
```

5. Create a superuser for the admin panel
```python
    python manage.py createsuperuser
```

6. Start the backend 
```python
    python manage.py runserver
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
    cd frontend
```

2. Install the required npm packages:
```bash
    npm install
```

3. Start the development server:
```bash
    npm run dev
```

### Usage
Now you can open the backend API in your browser with the URL:http://localhost:8000/api/ and open the frontend API in
your browser with the URL:http://localhost:5173

After that, you can use the application to manage projects, employees, and project managers.


## 4. The Structure of The Project
```
## Django_React_Tutorial/
## ├── backend/               # Django backend
## │   ├── api/               # API app
## │   ├── crud/              # Main Django project
## │   ├── manage.py          # Django management script
## │   └── requirements.txt   # Backend dependencies
## ├── frontend/              # React frontend
## │   ├── src/               # React source code
## │   ├── public/            # Static files
## │   ├── package.json       # Frontend dependencies
## │   └── vite.config.js     # Vite configuration
## └── [README.md](http://_vscodecontentref_/1)              # Project documentation
```


## 5.API Endpoints
### Projects
- `GET /api/project/` - List all projects.
- `POST /api/project/` - Create a new project.
- `GET /api/project/:id/` - Retrieve a specific project.
- `PUT /api/project/:id/` - Update a specific project.
- `DELETE /api/project/:id/` - Delete a specific project.

### Employees
- `GET /api/employees/` - List all employees.
- `POST /api/employees/` - Create a new empolyee.

### Project Managers
- `GET /api/projectmanager/` - List all project managers.
- `POST /api/projectmanager/` - Create a new project manager.


## 6.Environment Variables
Create a `.env` file in the backend directory with the following rule:
```
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database_name>
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=URL
```


## 7.Deployment
Backend Depolyment:
    1.Use a platform like **Railway** or **Azure** to deploy the Django backend.
    2.Ensure the `DATABASE_URL` and `ALLOWED_HOSTS` are properly configured.
Frontend Deployment:
    1.Use a platform like **Netlify** or **Vercel** to deploy the React frontend.
    2.Set the `VITE_API_BASE_URL` environment variable to ponit to the deployed backend.


## 8.Contribution
The project is learned the project series: [Django React APP Tutorial #1-14](https://www.youtube.com/watch?v=wCgQjXI1Q0w&list=PLmEKHA8iFrmBCo1Guf3xbM1af5p5Ja-fy) from Youtube (Youtuber: [CBI Analytics](https://www.youtube.com/@CBIAnalytics))with little change. Further contributions are welcome! Please fork the repository and submit a pull request.


## 9.License
This project is licensed under the [MIT License](). See the `LICENSE` file for details.


## 10.Acknowledgments
- [Django](https://www.djangoproject.com/)
- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [Vite](https://vitejs.dev/)