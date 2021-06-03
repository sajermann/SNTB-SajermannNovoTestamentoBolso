using Microsoft.EntityFrameworkCore;
using PocketNewTestament.Domain;

namespace PocketNewTestament.Persistence.Context
{
    public class PocketNewTestamentContext : DbContext
    {
        public PocketNewTestamentContext(DbContextOptions<PocketNewTestamentContext> options) 
            : base(options){}
        public DbSet<Biblia> Biblias { get; set; }
        public DbSet<Info> Infos { get; set; }
    }
}