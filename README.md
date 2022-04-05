# `react-hook-form-persistent`

A very simple library for persisting react-hook-form state.

## Installation

```sh
npm install react-hook-form-persistent
```

## Usage

Just wrap a result of `useForm` which React Hook Form returns.

```tsx
import { useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persistet';

type FormField = {
  name: string;
  email: number;
};

export default function App() {
  const { register, handleSubmit } = useFormPersist(useForm<FormField>()); // 👈 Wrap "useForm"

  return (
    <div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" {...register('name')} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" {...register('email')} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
}
```

## Option

By default, react-hook-form-persistent use `window.sessionStorage` where to store persistent data.

If you want to use `window.localStorage`, pass it to argument.

```tsx
const { register, handleSubmit } = useFormPersist(useForm<FormField>(), window.localStorage);
```
