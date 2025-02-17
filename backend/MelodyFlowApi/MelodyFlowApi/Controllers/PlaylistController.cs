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
    }
}
