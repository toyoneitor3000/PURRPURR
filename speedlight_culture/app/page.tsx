export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-900 text-white p-8">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          El garaje digital para tu proyecto.
        </h1>
        <p className="text-lg md:text-xl text-zinc-400">
          Muestra tu pasión, conecta con la cultura. Únete a la lista de fundadores para obtener acceso prioritario y ser el primero en saber cuándo lanzamos.
        </p>
        
        {/* -- INSTRUCCIÓN: REEMPLAZA LA URL DE ABAJO -- */}
        <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="flex flex-col sm:flex-row gap-3 mx-auto max-w-md pt-4">
          <input 
            type="email" 
            name="email"
            placeholder="Tu correo electrónico"
            required
            className="flex-grow p-3 rounded-md bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          <button 
            type="submit" 
            className="p-3 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold transition-colors duration-200"
          >
            Unirme a la lista
          </button>
        </form>
        <p className="text-sm text-zinc-500 pt-2">¡Sin spam, solo noticias del lanzamiento!</p>
      </div>
    </main>
  );
}