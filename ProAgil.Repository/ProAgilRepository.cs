using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public class ProAgilRepository : IProAgilRepository
    {
        private readonly ProAgilContext _context;

        public ProAgilRepository( ProAgilContext Context)
        {
            _context = Context;
        }


        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update( entity);
        }
        
        public void Delete<T>(T entity) where T : class
        {
           _context.Remove(entity) ;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return ( await _context.SaveChangesAsync() )>0; // se salvou algum registro
        }

        // Eventos
        public async Task<Evento[]> GetAllEventosAsyn(bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
            .Include( c => c.Lotes)
            .Include( c => c.RedesSociais);

            if ( includePalestrantes){
                query = query
                    .Include( pe => pe.PalestrantesEventos)
                    .ThenInclude( p => p.Palestrante);
            }
            // quando não usa o automapper e está especificando o tipo de retorno, então por default trava o recurso
            query = query.AsNoTracking()
                    .OrderByDescending( c => c.DataEvento);
            return await query.ToArrayAsync(); 


        }

        public async Task<Evento> GetAllEventoAsynById(int EventoId, bool includePalestrantes=false)
        {
              IQueryable<Evento> query = _context.Eventos
            .Include( c => c.Lotes)
            .Include( c => c.RedesSociais);

            if ( includePalestrantes){
                query = query
                    .Include( pe => pe.PalestrantesEventos)
                    .ThenInclude( p => p.Palestrante);
            }

            query = query.AsNoTracking()
                        .OrderByDescending( c => c.DataEvento)
                        .Where( c => c.Id == EventoId);
                        
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Evento[]> GetAllEventosAsynByTema(string tema, bool includePalestrantes)
        {
              IQueryable<Evento> query = _context.Eventos
            .Include( c => c.Lotes)
            .Include( c => c.RedesSociais);

            if ( includePalestrantes){
                query = query
                    .Include( pe => pe.PalestrantesEventos)
                    .ThenInclude( p => p.Palestrante); // muitos para muitos
            }

            query = query.AsNoTracking()
                        .OrderByDescending( c => c.DataEvento)
                        .Where( c => c.Tema.ToLower().Contains( tema.ToLower() ) );
            return await query.ToArrayAsync(); 
        }


        // Palestrante


        public async Task<Palestrante[]> GetAllPalestrantesAsynByName(string nome, bool includeEventos =false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
            .Include( c => c.RedesSociais);

            if (includeEventos ){
                query = query
                    .Include( pe => pe.PalestrantesEventos)
                    .ThenInclude( e => e.Evento);
            }

            query = query.AsNoTracking()
                        .Where(p => p.Nome.ToLower().Contains(nome.ToLower()));
                        
            return await query.ToArrayAsync();
        }

        public async Task<Palestrante> GetPalestranteByIdAsyn(int PalestranteId, bool includeEventos=false)
        {
             IQueryable<Palestrante> query = _context.Palestrantes
            .Include( c => c.RedesSociais);

            if (includeEventos ){
                query = query
                    .Include( pe => pe.PalestrantesEventos)
                    .ThenInclude( e => e.Evento);
            }

            query = query.AsNoTracking()
                            .OrderBy( p => p.Nome)
                            .Where(p => p.Id == PalestranteId);
                        
            return await query.FirstOrDefaultAsync();
        }
   }



}