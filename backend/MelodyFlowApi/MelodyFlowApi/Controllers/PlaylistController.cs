using MelodyFlowApi.Models;
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

        [HttpGet("GetAllPlaylist")]
        public async Task<ActionResult<Playlist>> Get()
        {
            return Ok(await _context.Playlists.ToListAsync());
        }
    }
}
