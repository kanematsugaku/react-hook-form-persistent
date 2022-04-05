import { useForm } from 'react-hook-form';
import useFormPersist from './lib/main';

type FormField = {
  name: string;
  age: number;
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
          <label htmlFor="age">Age:</label>
          <input id="age" type="number" {...register('age')} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <hr />
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
}
