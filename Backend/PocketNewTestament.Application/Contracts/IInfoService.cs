using System.Collections.Generic;
using System.Threading.Tasks;
using PocketNewTestament.Domain;

namespace PocketNewTestament.Application.Contracts
{
    public interface IInfoService
    {
         Task<Info> GetInfo();
         Task<Info> Update(Info model);
         Task<bool> UpdateAutomatic();
    }
}