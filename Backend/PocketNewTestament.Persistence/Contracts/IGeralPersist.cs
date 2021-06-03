using System.Collections.Generic;
using System.Threading.Tasks;
using PocketNewTestament.Domain;

namespace PocketNewTestament.Persistence.Contracts
{
    public interface IGeralPersist
    {
        void Add<T>(T entity) where T: class;
        void Update<T>(T entity) where T: class;
        void Delete(int id);
        Task<List<Biblia>> GetAll();
        Task<Biblia> GetById(int id);
        Task<bool> SaveChangesAsync();
        Task<Info> GetInfo();
    }
}