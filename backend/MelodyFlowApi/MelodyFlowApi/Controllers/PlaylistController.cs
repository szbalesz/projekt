using MelodyFlowApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MelodyFlowApi.Controllers
{
    [Route("api/playlist")]
    [ApiController]
    public class PlaylistController : ControllerBase
    {
        private readonly MelodyflowdbContext _context;

        public PlaylistController(MelodyflowdbContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpGet("GetAllPlaylist")]
        public async Task<ActionResult<Playlist>> Get()
        {
            return Ok(await _context.Playlists.Select(p => new
            {
                Id = p.Id,
                PlaylistName = p.PlaylistName,
                ImageUrl = p.ImageUrl,
                Musics = p.Musics.Select(m => new
                {
                    Id = m.Id,
                    Title = m.Title,
                    Artist = m.Artist,
                    ImageUrl = m.ImageUrl,
                    MusicUrl = m.MusicUrl
                }).ToList()
            }).ToListAsync());
        }
    }
}
