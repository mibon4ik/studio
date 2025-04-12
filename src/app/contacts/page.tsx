'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {useState} from 'react';
import {useToast} from '@/hooks/use-toast';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {cn} from '@/lib/utils';
import {Mail} from 'lucide-react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Имя должно содержать не менее 2 символов.',
  }),
  email: z.string().email({
    message: 'Необходимо ввести корректный email.',
  }),
  message: z.string().min(10, {
    message: 'Сообщение должно содержать не менее 10 символов.',
  }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {toast} = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: 'Сообщение успешно отправлено!',
          description: 'Мы свяжемся с вами в ближайшее время.',
        });
        reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Ошибка отправки сообщения',
          description: 'Пожалуйста, попробуйте еще раз позже.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Непредвиденная ошибка',
        description: 'Произошла ошибка при отправке сообщения.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md rounded-lg shadow-md border-0">
        <CardHeader className="flex flex-col items-center space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Связаться <span className="text-primary">Со Мной</span>
          </CardTitle>
          <CardDescription>Отправьте ваше сообщение, и мы свяжемся с вами!</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <Input
                type="text"
                placeholder="Ваше Имя"
                className={cn(
                  'rounded-md shadow-sm transition-all duration-300 focus:ring-primary focus:border-primary w-full',
                  errors.name && 'border-red-500'
                )}
                {...register('name')}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Input
                type="email"
                placeholder="Ваш Email"
                className={cn(
                  'rounded-md shadow-sm transition-all duration-300 focus:ring-primary focus:border-primary w-full',
                  errors.email && 'border-red-500'
                )}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Textarea
                placeholder="Ваше Сообщение"
                className={cn(
                  'rounded-md shadow-sm transition-all duration-300 focus:ring-primary focus:border-primary w-full',
                  errors.message && 'border-red-500'
                )}
                {...register('message')}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground rounded-md px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg w-full"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить Сообщение'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
