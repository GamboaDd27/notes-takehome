### **Notes App (Django + Next.js)**  

## **📂 Project Structure**  
The repository contains **both the backend & frontend** in a monorepo format:  

```
/notes-app/
│── backend/       # Django REST Framework API
│── frontend/      # Next.js TypeScript App
```

---

## **🛠️ Key Technical & Design Decisions**  
### **1️⃣ Authentication with JWT**  
- Used Django REST Framework's **JWT-based authentication**.  
- Tokens include **access & refresh logic** for seamless user sessions.  
- Tokens are stored in **local storage** & auto-refreshed when needed.  

### **2️⃣ Auto-Saving Notes on Typing**  
- **Debounced auto-save logic** ensures data is saved efficiently.  
- Uses `useRef` to track **typing delays**, saving only after **1s of inactivity**.  
- **PATCH instead of PUT** to only update changed fields, improving performance.  

### **3️⃣ Category-Based UI Enhancements**  
- Sidebar & notes use **dynamic color coding** for **quick visual recognition**.  
- Category dropdown uses **custom UI with color circles**, improving clarity.  
- Notes backgrounds **match their category** for a **seamless UX**.  

### **4️⃣ Modular Frontend Architecture**  
- **Global state management using Context API**.  
- **Reused components** (`Sidebar.tsx`, `NoteList.tsx`) to **minimize repetition**.  
- **Dynamically generated pages (`/note/[id]`)** for **fast navigation**.  

### **5️⃣ Efficient API Calls & Error Handling**  
- **Axios interceptors** ensure **all requests include authentication tokens**.  
- **Automatic logout on token expiry** to maintain security.  
- **Error messages properly handled** to prevent silent failures.  

---

## **🤖 AI Tools Used in Development**  
### **🟢 AI Model: `4o` (GPT-4o)**
- **Used for structuring/scaffolding** the project.  
- Helped define **best practices for monorepo setup** (backend & frontend).  
- Provided **Django REST Framework authentication setup** & API structuring.  
- Assisted in **Next.js folder structure & modularity**.  

### **🔵 AI Model: `o1` (GPT-4-turbo-1)**
- **Used for solving complex bugs & edge cases**.  
- Fixed **React state persistence issues** with `useRef`.  
- Debugged **JWT authentication flow**, ensuring token refresh logic worked properly.  
- Helped refine **debounce logic for auto-save** to prevent excessive API calls.  

---

## **📌 Installation & Setup**  
### **🔧 Backend (Django)**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### **🌐 Frontend (Next.js)**
```bash
cd frontend
npm install
npm run dev
```

