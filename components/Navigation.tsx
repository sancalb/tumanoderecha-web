
'use client';

import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { business } from '@/lib/site';

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const links = [
    ['Beneficios', '#beneficios'],
    ['Nuestro modelo', '#modelo'],
    ['Método CLARO', '#metodo'],
    ['Servicios', '#servicios'],
    ['Nosotros', '#fundador'],
  ];

  return (
    <header className="topbar">
      <div className="container nav-inner">
        <a
          className="wordmark"
          href="#inicio"
          aria-label="Tu Mano Derecha, inicio"
          onClick={() => setOpen(false)}
        >
          <span className="mark">
            TM<span>.</span>D
          </span>

          <span className="brand-name">
            TU MANO DERECHA
            <small>SISTEMAS · INTELIGENCIA · DIRECCIÓN</small>
          </span>
        </a>

        <nav
          className={open ? 'nav-links open' : 'nav-links'}
          aria-label="Navegación principal"
        >
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}

          <a
            href={business.bookingUrl || '#contacto'}
            className="nav-book"
            target={business.bookingUrl ? '_blank' : undefined}
            rel={business.bookingUrl ? 'noopener noreferrer' : undefined}
            onClick={() => setOpen(false)}
          >
            Agendar llamada
            <ArrowUpRight size={15} />
          </a>
        </nav>

        <button
          className="menu-toggle"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
