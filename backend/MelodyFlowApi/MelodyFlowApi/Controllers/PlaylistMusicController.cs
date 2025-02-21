using MelodyFlowApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MelodyFlowApi.Controllers
{
    [Route("api/")]
    [ApiController]
    public class PlaylistMusicController : ControllerBase
    {
        private readonly MelodyflowdbContext _context;

        public PlaylistMusicController(MelodyflowdbContext context)
        {
            _context = context;
        }
        //Zenét tudunk hozzá adni egy adott playlisthez
        [Authorize]
        [HttpPost("AddMusicToPlaylist")]
        public async Task<ActionResult<Playlistmusic>> AddMusicToPlaylist(Playlistmusic playlistmusic)
        {
            _context.Playlistmusics.Add(playlistmusic);
            await _context.SaveChangesAsync();
            return Ok(playlistmusic);
        }
        //Zenét tudunk törölni egy adott playlistből
        [Authorize]
        [HttpDelete("DeleteMusicFromPlaylist")]
        public ActionResult DeleteMusicFromPlaylist(Playlistmusic playlistmusic)
        {
            var data = _context.Playlistmusics.FirstOrDefault(x => x == playlistmusic);
            if (data != null)
            {
                _context.Playlistmusics.Remove(data);
                _context.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }
    }
}
