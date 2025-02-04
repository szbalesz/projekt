using System;
using System.Collections.Generic;

namespace MelodyFlowApi.Models;

public partial class Playlist
{
    public string Id { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public string? PlaylistName { get; set; }

    public string ImageUrl { get; set; } = null!;
}
