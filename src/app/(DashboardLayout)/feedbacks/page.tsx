'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { IFeedbackProps, handleSendFeedback } from './services';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function Feedbacks() {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const feedbackMutation = useMutation({
    mutationFn: async (data: IFeedbackProps) => handleSendFeedback(data),
    onSuccess: () => {
      toast({
        variant: 'success',
        description: 'Feedback enviado com sucesso!',
      });
      setTitle('');
      setDescription('');
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: String(error.message),
      });
    },
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    feedbackMutation.mutate({ title, description });
  }

  return (
    <section>
      <h1>
        Tem alguma Sugestão de Funcionalidade ou Melhoria na plataforma? Mande
        para nós!
      </h1>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <Input
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Insira a Sugestão de Funcionalidade ou a Melhoria"
        />
        <Textarea
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Descreva aqui a nova funcionalidade ou melhoria"
        />

        <div className="flex w-full justify-end">
          <Button disabled={feedbackMutation.isLoading}>
            {feedbackMutation.isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Enviar Feedback
          </Button>
        </div>
      </form>
    </section>
  );
}
