"use client";
import React, { useState, useEffect } from 'react';
import { Save, Link as LinkIcon, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setUrl(data.destinationUrl || ''));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus('Salvando...');
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destinationUrl: url })
      });
      if (res.ok) {
        setStatus('Configuração salva com sucesso!');
        setTimeout(() => setStatus(''), 3000);
      }
    } catch (error) {
      setStatus('Erro ao salvar.');
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Configurações do QR Code</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Defina para onde os usuários serão levados ao escanear o código
        </p>
      </header>

      <div className="card">
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LinkIcon size={18} color="var(--primary)" />
              Página de Destino (URL)
            </label>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>
              Insira o link do seu <strong>Google Forms</strong> ou qualquer outro site para onde o QR Code deve redirecionar.
            </p>
            <input 
              type="text" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://docs.google.com/forms/d/..."
              required
            />
          </div>

          <div style={{ padding: '1rem', background: '#fff9c4', borderRadius: '8px', border: '1px solid #fff59d', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <AlertCircle size={20} color="#fbc02d" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '0.85rem', color: '#616161', lineHeight: '1.4' }}>
              <strong>Importante:</strong> Esta alteração é instantânea. Todos os QR Codes impressos passarão a levar para este novo link imediatamente.
            </p>
          </div>

          <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Save size={18} />
            Salvar Configurações
          </button>

          {status && (
            <p style={{ marginTop: '1rem', color: status.includes('Erro') ? '#f44336' : '#4caf50', fontWeight: 500 }}>
              {status}
            </p>
          )}
        </form>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Atalhos Rápidos</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="badge" onClick={() => setUrl('/form')} style={{ cursor: 'pointer', border: '1px solid #ddd' }}>Formulário Interno</button>
          <button className="badge" onClick={() => setUrl('https://wa.me/5511999999999')} style={{ cursor: 'pointer', border: '1px solid #ddd' }}>WhatsApp</button>
          <button className="badge" onClick={() => setUrl('https://google.com')} style={{ cursor: 'pointer', border: '1px solid #ddd' }}>Google</button>
        </div>
      </div>
    </div>
  );
}
