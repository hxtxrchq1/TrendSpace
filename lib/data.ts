// Base de datos simulada con las imágenes reales proporcionadas
export const designs = [
  {
    id: 1,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-1.jpg-lBWnOyx7lnOHOYQVWI8Cd5SvFSAerD.jpeg", // Angel design
    title: "Official Man Tee",
    likes: 245,
    comments: 12,
    goal: 300,
    price: 120,
    designer: "Maria Lopez",
    description:
      "Camiseta blanca con diseño de ángel y tipografía gótica. Estilo urbano y moderno perfecto para cualquier ocasión casual.",
    hasReachedGoal: false,
    reservations: 15,
    collection: "DROP 1",
  },
  {
    id: 2,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-37.jpg-SZrnP8bH6b2kWIYaGGH1PwDhxK8OrM.jpeg", // Plaid corset
    title: "Vintage Plaid Corset",
    likes: 389,
    comments: 23,
    goal: 400,
    price: 180,
    designer: "Carlos Rivera",
    description: "Blusa con corset negro y tela a cuadros en blanco y negro. Diseño elegante con un toque vintage.",
    hasReachedGoal: false,
    reservations: 28,
    collection: "DROP 1",
  },
  {
    id: 3,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-3.jpg-e4zq3AG5pzLWXxeaTecWaCOGJh8Gs0.jpeg", // Brown lace top
    title: "Brown Lace Top",
    likes: 156,
    comments: 8,
    goal: 300,
    price: 95,
    designer: "Ana Garcia",
    description: "Top de encaje en color marrón con detalles en azul claro. Diseño romántico y delicado.",
    hasReachedGoal: false,
    reservations: 8,
    collection: "DROP 2",
  },
  {
    id: 4,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-4.jpg-wkRKFJXsIJmg4RqS8sEKPvC43N4tk7.jpeg", // Denim skirt
    title: "Denim Maxi Skirt",
    likes: 350,
    comments: 15,
    goal: 350,
    price: 140,
    designer: "Diego Martinez",
    description: "Falda larga de mezclilla en color azul. Estilo vintage con corte recto.",
    hasReachedGoal: true, // Este ya alcanzó la meta
    reservations: 42,
    collection: "DROP 2",
  },
  {
    id: 5,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-17.jpg-ePeyjpdNiX3IzqDl3zMjupM7vi4mKh.jpeg", // Purple hoodie
    title: "Purple Angel Hoodie",
    likes: 187,
    comments: 9,
    goal: 250,
    price: 160,
    designer: "Sofia Chen",
    description: "Sudadera con capucha en color púrpura con diseños estampados. Estilo urbano y cómodo.",
    hasReachedGoal: false,
    reservations: 12,
    collection: "DROP 2",
  },
  {
    id: 6,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-40.jpg-7cjlHaLHyxem5TbL7gR7bheCkdMDgM.jpeg", // Graffiti joggers
    title: "Graffiti Joggers",
    likes: 412,
    comments: 28,
    goal: 400,
    price: 135,
    designer: "Alex Johnson",
    description: "Pantalón deportivo gris con un diseño de graffiti en color claro. Estilo urbano y cómodo.",
    hasReachedGoal: true, // Este también alcanzó la meta
    reservations: 35,
    collection: "DROP 1",
  },
]

// Añadir más diseños
export const allDesigns = [
  ...designs,
  {
    id: 7,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-1.jpg-lBWnOyx7lnOHOYQVWI8Cd5SvFSAerD.jpeg",
    title: "Cherub White Tee",
    likes: 278,
    comments: 18,
    goal: 350,
    price: 110,
    designer: "Pablo Mendez",
    description: "Camiseta blanca con diseño de querubín. Estilo minimalista con un toque artístico.",
    hasReachedGoal: false,
    reservations: 22,
    collection: "DROP 1",
  },
  {
    id: 8,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-17.jpg-ePeyjpdNiX3IzqDl3zMjupM7vi4mKh.jpeg",
    title: "Vintage Washed Hoodie",
    likes: 320,
    comments: 25,
    goal: 300,
    price: 175,
    designer: "Laura Kim",
    description: "Sudadera con efecto lavado vintage. Diseño urbano con detalles únicos.",
    hasReachedGoal: true,
    reservations: 48,
    collection: "DROP 2",
  },
  {
    id: 9,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-40.jpg-7cjlHaLHyxem5TbL7gR7bheCkdMDgM.jpeg",
    title: "Urban Script Pants",
    likes: 210,
    comments: 14,
    goal: 250,
    price: 145,
    designer: "Marco Polo",
    description: "Pantalones con diseño de texto urbano. Perfectos para un look casual con personalidad.",
    hasReachedGoal: false,
    reservations: 19,
    collection: "DROP 1",
  },
  {
    id: 10,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-37.jpg-SZrnP8bH6b2kWIYaGGH1PwDhxK8OrM.jpeg",
    title: "Retro Check Top",
    likes: 290,
    comments: 22,
    goal: 300,
    price: 165,
    designer: "Emma Watson",
    description: "Top con diseño a cuadros retro. Elegante y versátil para diferentes ocasiones.",
    hasReachedGoal: false,
    reservations: 31,
    collection: "DROP 2",
  },
]

export const getDesignById = (id: number) => {
  return allDesigns.find((design) => design.id === id)
}

export const getRelatedDesigns = (currentId: number) => {
  return allDesigns.filter((design) => design.id !== currentId).slice(0, 3)
}

export const getDesignsByCollection = (collection: string) => {
  return allDesigns.filter((design) => design.collection === collection)
}

export const collections = [
  {
    id: 1,
    name: "DROP 1",
    designs: allDesigns.filter((design) => design.collection === "DROP 1"),
  },
  {
    id: 2,
    name: "DROP 2",
    designs: allDesigns.filter((design) => design.collection === "DROP 2"),
  },
]

export const userProfile = {
  username: "ceohls",
  name: "Gabriel André",
  lastName: "Perez Dominguez",
  bio: "Cuentanos sobre ti",
  socialMedia: "https://",
  avatar:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/221ed1462c06e370f32602a0e456ef57.jpg-9eVyBf2cmLPSTREXSIFOM8U9vWDspd.jpeg", // Imagen de Snoopy
}

export const garmentTypes = [
  {
    id: "polo",
    name: "Polo",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/polo-gaZ4jZrxv1OcXU3xjZuAotlkYiQeNb.png", // Imagen de polo
  },
  {
    id: "hoodie",
    name: "Hoodie",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hoodie-XzL7Q4U6SS7QAdRxHn6MmFzgYKc3Or.png", // Imagen de hoodie
  },
  {
    id: "pant",
    name: "Pant",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pant%20mockup.jpg-gf67ARCdItlFS0mEZClgeol43zyw1L.png", // Imagen de pantalón
  },
]

// Función para agregar un nuevo diseño permanentemente
export function addNewDesign(design: any) {
  allDesigns.unshift(design)
}

// Función para generar imagen compuesta (simulada)
export function generateCompositeImage(garmentType: string, designImage: string, position: any, size: number) {
  // En una aplicación real, aquí usarías Canvas API o una librería para combinar las imágenes
  // Por ahora, simularemos que se genera una imagen compuesta
  return designImage // Temporalmente retornamos la imagen del diseño
}
