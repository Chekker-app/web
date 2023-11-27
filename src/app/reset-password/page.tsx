'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Login() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await api.post('/auth/reset-password', { email: formData.get('email') });
      toast({
        variant: 'success',
        description:
          'Redefinição feita com sucesso! Sua nova senha foi enviada para o e-mail informado.',
      });

      setTimeout(() => {
        return window.location.replace('/login');
      }, 2000);
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          'Não foi possível redefinir sua senha! Verifique os dados e tente novamente',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen w-full flex-1 items-center justify-center bg-background">
      <div className="w-[420px] rounded-2xl border px-10 py-14">
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold text-primary">MyPageUp</h1>
        </div>

        <form className="mt-12" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <p className="text-xl font-medium">Recuperar senha</p>
            <p className="text-sm text-muted-foreground">
              Você receberá em seu e-mail um link para cadastrar uma nova senha.
            </p>
          </div>
          <div className="mt-8">
            <Input name="email" type="email" placeholder="Email cadastrado" />
          </div>
          <Button
            className="mt-12 w-full bg-primary text-white hover:opacity-90"
            size="lg"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Recuperar senha
          </Button>
          <p className="mt-10 text-center text-sm text-foreground">
            Ja tem cadastro?
            <a href="/login" className="ml-1 text-primary hover:opacity-60">
              Acessar minha conta!
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
