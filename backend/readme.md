# Note-Taking App

This is a Django REST API for a note-taking application, featuring user registration, JWT-based authentication, categories, and notes.

## Requirements

- [Python 3.x](https://www.python.org/downloads/)

---

## Getting Started


### 1. Create a Virtual Environment

- **macOS/Linux:**
  ```bash
  python3 -m venv venv
  ```
- **Windows (Command Prompt or PowerShell):**
  ```bash
  python -m venv venv
  ```

### 2. Activate the Virtual Environment

- **macOS/Linux:**
  ```bash
  source venv/bin/activate
  ```
- **Windows (Command Prompt):**
  ```bat
  venv\Scripts\activate
  ```
- **Windows (PowerShell):**
  ```powershell
  .\venv\Scripts\Activate.ps1
  ```

Once activated, your terminal prompt should change to indicate you’re working within the virtual environment.

### 3. Install Dependencies

In the **same terminal** (with the virtual environment activated):

```bash
pip install -r requirements.txt
```

### 4. Apply Migrations

Create/update your local database tables:

```bash
python manage.py migrate
```

### 5. (Optional) Create a Superuser

If you want access to the Django admin panel (`/admin/`):

```bash
python manage.py createsuperuser
```

Follow the prompts to set a username and password.

### 6. Run the Development Server

```bash
python manage.py runserver
```

- Your server will typically be at [http://127.0.0.1:8000](http://127.0.0.1:8000).  
- Press `CTRL + C` in your terminal to stop the server when done.

---

## API Endpoints

Assuming you set up your `urls.py` as described:

1. **User Registration**: `POST /api/register/`
2. **Token Obtain (Login)**: `POST /api/token/`
3. **Token Refresh**: `POST /api/token/refresh/`
4. **Notes CRUD**: `GET/POST /api/notes/`, `GET/PUT/DELETE /api/notes/{id}/`
5. **Categories CRUD**: `GET/POST /api/categories/`, `GET/PUT/DELETE /api/categories/{id}/`

---

## Common Commands

- **Deactivate the Virtual Environment**  
  - macOS/Linux/Windows (any shell):
    ```bash
    deactivate
    ```
- **Delete & Recreate the Virtual Environment**  
  1. Deactivate if active.
  2. Remove the `venv` folder:
     - macOS/Linux: `rm -rf venv`
     - Windows:
       - Command Prompt:
         ```bat
         rmdir /s /q venv
         ```
       - PowerShell:
         ```powershell
         Remove-Item -Recurse -Force .\venv
         ```
  3. Create it again (see Step 2 above).
