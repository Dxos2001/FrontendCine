import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pelicula/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const response = await fetch('https://apicinenet.d-xos.com/Cartelera/PeliculasXSala');
      //const response = await fetch('https://backendcinejava.rj.r.appspot.com/cartelera/PeliculasXSala');
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