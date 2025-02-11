using MelodyFlowApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MelodyFlowApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistMusicController : ControllerBase
    {
        private readonly MelodyflowdbContext _context;

        public PlaylistMusicController(MelodyflowdbContext context)
        {
            _context = context;
        }

        [HttpPost("AddMusicToPlaylist")]
        public async Task<ActionResult<PlaylistMusic>> AddMusicToPlaylist(PlaylistMusic playlistmusic)
        {
            _context.PlaylistsMusic.Add(playlistmusic);
            await _context.SaveChangesAsync();
            return Ok(playlistmusic);
        }
    }
}
