using MelodyFlowApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MelodyFlowApi.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MelodyflowdbContext _context;

        public UserController(MelodyflowdbContext context)
        {
            _context = context;
        }
        [HttpGet("GetProfile")]
        public async Task<ActionResult<Aspnetuser>> GetProfile(string Id)
        {
            return Ok(await _context.Aspnetusers.Where(f=> Id == f.Id).Select(p => new
            {
                Fullname=p.Fullname,
                Birthdate=p.BirthDate,
                ProfilePictureURL=p.ProfilePictureUrl,
                Username=p.UserName,
                Email=p.Email
            }).ToListAsync());
        }

    }
}
