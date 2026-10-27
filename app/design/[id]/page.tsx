// app/design/[id]/page.tsx

// NO "use client" aquí

// Importa el componente de cliente que creamos
import DesignDetailsClient from './DesignDetailsClient'; // Ajusta la ruta si es necesario

// Importa la función 'allDesigns' desde tu módulo de datos.
// Esto DEBE ser una función o dato que pueda ser accedido en el servidor
// (no puede depender de localStorage, etc.)
import { allDesigns } from "@/lib/data";


// Esta función se ejecuta en el servidor durante la compilación
export async function generateStaticParams() {
  // Aquí debes obtener TODOS los IDs de diseño que quieres que Next.js genere
  // como páginas estáticas.
  // Asumiendo que 'allDesigns' es una fuente de datos disponible en el servidor.
  const designs = allDesigns;

  return designs.map((design: any) => ({
    id: design.id.toString(), // Asegúrate de que el ID sea una cadena
  }));
}

// Este es el componente de la página principal. Es un Server Component por defecto.
export default function DesignDetailPage({ params }: { params: { id: string } }) {
  // Pasamos el ID directamente al componente de cliente
  const designId = Number.parseInt(params.id);

  // Renderizamos el componente de cliente
  return <DesignDetailsClient designId={designId} />;
}