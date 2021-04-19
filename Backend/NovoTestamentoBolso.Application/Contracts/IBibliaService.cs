using System.Collections.Generic;
using System.Threading.Tasks;
using NovoTestamentoBolso.Domain;

namespace NovoTestamentoBolso.Application.Contracts
{
    public interface IBibliaService
    {
         Task<List<Biblia>> GetAll();
         Task<Biblia> Add(Biblia model);
         Task<Biblia> Update(Biblia model);
         Task<bool> Delete(int id);
    }
}