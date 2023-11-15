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
    <section className="flex min-h-screen w-full flex-1 items-center justify-center bg-background">
      <div className="w-[420px] rounded-2xl border px-10 py-14">
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold text-primary">MyPageUp</h1>
        </div>

        <form className="mt-12" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <p className="text-xl font-medium">Boas vindas</p>
            <p className="text-sm text-muted-foreground">
              Insira os seus dados para acessar a sua conta
            </p>
          </div>
          <div className="mt-8 space-y-8">
            <Input name="email" type="email" placeholder="Email cadastrado" />
            <Input name="email" type="password" placeholder="Senha" />
          </div>
          {/* <p className="mt-8 text-right text-xs text-foreground">
            Esqueceu sua senha?
            <a
              href="/reset-password"
              className="ml-1 text-primary hover:opacity-60"
            >
              Redefina
            </a>
          </p> */}
          <Button
            className="mt-12 w-full bg-primary text-white hover:opacity-90"
            size="lg"
          >
            Entrar na minha conta
          </Button>
          <p className="mt-10 text-center text-sm text-foreground">
            Ainda não tem cadastro?
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer noopen"
              className="ml-1 text-primary hover:opacity-60"
            >
              Cadastre-se agora!
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
