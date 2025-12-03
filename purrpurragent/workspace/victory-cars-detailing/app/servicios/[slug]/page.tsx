import { redirect } from 'next/navigation';

// Eliminamos generateStaticParams para evitar errores de build con datos faltantes.

export default function ServicePage() {
  // Redireccionar cualquier intento de acceso a esta ruta vieja hacia la home
  redirect('/');
}
