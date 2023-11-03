'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';

export default function Login() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await signIn('credentials', {
      email: 'bomdia@gmail.com',
      password: 'bomdia',
      callbackUrl: '/',
    });
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="min-w-[400px] space-y-4 rounded-lg bg-white p-4 text-center"
      >
        <Input name="email" type="email" placeholder="Insira seu email" />
        <Input name="password" type="password" placeholder="Insira sua senha" />
        <Button type="submit">Fazer login</Button>
      </form>
    </div>
  );
}
