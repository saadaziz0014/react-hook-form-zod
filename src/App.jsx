import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import formSchema from "./schema"
import API from "./api"

export default function App() {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      hobbies: [],
    },
    resolver: zodResolver(formSchema),
  })

  const { append, remove, fields } = useFieldArray({
    control: useForm().control,
    name: 'hobbies',
  })

  const onSubmit = async (data) => {
    try {
      console.log(data)
      let dataRES = await API();
    } catch (error) {
      setError("root", { message: error })
    }
  }

  return (
    <div className="App">
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <label>
            Name:
          </label>
          <input type="text" name="name" {...register('name')} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <label>
            Email:
          </label>
          <input type="text" name="email" {...register('email')} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <label>
            Password:
          </label>
          <input type="password" name="password" {...register('password')} />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <label>
            Hobbies
          </label>
          {fields.map((field, index) => (
            <div key={field.id} style={{ display: 'flex', gap: '10px' }}>
              <input type="text" {...register(`hobbies.${index}.value`)} />
              <button type="button" onClick={() => remove(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => append({ value: '' })}>Add</button>
          {errors.hobbies && <p style={{ color: 'red' }}>{errors.hobbies.message}</p>}
        </div>
        <input type="submit" value="Submit" />
        {isSubmitting && <p>Submitting...</p>}
        {errors.root && <p style={{ color: 'red' }}>{errors.root.message}</p>}
      </form>
    </div>
  )
}