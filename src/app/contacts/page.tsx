'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {useState} from 'react';
import {useToast} from "@/hooks/use-toast";
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {cn} from "@/lib/utils";
import styles from './contacts.module.css';
import {Mail} from "lucide-react";

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
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-6 animate-fade-in">
          Связаться <span className="text-primary">Со Мной</span>
        </h1>
        <div className={styles.formContainer}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 animate-slide-in-bottom"
          >
            <div>
              <Input
                type="text"
                placeholder="Ваше Имя"
                className={cn(
                  "rounded-full shadow-sm transition-all duration-300 focus:ring-primary focus:border-primary w-full",
                  errors.name && "border-red-500",
                  styles.input
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
                  "rounded-full shadow-sm transition-all duration-300 focus:ring-primary focus:border-primary w-full",
                  errors.email && "border-red-500",
                  styles.input
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
                  "rounded-md shadow-sm transition-all duration-300 focus:ring-primary focus:border-primary w-full",
                  errors.message && "border-red-500",
                  styles.textarea
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
              className={cn(
                "bg-primary text-primary-foreground rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg w-full",
                styles.button
              )}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить Сообщение'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
