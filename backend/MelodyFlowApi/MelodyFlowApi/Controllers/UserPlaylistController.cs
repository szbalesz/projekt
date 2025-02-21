using MelodyFlowApi.Models;
using Microsoft.AspNetCore.Authorization;
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
        //Lekérjük egy ember playlistjeit az id-ja alapján
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
        //Itt hozzáadunk egy playlistet egy adott felhasználóhoz
        [Authorize]
        [HttpPost("AddPlaylistToUser")]
        public async Task<ActionResult<Userplaylist>> AddPlaylistToUser(Userplaylist userplaylist)
        {
            _context.Userplaylists.Add(userplaylist);
            await _context.SaveChangesAsync();
            return Ok(userplaylist);
        }
        //Kitöröljük a felhasználót a playlistből mert egy lejátszási listát akár több ember is láthat/használhat így a felhasználó akit töröltünk belőle többé nem ofgja tudni megtenni ezeket
        [Authorize]
        [HttpDelete("DeleteUserFromPlaylist")]
        public ActionResult DeleteUserFromPlaylist(Userplaylist userplaylist)
        {
            var data = _context.Userplaylists.FirstOrDefault(x => x == userplaylist);
            if (data != null)
            {
                _context.Userplaylists.Remove(data);
                _context.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }
    } 
}
