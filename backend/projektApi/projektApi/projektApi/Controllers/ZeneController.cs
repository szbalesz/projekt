using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projektApi.Models;

namespace projektApi.Controllers
{
    [Route("music")]
    [ApiController]
    public class ZeneController : ControllerBase
    {
        private readonly ProjektContext projektContext;

        public ZeneController(ProjektContext projektContext)
        {
            this.projektContext = projektContext;
        }

        [HttpGet("GetAllMusic")]
        public async Task<ActionResult<Zene>> Get()
        {
            return Ok(await projektContext.Zenes.Select(f => new
            {
                guid=f.Guid,
                eloado=f.Eloado,
                cim=f.Cim,
                kep=f.Kep,


            }).ToListAsync());
        }

        [HttpGet("GetMusicByName")]
        public async Task<ActionResult<Zene>> GetByName(string betu)
        {
            return Ok(await projektContext.Zenes.Where(f => (f.Cim.ToLower().Contains(betu.ToLower()) || f.Eloado.ToLower().Contains(betu.ToLower()))).Select(f => new
            {
                guid = f.Guid,
                eloado = f.Eloado,
                cim = f.Cim,
                kep = f.Kep,


            }).ToListAsync());
        }
    }
}
