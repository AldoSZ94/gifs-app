# ⭐ Gifs App

Aplicación web responsive para buscar y visualizar GIFs utilizando **React, TypeScript y la API de Giphy**.

El objetivo del proyecto fue construir una aplicación de búsqueda de GIFs consumiendo una API externa, utilizando **Axios** para realizar las peticiones HTTP, interfaces de TypeScript para tipar los datos recibidos y `useState` y `useEffect` para administrar el estado y controlar las búsquedas.

---

## 📌 Descripción

Este proyecto consiste en una aplicación de búsqueda de GIFs que permite introducir un término y consultar resultados directamente desde la **API de Giphy**.

La aplicación muestra los GIFs encontrados en una cuadrícula responsive y presenta información básica de cada resultado, como su título y dimensiones.

Para realizar las peticiones a la API se creó una instancia de **Axios** con una configuración base reutilizable. La API Key se obtiene mediante una variable de entorno para evitar incluirla directamente en el código fuente.

Los resultados recibidos desde Giphy son transformados a una estructura de datos más sencilla antes de ser utilizados por los componentes de la interfaz.

Además, la aplicación mantiene un historial de las últimas búsquedas realizadas, evitando términos repetidos y limitando el historial a ocho elementos.

La interfaz fue construida utilizando **CSS**, incluyendo media queries para adaptar la distribución de los GIFs a diferentes tamaños de pantalla.

---

## 🚀 Demo

👉 Pendiente de publicación.

---

## 🛠️ Tecnologías utilizadas

- React
- TypeScript
- Axios
- Vite
- CSS
- HTML
- Giphy API

---

## 🎯 Características principales

- 🔎 Búsqueda de GIFs mediante la API de Giphy
- 🎞️ Visualización de resultados en una cuadrícula responsive
- ⚡ Peticiones HTTP utilizando Axios
- ⏱️ Control de búsquedas mediante `useEffect` y `setTimeout`
- ⌨️ Ejecución de búsquedas utilizando la tecla `Enter`
- 📝 Historial de búsquedas previas
- 🚫 Prevención de búsquedas vacías
- 🔄 Normalización de términos mediante `trim()` y `toLowerCase()`
- 🔢 Limitación del historial a las últimas 8 búsquedas
- 🔐 Uso de variables de entorno para la API Key
- 🧩 Componentes reutilizables
- 📐 Tipado de datos mediante interfaces de TypeScript
- 📱 Diseño responsive mediante CSS y media queries

---

## 🧠 Aprendizajes

Durante este proyecto reforcé conceptos importantes de **React, TypeScript y consumo de APIs**, entre ellos:

- Manejo de estado local con `useState`
- Uso de `useEffect` para controlar efectos secundarios
- Implementación de un debounce sencillo utilizando `setTimeout`
- Limpieza de efectos mediante `clearTimeout`
- Uso de dependencias dentro de `useEffect`
- Creación y tipado de props mediante interfaces
- Definición de funciones como props utilizando TypeScript
- Comunicación entre componentes mediante callbacks
- Manejo de eventos de teclado con `onKeyDown`
- Manejo de eventos de formulario mediante `onChange` y `onClick`
- Consumo de APIs externas desde una aplicación React
- Realización de peticiones HTTP utilizando Axios
- Creación de una instancia personalizada de Axios
- Uso de variables de entorno mediante `import.meta.env`
- Creación de interfaces para representar respuestas de APIs
- Transformación de datos recibidos desde una API
- Uso de `map()` para transformar y renderizar arreglos
- Uso de `includes()` para evitar términos de búsqueda duplicados
- Uso de `trim()` y `toLowerCase()` para normalizar búsquedas
- Uso de `slice()` para limitar el historial de búsquedas
- Organización del proyecto por funcionalidades y componentes
- Desarrollo de interfaces responsive utilizando CSS y media queries

---

## 🔎 Consumo de la API de Giphy

La aplicación utiliza la **API de Giphy** para obtener los GIFs correspondientes al término introducido por el usuario.

Se creó una instancia de Axios con una URL base:

```ts
const giphyApi = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    lang: 'es',
    api_key: import.meta.env.VITE_GIPHY_API_KEY,
  },
});
```

De esta forma, la configuración común de las peticiones se mantiene centralizada y las acciones pueden utilizar la instancia sin repetir la URL base ni la API Key.

La búsqueda se realiza mediante el endpoint `/search`, enviando el término mediante el parámetro `q` y limitando los resultados obtenidos.

---

## 🧩 Transformación y tipado de datos

La respuesta proporcionada por Giphy contiene una gran cantidad de información sobre cada GIF.

Para trabajar con los datos de forma segura, se definieron interfaces de TypeScript que representan la estructura de la respuesta:

```ts
interface GiphyResponse {
  data: GiphyGif[];
  meta: Meta;
  pagination: Pagination;
}
```

Después de recibir la respuesta, los datos son transformados a una estructura más sencilla:

```ts
return response.data.data.map((gif) => ({
  id: gif.id,
  title: gif.title,
  url: gif.images.original.url,
  width: Number(gif.images.original.width),
  height: Number(gif.images.original.height),
}));
```

De esta manera, los componentes de la interfaz trabajan únicamente con la información que necesitan mediante la interfaz `Gif`.

---

## ⏱️ Control de búsquedas con `useEffect`

El componente `SearchBar` utiliza `useEffect` junto con `setTimeout` para retrasar la ejecución de la búsqueda.

```ts
useEffect(() => {
  const timeoutId = setTimeout(() => {
    onQuery(query);
  }, 700);

  return () => {
    clearTimeout(timeoutId);
  };
}, [query, onQuery]);
```

Cada vez que cambia el texto introducido, se establece un temporizador de 700 milisegundos.

Si el usuario continúa escribiendo antes de que termine ese tiempo, el efecto anterior se limpia mediante `clearTimeout()` y se crea un nuevo temporizador.

Este comportamiento permite evitar ejecutar inmediatamente una petición por cada cambio realizado en el input.

Además, la búsqueda también puede ejecutarse manualmente mediante el botón **Buscar** o presionando la tecla `Enter`.

---

## 📝 Manejo de búsquedas previas

La aplicación mantiene un estado con los términos buscados anteriormente:

```ts
const [previousTerms, setPreviousTerms] = useState<string[]>([]);
```

Antes de realizar una búsqueda, el término es limpiado y normalizado:

```ts
const cleanQuery = query.trim().toLowerCase();
```

Después se comprueba si el término ya existe en el historial:

```ts
if (previousTerms.includes(cleanQuery)) return;
```

Finalmente, el nuevo término se agrega al inicio del arreglo y se conservan únicamente las últimas ocho búsquedas:

```ts
setPreviousTerms([cleanQuery, ...previousTerms].slice(0, 8));
```

Esto permite mantener un historial pequeño y evitar búsquedas duplicadas.

---

## 📱 Diseño responsive

Los resultados se muestran utilizando **CSS Grid**.

La cantidad de columnas aumenta dependiendo del tamaño de la pantalla:

- 📱 Pantallas pequeñas: 2 columnas
- 💻 Desde `768px`: 3 columnas
- 🖥️ Desde `1024px`: 4 columnas
- 🖥️ Desde `1280px`: 5 columnas

Esto permite que la interfaz se adapte a diferentes dispositivos y tamaños de pantalla.

---

## 📁 Organización del proyecto

El proyecto está organizado separando las funcionalidades relacionadas con los GIFs de los componentes compartidos:

```text
src/
├── gifs/
│   ├── actions/
│   │   └── get-gifs-by-query.actions.ts
│   ├── api/
│   │   └── giphy.api.ts
│   ├── components/
│   │   ├── GifList.tsx
│   │   └── PreviousSearches.tsx
│   └── interfaces/
│       ├── gif.interface.ts
│       └── giphy.response.ts
│
├── shared/
│   └── components/
│       ├── CustomHeader.tsx
│       └── SearchBar.tsx
│
├── mock-data/
│   └── gifs.mock.ts
│
├── GifsApp.tsx
├── index.css
└── main.tsx
```

Esta estructura permite separar la lógica de acceso a datos, las interfaces, los componentes específicos de GIFs y los componentes reutilizables.

---

## 👨‍💻 Autor

Desarrollado por **Aldo Sandoval Zepeda**
_(Frontend Developer en formación con enfoque en desarrollo de interfaces modernas y responsivas.)_

---

## ⭐ Notas finales

Este proyecto forma parte de mi portafolio y representa una práctica de **consumo de APIs externas con React y TypeScript**.

Durante su desarrollo reforcé conceptos relacionados con el manejo de estado mediante `useState`, efectos secundarios con `useEffect`, comunicación entre componentes mediante props y callbacks, peticiones HTTP con Axios y tipado de respuestas externas mediante TypeScript.

También representa una práctica de organización de proyectos frontend mediante separación de responsabilidades, creación de componentes reutilizables y desarrollo de interfaces responsive.
