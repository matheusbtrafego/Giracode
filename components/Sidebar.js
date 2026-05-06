"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Settings, QrCode, LogOut, BarChart3, Globe } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Estatísticas', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Configurações', icon: <Settings size={20} />, path: '/settings' },
    { name: 'Meus QR Codes', icon: <QrCode size={20} />, path: '/' },
    { name: 'Domínio', icon: <Globe size={20} />, path: '#' },
    { name: 'Relatórios', icon: <BarChart3 size={20} />, path: '#' },
  ];

  return (
    <div className="sidebar no-print">
      <div className="sidebar-logo">
        <img src="/logo.png" alt="Gira CODE" className="logo-img" />
        <span>Gira CODE</span>
      </div>

      <nav style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.path} 
            className={`nav-link ${pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div style={{ borderTop: '1px solid var(--sidebar-border)', paddingTop: '1.5rem' }}>
        <Link href="#" className="nav-link">
          <LogOut size={20} />
          <span>Sair</span>
        </Link>
      </div>
    </div>
  );
}
