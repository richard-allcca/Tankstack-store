# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

> This project depends on having the 04-fake-api up and running. You can start it with `npm run start` in the 04-fake-api repository.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Documentation

- [TankStack Query](https://tanstack.com/query/latest/)

## Instalación de TanStack Query

Primero instalamos el paquete de React Query:

```bash
npm install @tanstack/react-query
```

Luego creamos un archivo `src/plugin/TanStackQuery.tsx` con el siguiente contenido:

```ts
const TanStackProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </>
  )
}
export default TanStackProvider
```

Luego lo importamos en el `src/main.tsx`:

```ts
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TanStackProvider>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <RouterProvider router={ router } />
        </main>
      </NextUIProvider>
    </TanStackProvider>
  </React.StrictMode>,
)
```

Segundo paso, instalar las devtools de react query

```bash
npm install @tanstack/react-query-devtools
```

Luego lo importamos en el `src/plugin/TanStackQuery.tsx`:

```ts
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const TanStackProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}
export default TanStackProvider
```

## React query mutations

Para realizar una mutación con React Query, primero debes definir una función que realice la mutación. Luego, puedes usar el hook `useMutation` para ejecutar esa función. Aquí tienes un ejemplo básico:

- [React query mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)

```tsx
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const createProduct = async (product: FormInputs) => {
  const response = await axios.post('/api/products', product)
  return response.data
}

const NewProduct = () => {
  const mutation = useMutation(createProduct)

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields go here */}
    </form>
  )
}
```
