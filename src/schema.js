import { z } from 'zod';

const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(1, { message: 'Password is required' }),
    hobbies: z.array(z.string(), { required_error: 'Hobbies are required' }).min(1, { message: 'Hobbies are required' }),
});

export default formSchema