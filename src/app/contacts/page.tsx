'use client';

import styles from './contacts.module.css';
import React, {useState} from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Сообщение успешно отправлено!');
        setFormData({name: '', email: '', message: ''});
      } else {
        alert('Не удалось отправить сообщение. Пожалуйста, попробуйте позже.');
      }
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-6 animate-fade-in">
          Связаться <span className="text-primary">Со Мной</span>
        </h1>
        <div className={styles.formContainer}>
          <form className="flex flex-col gap-4 animate-slide-in-bottom" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                className="flex h-10 border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-full shadow-sm transition-all duration-300 focus:ring-primary focus:border-primary w-full"
                placeholder="Ваше Имя"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="email"
                className="flex h-10 border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-full shadow-sm transition-all duration-300 focus:ring-primary focus:border-primary w-full"
                placeholder="Ваш Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <textarea
                className="flex min-h-[80px] border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-md shadow-sm transition-all duration-300 focus:ring-primary focus:border-primary w-full"
                placeholder="Ваше Сообщение"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-primary/90 h-10 bg-primary text-primary-foreground rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg w-full"
              type="submit"
            >
              Отправить Сообщение
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
