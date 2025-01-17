using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projektApi.Models;

namespace projektApi.Controllers
{
    [Route("user")]
    [ApiController]
    public class FelhasznaloController : ControllerBase
    {
        private readonly ProjektContext projektContext;

        public FelhasznaloController(ProjektContext projektContext)
        {
            this.projektContext = projektContext;
        }

        [HttpGet("GetAllUser")]
        public async Task<ActionResult<Felhasznalo>> Get()
        {
            return Ok(await projektContext.Felhasznalos.Select(f => new
            {
                felhasznalonev = f.Felhasznalonev,
                profilkep = f.Profilkep,
                           
            }).ToListAsync());
        }



    }
}
