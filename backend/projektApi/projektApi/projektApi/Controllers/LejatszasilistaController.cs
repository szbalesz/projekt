using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projektApi.Models;

namespace projektApi.Controllers
{
    [Route("playlist")]
    [ApiController]
    public class LejatszasilistaController : ControllerBase
    {
        private readonly ProjektContext projektContext;

        public LejatszasilistaController(ProjektContext projektContext)
        {
            this.projektContext = projektContext;
        }
        [HttpGet("GetAllPlaylist")]
        public async Task<ActionResult<LejatszasiLista>> Get()
        {
            return Ok(await projektContext.LejátszasiLista.Select(ll => new
                {
                    listaNev = ll.ListaNev,
                    zenes = ll.Zenes,
                }
            ).ToListAsync());
        }
    }
}
