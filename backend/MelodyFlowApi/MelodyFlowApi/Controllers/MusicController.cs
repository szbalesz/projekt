using MelodyFlowApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Policy;

namespace MelodyFlowApi.Controllers
{
    [Route("api/music")]
    [ApiController]
    public class MusicController : ControllerBase
    {
        private readonly MelodyflowdbContext _context;

        public MusicController(MelodyflowdbContext context)
        {
            _context = context;
        }
        [HttpGet("GetAllMusic")]
        public async Task<ActionResult<Music>> Get()
        {
            return Ok(await _context.Musics.ToListAsync());
        }
        [HttpGet("GetMusicByName")]
        public async Task<ActionResult<Music>> GetByName(string betu)
        {
            return Ok(await _context.Musics.Where(f => (f.Title.ToLower().Contains(betu.ToLower()) || f.Artist.ToLower().Contains(betu.ToLower()))).ToListAsync());
        }
    }
}
