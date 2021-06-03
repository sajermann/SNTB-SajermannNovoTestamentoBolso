using System;

namespace PocketNewTestament.Domain
{
    public class Info
    {
        public int Id { get; set; }
        public int RegistersCount { get; set; }
        public string Version { get; set; }
        public string DatabaseSize { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
