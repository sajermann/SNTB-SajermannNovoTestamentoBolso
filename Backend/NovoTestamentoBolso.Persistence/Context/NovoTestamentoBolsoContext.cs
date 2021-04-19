using Microsoft.EntityFrameworkCore;
using NovoTestamentoBolso.Domain;

namespace NovoTestamentoBolso.Persistence.Context
{
    public class NovoTestamentoBolsoContext : DbContext
    {
        public NovoTestamentoBolsoContext(DbContextOptions<NovoTestamentoBolsoContext> options) 
            : base(options){}
        public DbSet<Biblia> Biblias { get; set; }
    }
}