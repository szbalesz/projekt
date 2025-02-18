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
        [Authorize]
        [HttpPost("AddMusicToPlaylist")]
        public async Task<ActionResult<Playlistmusic>> AddMusicToPlaylist(Playlistmusic playlistmusic)
        {
            _context.Playlistmusics.Add(playlistmusic);
            await _context.SaveChangesAsync();
            return Ok(playlistmusic);
        }
        [HttpGet("GetMusicFromPlaylist")]
        public async Task<ActionResult<object>> GetMusicFromPlaylist(string id)
        {
            List<string> MusicIds = await _context.Playlistmusics.Where(f => f.PlaylistId == id).Select(f => f.MusicId).ToListAsync();
            List<Music> Musics = new List<Music>();
            foreach (var mid in MusicIds)
            {
                Musics.Add(await _context.Musics.FirstOrDefaultAsync(m => m.Id == mid));
            }
            return Ok(Musics);
        }
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
