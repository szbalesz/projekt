using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projektApi.Models;

namespace projektApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LejatszasilistaController : ControllerBase
    {
        private readonly ProjektContext projektContext;

        public LejatszasilistaController(ProjektContext projektContext)
        {
            this.projektContext = projektContext;
        }
        [HttpGet]
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
