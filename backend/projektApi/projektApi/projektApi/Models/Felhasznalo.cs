using System;
using System.Collections.Generic;

namespace projektApi.Models;

public partial class Felhasznalo
{
    public string Guid { get; set; } = null!;

    public string Felhasznalonev { get; set; } = null!;

    public string Jelszo { get; set; } = null!;

    public string Teljesnev { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Lejatszasilistak { get; set; } = null!;

    public DateTime Szuletesidatum { get; set; }

    public string Profilkep { get; set; } = null!;

    public virtual Lista LejatszasilistakNavigation { get; set; } = null!;
}
