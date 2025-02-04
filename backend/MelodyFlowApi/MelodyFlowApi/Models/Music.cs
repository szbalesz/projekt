using System;
using System.Collections.Generic;

namespace MelodyFlowApi.Models;

public partial class Music
{
    public string Id { get; set; } = null!;

    public string? Artist { get; set; }

    public string? Title { get; set; }

    public string? ImageUrl { get; set; }

    public string MusicUrl { get; set; } = null!;
}
