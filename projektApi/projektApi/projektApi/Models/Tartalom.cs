using System;
using System.Collections.Generic;

namespace projektApi.Models;

public partial class Tartalom
{
    public string Guid { get; set; } = null!;

    public string Eloado { get; set; } = null!;

    public string Cim { get; set; } = null!;

    public string Kep { get; set; } = null!;

    public virtual ICollection<Lista> Lista { get; set; } = new List<Lista>();
}
