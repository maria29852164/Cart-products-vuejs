# Explicación del Proyecto 

# Informe Técnico: Desarrollo de la Aplicación de Carrito de Compras

## 1. Introducción

La presente aplicación de carrito de compras ha sido diseñada para gestionar el flujo de productos dentro de un carrito de compras en una plataforma de comercio electrónico. El objetivo es permitir a los usuarios agregar, eliminar y modificar la cantidad de productos, así como llevar a cabo un proceso de compra eficiente y con un manejo óptimo de la información.

Este informe detalla el enfoque técnico y los motivos detrás de las decisiones de desarrollo, incluyendo la arquitectura, las tecnologías utilizadas y las optimizaciones implementadas para garantizar una experiencia de usuario fluida y eficiente.

## 2. Requisitos y Objetivos

Los objetivos clave para el desarrollo de la aplicación fueron los siguientes:

- **Gestión de productos en el carrito**: Permitir a los usuarios agregar, eliminar y actualizar la cantidad de productos en su carrito de compras.

- **Cálculo dinámico de totales**: Mostrar al usuario un resumen en tiempo real de los productos en el carrito y el total acumulado.

- **Fluidez y actualización en tiempo real**: Los cambios en los productos deben reflejarse inmediatamente en la interfaz de usuario sin necesidad de recargar la página.

- **Integración con el backend**: El carrito debe estar sincronizado con la base de datos para garantizar que los cambios realizados sean persistentes y reflejados en la sesión del usuario.

## 3. Arquitectura y Tecnologías

Para el desarrollo de la aplicación, se utilizó una arquitectura basada en **Vue.js** para la interfaz de usuario y **Pinia** como gestor de estado centralizado. A continuación, se describen las tecnologías clave utilizadas en el proyecto:

- **Vue.js**: Se utilizó como framework JavaScript para construir la interfaz de usuario. Vue.js es conocido por su facilidad de integración, su sistema reactivo y su capacidad de manejo eficiente de componentes reutilizables.

- **Pinia**: Para la gestión del estado global del carrito, se empleó Pinia, un store moderno y ligero para Vue.js. Esto permite un manejo claro y eficiente de los productos, totales y otras propiedades del carrito, haciendo que los cambios se reflejen de manera reactiva en la interfaz.

- **Vue Router**: Se utilizó para gestionar la navegación dentro de la aplicación, permitiendo una transición fluida hacia la página de checkout y manteniendo una experiencia de usuario consistente.

- **API Backend**: La aplicación interactúa con un backend a través de una API RESTful. Se realizaron peticiones POST, PATCH y DELETE para agregar productos al carrito, actualizar cantidades y eliminar productos. La comunicación con el servidor asegura que los cambios realizados se reflejan en la base de datos.

- **Vuetify**: Se utilizó la librería de componentes UI Vuetify para crear un diseño atractivo y profesional, además de garantizar una experiencia de usuario coherente y responsiva.

## 4. Desarrollo y Decisiones Técnicas

### 4.1 Gestión de Estado con Pinia

Una de las decisiones más importantes fue el uso de Pinia como el sistema de gestión de estado para el carrito. Pinia ofrece una arquitectura basada en acciones y getters, lo que facilita la manipulación de datos y su reactividad dentro de la aplicación.

- **Acciones Asíncronas**: Las acciones del carrito (agregar, eliminar y actualizar productos) interactúan con la API backend para asegurar que los cambios se sincronicen de manera adecuada. Esto permite que los productos agregados o eliminados se reflejen inmediatamente en el carrito tanto en el frontend como en la base de datos.

- **Reactividad en Tiempo Real**: Gracias a la reactividad de Vue.js y Pinia, cualquier cambio en el estado de los productos (como la cantidad o el total) se refleja automáticamente en la interfaz de usuario, lo que garantiza que los usuarios vean una actualización instantánea sin necesidad de recargar la página.

### 4.2 Optimización del Proceso de Actualización

Para garantizar que el carrito se actualice de manera eficiente, se implementaron varias estrategias de optimización:

- **Mutación Directa de Items**: Al agregar, eliminar o actualizar productos en el carrito, las modificaciones se realizan directamente en el estado de Pinia, evitando la necesidad de hacer una llamada a la API después de cada cambio. Esto mejora la experiencia del usuario al evitar retrasos en la actualización.

- **Sincronización con el Backend**: Aunque los cambios se aplican primero en el estado local, se realiza una actualización al backend para garantizar que los datos sean consistentes entre el cliente y el servidor. Se utilizan peticiones asíncronas POST, PATCH y DELETE para manejar las acciones sobre los productos en el carrito.

### 4.3 Manejo de Totales y Actualizaciones Dinámicas

Uno de los desafíos clave en este proyecto fue garantizar que los totales del carrito se actualizaran de manera precisa cada vez que un producto era modificado o eliminado. Para ello, se utilizó la funcionalidad reactiva de Vue.js para recalcular los totales basados en las cantidades y precios de los productos.

- **Reactividad del Total**: Los getters en Pinia calculan automáticamente el total de artículos y el precio total cada vez que el carrito cambia, lo que asegura que el total mostrado al usuario sea correcto sin necesidad de cálculos manuales o recargas.

- **UI Dinámica**: La interfaz se actualiza en tiempo real cuando el usuario cambia la cantidad de productos o elimina artículos, lo que mantiene la experiencia de usuario fluida y sin interrupciones.



# Proyecto Carrito de Compras

Este es un proyecto de carrito de compras desarrollado con **Vue.js**, **Pinia**, **Vuetify**, y una API backend para manejar la persistencia de los datos. El objetivo principal es gestionar el carrito de compras de los usuarios y permitirles agregar, eliminar o modificar productos en su carrito.

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener los siguientes requisitos instalados:

- **Node.js** (versión 22 o superior)
- **npm** (o **yarn** si prefieres usarlo como gestor de dependencias)

## Instrucciones para ejecutar el proyecto

Sigue estos pasos para poner en marcha la aplicación:

### 1. Clonar el repositorio

Primero, clona el repositorio a tu máquina local usando Git:

```bash
git clone https://github.com/maria29852164/Cart-products-vuejs
