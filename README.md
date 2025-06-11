# 📌 TC-688-APP

TC-688-APP es una aplicación web desarrollada en **React** con **Vite**, diseñada como parte del proyecto **TC-688: Escribimos la historia de las comunidades de Turrialba**. La aplicación permite a los usuarios explorar la historia, cultura y actividades de cada comunidad a través de juegos interactivos, galerías de imágenes e información detallada. Posteriormente, la app se convertirá en una APK utilizando **Capacitor** para ejecutarse en tablets sin conexión a Internet.

## 🚀 Sistema de Trabajo

El desarrollo del proyecto sigue una estructura basada en ramas para asegurar una organización clara y eficiente:

- **main** → Rama estable con la última versión aprobada de la aplicación.
- **dev/nombre-del-contribuidor** → Cada colaborador trabaja en su propia rama individual. Ejemplo:
  - dev/jose-lopez
  - dev/maria-gomez
  - dev/carlos-perez

### 🔹 Flujo de Trabajo
1️⃣ Cada colaborador trabaja en su **propia rama**.
2️⃣ Cuando finaliza una funcionalidad, hace un **pull request a `main`**.

---

## 🛠 Instalación y Configuración

### 1️⃣ Clonar el Repositorio

Clona el repositorio en tu máquina local:
```
git clone https://github.com/historiasturrialba/TC-688-APP.git
```

Accede a la carpeta del proyecto:
```
cd TC-688-APP
```

### 2️⃣ Instalar Dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:
```
npm install
```

### 3️⃣ Ejecutar la Aplicación en Desarrollo

Para iniciar el servidor de desarrollo:
```
npm run dev
```
Esto abrirá la aplicación en tu navegador en `http://localhost:5173/`.

### 4️⃣ Construcción para Producción

Si deseas generar una versión optimizada para producción:
```
npm run build
```

### 5️⃣ Convertir la App en APK (Usando Capacitor)

Inicializar Capacitor en el proyecto:
```
npx cap init TC-688-APP com.tcu.tc688app
```

Agregar la plataforma Android:
```
npx cap add android
```

Construir la aplicación web y copiar los archivos a Capacitor:
```
npm run build
npx cap copy
```

Abrir en Android Studio para generar el APK:
```
npx cap open android
```

---

## 📝 Contribuciones

1. Crea una rama `dev/tu-nombre` que derive de `main`
2. Realiza los cambios y realiza commits claros.
3. Sube tu rama al repositorio y abre un **pull request a `main`**.

