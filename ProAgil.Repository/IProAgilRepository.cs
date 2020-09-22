using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
            void Add<T>(T entity) where T:class;
            void Update<T>(T entity) where T:class;
            void Delete<T>(T entity) where T:class;

            Task<bool> SaveChangesAsync();

            // Eventos
            Task<Evento[]> GetAllEventosAsynByTema( string tema, bool includePalestrantes);
            Task<Evento[]> GetAllEventosAsyn(bool includePalestrantes);
            Task<Evento> GetAllEventoAsynById( int EventoId, bool includePalestrantes);

            // Palestrantes
       
            Task<Palestrante[]> GetAllPalestrantesAsynByName( string nome, bool includeEventos);
            Task<Palestrante> GetPalestranteByIdAsyn(int PalestranteId, bool includeEventos);     


         
    }
}