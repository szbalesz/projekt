using System;
using System.Collections.Generic;

namespace MelodyFlowApi.Models;

public partial class Playlist
{
    public string Id { get; set; } = null!;

    public string? PlaylistName { get; set; }

    public string ImageUrl { get; set; } = null!;

    public virtual ICollection<Music> Musics { get; set; } = new List<Music>();

    public virtual ICollection<Aspnetuser> Users { get; set; } = new List<Aspnetuser>();
}
