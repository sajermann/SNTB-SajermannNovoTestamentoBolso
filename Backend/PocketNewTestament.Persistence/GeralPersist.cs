using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PocketNewTestament.Domain;
using PocketNewTestament.Persistence.Context;
using PocketNewTestament.Persistence.Contracts;

namespace PocketNewTestament.Persistence
{
    public class GeralPersist : IGeralPersist
    {
        private readonly PocketNewTestamentContext _context;
        public GeralPersist(PocketNewTestamentContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete(int id)
        {
            var t = _context.Biblias
                .Where(b => b.Id == id && b.IsActive)
                .FirstOrDefault();
            t.IsActive = false;
        }

        public async Task<List<Biblia>> GetAll()
        {
            return await _context.Biblias.Where(b => b.IsActive).ToListAsync();
        }
        public async Task<Biblia> GetById(int id)
        {
            return await _context.Biblias.Where(b => b.IsActive && b.Id == id).FirstOrDefaultAsync();
        }
        public async Task<bool> SaveChangesAsync()
        {
            try
            {
                return (await _context.SaveChangesAsync()) > 0;
            }
            catch (Exception e)
            {
                var t = e.Message;
            }
            return false;
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
    }
}