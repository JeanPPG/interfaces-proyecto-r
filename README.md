## 🚀 **Características del Proyecto**  

🌐 **Frontend** desarrollado en **React.js + TypeScript** y **Vite** para una experiencia rápida, interactiva y responsiva.  
- 📊 **APIs integradas** para reconocimiento facial y rastreo ocular:  
  - **Morphcast** para emociones y atención.  
  - **GazeRecorder** para análisis de mirada.  
- 💾 **Backend** con **Python Flask** y **PostgreSQL** para almacenamiento y gestión de datos.  

---

## 🛠️ **Requisitos Previos**  

Asegúrate de tener instalados los siguientes componentes:  

1. **Node.js** (v18+): [Descargar aquí](https://nodejs.org/)  
2. **Python** (v3.9+): [Descargar aquí](https://www.python.org/)  
3. **PostgreSQL** (v15+): [Descargar aquí](https://www.postgresql.org/)  
4. **Git**: [Descargar aquí](https://git-scm.com/)  

---

## 🧑‍💻 **Configuración del Proyecto**  

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:  

### 1️⃣ Clona este repositorio  
```bash
git clone https://github.com/JeanPPG/interfaces-proyecto-r.git
cd interfaces-proyecto-r
```

### 2️⃣ Instala las dependencias
```bash
npm install
```

### 3️⃣ Configuración del Backend (Flask + PostgreSQL) 
```bash
cd ../server
python -m venv venv
source venv/bin/activate  # Linux/Mac)
venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

### Configuración de la Base de Datos
Crea una base de datos PostgreSQL
Crea un archivo .env en la carpeta server:
```bash
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_bd
```

### Ejecuta la aplicacion
En otra terminal:
```bash
npm run start
```
## 🎮 **Cómo Usar la Aplicación**
Accede a http://localhost:5173 en tu navegador
Activa la cámara y selecciona un minijuego
Los datos se guardarán automáticamente en PostgreSQL al finalizar cada sesión

## 📂 **Estructura del Proyecto**
```text
.
├── client/              # Frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── types/       # Tipos TypeScript
│   │   └── main.tsx     # Punto de entrada
│
├── server/              # Backend (Flask + PostgreSQL)
│   ├── app/             
│   │   ├── models/      # Modelos de base de datos
│   │   ├── routes/      # Endpoints API
│   │   └── __init__.py
│   ├── migrations/      # Migraciones de base de datos
│   └── requirements.txt
│
├── .env.example         # Variables de entorno
└── README.md
```

## 💡 **Tecnologías Utilizadas**
Frontend: React.js, TypeScript, Vite
Backend: Python, Flask, SQLAlchemy
Base de Datos: PostgreSQL
APIs: Morphcast, GazeRecorder

## 📊 **Flujo de Trabajo**
Captura: Datos de emociones y mirada vía APIs
Procesamiento: Análisis en tiempo real con TypeScript
Almacenamiento: Persistencia en PostgreSQL mediante Flask
Análisis: Consultas SQL/Pandas para insights

## 🧪 **Pruebas y Depuración**
Verifica que el servidor esté activo en http://localhost:5000.
Asegúrate de que la cámara esté habilitada en tu navegador.
Revisa los archivos JSON generados para confirmar que los datos se guardan correctamente.

## 🔄 Workflow de Desarrollo
Frontend (Vite):
```bash
cd client && npm run dev
```
Backend (Flask):
```bash
cd server && flask run
```

Migraciones de base de datos:
```bash
flask db migrate
flask db upgrade
```