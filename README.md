# Final Project Break
## Alesandro Quirós

Página en producción: https://alesandrofinalprojectbreak.netlify.app

Esta aplicación depende de el back-end en este repositorio: https://github.com/AlesandroQG/backend-tienda-finalprojectbreak

## Instalación
Primero es importante tener [Node.js](https://nodejs.org/en) instalado en local, ya que el proyecto funciona con Node.js. Una vez instalado, abrir una terminal e ir al directorio donde está el proyecto.

A partir de aquí, tenemos que empezar instalando las dependencias con el siguiente comando:
```bash
npm install
```
Esto puede que tarde un poco. Una vez tengamos las dependencias instaladas, podemos empezar el servidor con este comando:
```bash
npm run dev
```
Si todo va bien, el servidor estará en funcionamiento.

Para el archivo **.env**, rellenar la url con el de la API correspondiente:
```js
VITE_APP_API_URL=
```
Si ninguna se introduce, por defecto se usará `http://localhost:3000/`.

## Técnologias usadas
Las técnologias usadas son las siguientes:
- Node.js
- ReactJS
- React Router DOM
- JS Cookie

https://github.com/AlesandroQG/frontend-tienda-finalprojectbreak