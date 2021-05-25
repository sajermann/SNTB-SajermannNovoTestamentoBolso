using System;

namespace PocketNewTestament.Domain
{
    public class Biblia
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public int Capitulo { get; set; }
        public int Versiculo { get; set; }
        public string Descricao { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsActive { get; set; }
    }
}
