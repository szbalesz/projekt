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
        public async Task<ActionResult<Playlistmusic>> AddMusicToPlaylist(Playlistmusic playlistmusic)
        {
            _context.Playlistmusics.Add(playlistmusic);
            await _context.SaveChangesAsync();
            return Ok(playlistmusic);
        }
        [HttpGet("GetMusicFromPlaylist")]
        public async Task<ActionResult<Playlistmusic>> GetMusicFromPlaylist(string id)
        {
            return Ok(await _context.Playlistmusics.Where(f=>f.PlaylistId==id).Select(f=>f.MusicId).ToListAsync());
        }
    }
}
