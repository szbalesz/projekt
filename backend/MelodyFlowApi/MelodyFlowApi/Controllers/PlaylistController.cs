using MelodyFlowApi.Models;
using MelodyFlowApi.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MelodyFlowApi.Controllers
{
    [Route("api/")]
    [ApiController]
    public class PlaylistController : ControllerBase
    {
        private readonly MelodyflowdbContext _context;

        public PlaylistController(MelodyflowdbContext context)
        {
            _context = context;
        }
        
        [HttpGet("GetAllPlaylist")]
        public async Task<ActionResult<Playlist>> Get()
        {
            return Ok(await _context.Playlists.ToListAsync());
        }
        [Authorize]
        [HttpPost("CreatePlaylist")]
        public async Task<ActionResult<Playlist>> CreatePlaylist(CreatePlaylistDto createPlaylistDto)
        {
            if (createPlaylistDto != null)
            {
                Playlist NewPlaylist = new Playlist
                {
                    Id=Guid.NewGuid().ToString(),
                    PlaylistName=createPlaylistDto.playlistName,
                    ImageUrl=createPlaylistDto.imageUrl,
                    CreatorId=createPlaylistDto.CreatorId,
                    
                };
                _context.Playlists.Add(NewPlaylist);
                await _context.SaveChangesAsync();
                return Ok(NewPlaylist);
            }
            return BadRequest();
        }
        [Authorize]
        [HttpDelete("playlist/{id}")]
        public ActionResult DeletePlaylist(string id)
        {
            var data = _context.Playlists.FirstOrDefault(x => x.Id == id);
            if (data != null)
            {
                _context.Playlists.Remove(data);
                _context.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }
        [HttpGet("/playlist/{id}")]
        public async Task<ActionResult<object>> GetPlaylistById(string id)
        {
            var Playlist = _context.Playlists.Where(f => f.Id == id);
            List<string> MusicIds = await _context.Playlistmusics.Where(f => f.PlaylistId == id).Select(f => f.MusicId).ToListAsync();
            List<Music> Musics = new List<Music>();
            foreach (var mid in MusicIds)
            {
                Musics.Add(await _context.Musics.FirstOrDefaultAsync(m => m.Id == mid));
            }
            
            return Ok(new { Playlist = Playlist, Musics = Musics });
        }
    }
}
