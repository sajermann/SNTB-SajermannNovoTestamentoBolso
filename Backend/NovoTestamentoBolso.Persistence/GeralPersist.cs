using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NovoTestamentoBolso.Domain;
using NovoTestamentoBolso.Persistence.Context;
using NovoTestamentoBolso.Persistence.Contracts;

namespace NovoTestamentoBolso.Persistence
{
    public class GeralPersist : IGeralPersist
    {
        private readonly NovoTestamentoBolsoContext _context;
        public GeralPersist(NovoTestamentoBolsoContext context)
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