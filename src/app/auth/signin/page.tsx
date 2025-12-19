import LoginButton from '@/components/LoginButton';
import { Card } from '@/components/ui/card';

export default function SignIn() {
  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4'>
      <Card className='w-full max-w-md p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome Back</h1>
          <p className='text-gray-600'>Sign in to access the chat assistant</p>
        </div>

        <LoginButton />

        <p className='text-center text-sm text-gray-600 mt-6'>
          By signing in, you agree to our terms and privacy policy
        </p>
      </Card>
    </div>
  );
}
