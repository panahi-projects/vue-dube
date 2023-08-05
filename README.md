# Vue-Dube: A Dynamic UI Builder Engine for Vue.js

Vue-Dube is a powerful and flexible plugin for Vue.js that allows you to create dynamic, responsive, and enhanced user interfaces (UIs) for your web applications. Leveraging a schema-driven approach, Vue-Dube simplifies the process of building complex UIs, letting you focus on writing clean, maintainable code.

With Vue-Dube, you can:

- Define UI components using simple JSON objects
- Bind data from RESTful APIs or other data sources
- Easily customize and extend the library to fit your needs

Whether you're building a dashboard, a form, or a complex workflow, Vue-Dube provides a reliable and efficient foundation for creating dynamic UIs that enhance your users' experience. Get started today and take your Vue.js applications to the next level!
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
