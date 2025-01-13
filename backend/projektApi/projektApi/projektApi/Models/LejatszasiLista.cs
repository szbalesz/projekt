using System;
using System.Collections.Generic;

namespace projektApi.Models;

public partial class LejatszasiLista
{
    public string Guid { get; set; } = null!;

    public string FelhasznaloId { get; set; } = null!;

    public string? ListaNev { get; set; }

    public virtual Felhasznalo Felhasznalo { get; set; } = null!;

    public virtual ICollection<Zene> Zenes { get; set; } = new List<Zene>();
}
