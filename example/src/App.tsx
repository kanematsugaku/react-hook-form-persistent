import { useForm } from 'react-hook-form';
import useFormPersist from './lib/main';

type FormField = {
  name: string;
  email: number;
};

export default function App() {
  const { register, handleSubmit } = useFormPersist(useForm<FormField>());

  return (
    <div style={{ padding: '32px' }}>
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
