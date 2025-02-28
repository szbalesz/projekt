using EmailApiKedd.Services.IEmail;
using MelodyFlowApi.Models;
using MelodyFlowApi.Models.Dtos;
using MelodyFlowApi.Services.IAuthService;
using Microsoft.AspNetCore.Mvc;

namespace MelodyFlowApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuth auth;
        private readonly MelodyflowdbContext _context;

        public AuthController(MelodyflowdbContext context)
        {
            _context = context;
        }
        public AuthController(IAuth auth)
        {
            this.auth = auth;
        }
        //Regisztráció a createuserdto segítségével(azokat az használja amik a dtoban vannak)
        [HttpPost("register")]
        public async Task<ActionResult> AddNewUser(CreateUserDto createUserDto)
        {
            var res = await auth.Register(createUserDto);

            if (res != null)
            {
                return StatusCode(201, res);
            }

            return BadRequest(res);

        }
        //Bejelentkezés szintén dto segítségével azokat az adatokat szükséges megadni a bejelntkezéshez amik a dto-ban szerepelnek
        [HttpPost("login")]
        public async Task<ActionResult> LoginUser(LoginIUserDto loginIUserDto)
        {
            var res = await auth.Login(loginIUserDto);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }
        [HttpPost("AssignRole")]
        public async Task<ActionResult> AssignRole(AssignUserDto assignUserDto)
        {
            var res = await auth.AssignRole(assignUserDto.Id, assignUserDto.RoleName);

            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }
        [HttpGet("admin/{id}")]
        public async Task<ActionResult<bool>> IsAdmin(string id)
        {
            var userRole = await _context.AspNetUserRoles
                .Where(ur => ur.UserId == id)
                .Join(_context.AspNetRoles,
                      ur => ur.RoleId,
                      r => r.Id,
                      (ur, r) => r.Name)
                .FirstOrDefaultAsync();

            if (userRole == "Admin")
            {
                return Ok(true);
            }
            return Ok(false);
        }
    }
}
