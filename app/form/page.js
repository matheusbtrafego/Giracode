"use client";
import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

export default function FormPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="card" style={{ textAlign: 'center', maxWidth: '400px', padding: '3rem' }}>
          <CheckCircle2 size={60} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>Obrigado!</h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Suas informações foram recebidas. Em breve traremos novidades exclusivas para você.
          </p>
          <button 
            className="btn-primary" 
            style={{ marginTop: '2rem', width: '100%' }}
            onClick={() => setSubmitted(false)}
          >
            Voltar
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', fontWeight: 700 }}>Gira CODE</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Cadastre-se para receber ofertas da loja
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Nome Completo</label>
            <input type="text" placeholder="Seu nome" required />
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>WhatsApp</label>
            <input type="tel" placeholder="(11) 99999-9999" required />
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>E-mail (Opcional)</label>
            <input type="email" placeholder="seu@email.com" />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Send size={18} />
            Enviar Cadastro
          </button>
        </form>
        
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2rem' }}>
          Ao enviar, você concorda em receber comunicações da nossa loja.
        </p>
      </div>
    </main>
  );
}
