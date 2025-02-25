using MelodyFlowApi.Models;
using MelodyFlowApi.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
        //Kilistázzuk az összes playlistet
        [HttpGet("GetAllPlaylist")]
        public async Task<ActionResult<Playlist>> Get()
        {
            return Ok(await _context.Playlists.ToListAsync());
        }
        //Playlistet tudunk létrehozni a dto segítségével
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
        //Itt playlistet tudunk törli id alapján
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
        //Playlistet tudunk lekérni id alapján
        [HttpGet("playlist/{id}")]
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
        [HttpGet("GetPlaylistByName")]
        public async Task<ActionResult<Playlist>> GetByName(string betu)
        {
            return Ok(await _context.Playlists
    .Where(f => f.PlaylistName.ToLower().Contains(betu.ToLower()) ||
                _context.Aspnetusers.Any(x => x.UserName.ToLower().Contains(betu.ToLower())))
    .ToListAsync());
        }
        [Authorize]
        [HttpPut("playlist/{id}")]
        public async Task<ActionResult<Playlist>> EditPlaylist(string id,EditPlaylistDto editPlaylistDto)
        {

            var existingPlaylist = await _context.Playlists.FirstOrDefaultAsync(x => x.Id ==id);

            if (existingPlaylist != null)
            {
                existingPlaylist.PlaylistName = editPlaylistDto.PlaylistName;
                existingPlaylist.ImageUrl = editPlaylistDto.ImageUrl;
                _context.Playlists.Update(existingPlaylist);
                await _context.SaveChangesAsync();
                return StatusCode(200, existingPlaylist);
            }
            return StatusCode(404);
        }
    }
}
