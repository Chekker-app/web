'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';

export default function Register() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await signIn('credentials', {
      email: 'bomdia@gmail.com',
      password: 'bomdia',
      callbackUrl: '/',
    });
  }

  return (
    <section className="flex min-h-screen w-full flex-1 items-center justify-center bg-background">
      <div className="w-[420px] rounded-2xl border px-10 py-14">
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold text-primary">MyPageUp</h1>
        </div>

        <form className="mt-12" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <p className="text-xl font-medium">Cadastre-se</p>
            <p className="text-sm text-muted-foreground">
              É de graça e instantâneo!
            </p>
          </div>
          <div className="mt-8 space-y-8">
            <Input name="name" type="email" placeholder="Nome completo" />
            <Input name="email" type="email" placeholder="Email cadastrado" />
            <Input name="email" type="password" placeholder="Senha" />
          </div>
          <Button
            className="mt-12 w-full bg-primary text-white hover:opacity-90"
            size="lg"
          >
            Criar minha conta
          </Button>
          <p className="mt-10 text-center text-sm text-foreground">
            Já tem cadastro?
            <a href="/login" className="ml-1 text-primary hover:opacity-60">
              Acessar minha conta!
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
