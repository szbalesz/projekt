using System;
using System.Collections.Generic;

namespace MelodyFlowApi.Models;

public partial class PlaylistMusic
{
    public string PlaylistId { get; set; } = null!;

    public string MusicId { get; set; } = null!;
}
