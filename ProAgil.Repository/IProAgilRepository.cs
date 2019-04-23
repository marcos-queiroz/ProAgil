using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
        // Geral
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        // Eventos
        Task<Evento[]> GetAllEventoAsync(bool includePalestrantes);
        Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrantes);
        Task<Evento> GetAllEventoAsyncById(int EventoId, bool includePalestrantes);

        // Palestrantes
        Task<Palestrante> GetAllPalestrantesAsync(int PalestranteId, bool includeEventos = false);
        Task<Palestrante[]> GetAllPalestranteAsyncByName(string nome, bool includeEventos = false);
    }
}