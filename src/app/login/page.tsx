'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import Image from 'next/image';

export default function Login() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    }).then(({ ok }: any) => {
      if (ok) {
        setIsLoading(false);
        toast({
          variant: 'success',
          description:
            'Login efetuado com sucesso! Estamos redirecionando você para a tela inicial.',
        });
        return window.location.replace('/');
      } else {
        setIsLoading(false);
        toast({
          variant: 'destructive',
          description:
            'Não foi possível fazer login. Verifique os dados e tente novamente!',
        });
      }
    });
  }

  return (
    <section className="flex min-h-screen w-full flex-1 items-center justify-center bg-background">
      <div className="w-[420px] rounded-2xl border px-10 py-14">
        <div className="flex flex-col">
          <Image
            src="/logo.png"
            alt="Chekker"
            draggable={false}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: '70%',
              margin: '0 auto',
            }}
          />
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
            <Input name="password" type="password" placeholder="Senha" />
          </div>
          <p className="mt-8 text-right text-xs text-foreground">
            Esqueceu sua senha?
            <a
              href="/reset-password"
              className="ml-1 text-primary hover:opacity-60"
            >
              Redefina
            </a>
          </p>
          <Button
            className="mt-12 w-full bg-primary text-white hover:opacity-90"
            size="lg"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
