using System;
using System.Collections.Generic;

namespace projektApi.Models;

public partial class Zene
{
    public string Guid { get; set; } = null!;

    public string? Eloado { get; set; }

    public string? Cim { get; set; }

    public string? Kep { get; set; }

    public virtual ICollection<LejatszasiLista> Lista { get; set; } = new List<LejatszasiLista>();
}
