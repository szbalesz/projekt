using System;
using System.Collections.Generic;

namespace projektApi.Models;

public partial class Lista
{
    public string Guid { get; set; } = null!;

    public string ZeneId { get; set; } = null!;

    public virtual ICollection<Felhasznalo> Felhasznalos { get; set; } = new List<Felhasznalo>();

    public virtual Tartalom Zene { get; set; } = null!;
}
