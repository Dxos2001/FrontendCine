import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pelicula/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const response = await fetch('http://34.71.55.81:5208/Cartelera/PeliculasXSala');
      const peliculas = await response.json();
      // Extrae solo los IDs de cada película
      return peliculas.map((pelicula: any) => ({ id: String(pelicula.id) }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];