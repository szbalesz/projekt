using MelodyFlowApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MelodyFlowApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPlaylistController : ControllerBase
    {
        private readonly MelodyflowdbContext _context;

        public UserPlaylistController(MelodyflowdbContext context)
        {
            _context = context;
        }
        [HttpGet("GetPlaylistByUser")]
          public async Task<ActionResult<Userplaylist>> GetPlaylistByUser(string id)
          {
              return Ok(await _context.Userplaylists.Where(f=>f.UserId==id).ToListAsync());
          }
    } 
}
