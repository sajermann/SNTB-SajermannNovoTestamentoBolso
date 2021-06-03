using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PocketNewTestament.Application.Contracts;
using PocketNewTestament.Domain;
using PocketNewTestament.Persistence;
using PocketNewTestament.Persistence.Contracts;

namespace PocketNewTestament.Application
{
    public class BibliaService : IBibliaService
    {
        private readonly IGeralPersist _geralPersist;
        
        public BibliaService(IGeralPersist geralPersist)
        {
            _geralPersist = geralPersist;
        }
        public async Task<List<Biblia>> GetAll()
        {
           return await _geralPersist.GetAll();
        }
        public async Task<Biblia> GetById(int id)
        {
           return await _geralPersist.GetById(id);
        }
        public async Task<Biblia> Add(Biblia model)
        {
            try{
                model.CreatedAt = DateTime.Now;
                model.UpdatedAt = DateTime.Now;
                model.IsActive = true;
                _geralPersist.Add<Biblia>(model);
                if(await _geralPersist.SaveChangesAsync()){
                    return await _geralPersist.GetById(model.Id);
                }
                return null;
            }catch(Exception e){
                throw new Exception(e.Message);
            }
        }
        public async Task<Biblia> Update(Biblia model)
        {
            try{
                var oldResult = await _geralPersist.GetById(model.Id);
                model.CreatedAt = oldResult.CreatedAt;
                model.UpdatedAt = DateTime.Now;
                model.IsActive = true;
                _geralPersist.Update<Biblia>(model);
                if(await _geralPersist.SaveChangesAsync()){
                    return await _geralPersist.GetById(model.Id);
                }
                return null;
            }catch(Exception e){
                throw new Exception(e.Message);
            }
        }
        public async Task<bool> Delete(int id)
        {
            try{
                _geralPersist.Delete(id);
                if(await _geralPersist.SaveChangesAsync()) return true;
                return false;
            }catch(Exception e){
                throw new Exception(e.Message);
            }
        }
    }
}
