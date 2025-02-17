using MelodyFlowApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MelodyFlowApi.Controllers
{
    [Route("api/")]
    [ApiController]
    public class UserPlaylistController : ControllerBase
    {
        private readonly MelodyflowdbContext _context;

        public UserPlaylistController(MelodyflowdbContext context)
        {
            _context = context;
        }
        [HttpGet("GetPlaylistByUser")]
        public async Task<ActionResult<Playlist>> GetPlaylistByUser(string id)
        {
            List<string> PlaylistIds = await _context.Userplaylists.Where(f => f.UserId == id).Select(f => f.PlaylistId).ToListAsync();
            List<Playlist> Playlists = new List<Playlist>();
            foreach (var plid in PlaylistIds)
            {
                Playlists.Add(await _context.Playlists.FirstOrDefaultAsync(pl => pl.Id == plid));
            }
            return Ok(Playlists);
        }
        [HttpPost("AddPlaylistToUser")]
        public async Task<ActionResult<Userplaylist>> AddPlaylistToUser(Userplaylist userplaylist)
        {
            _context.Userplaylists.Add(userplaylist);
            await _context.SaveChangesAsync();
            return Ok(userplaylist);
        }
    } 
}
