using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace projektApi.Models;

public partial class Felhasznalo
{
    public string Guid { get; set; } = null!;

    public string Felhasznalonev { get; set; } = null!;

    public string Jelszo { get; set; } = null!;

    public string? Teljesnev { get; set; }

    public string? Email { get; set; }

    public DateTime? Szuletesdatum { get; set; }

    public string? Profilkep { get; set; }
    
    public virtual ICollection<LejatszasiLista> LejátszasiLista { get; set; } = new List<LejatszasiLista>();
}
