using MelodyFlowApi.Models;
using MelodyFlowApi.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
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
        //Lekérünk egy profilt id alapján
        [HttpGet("{Id}")]
        public async Task<ActionResult<Aspnetuser>> GetProfile(string Id)
        {
            return Ok(await _context.Aspnetusers.Where(f => Id == f.Id).Select(p => new
            {
                Fullname = p.Fullname,
                Birthdate = p.BirthDate,
                ProfilePictureURL = p.ProfilePictureUrl,
                Username = p.UserName,
                Email = p.Email
            }).ToListAsync());
        }
        //Porfilt tudunk törölni id alapján
        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult DeleteUser(string id)
        {
            var data = _context.Aspnetusers.FirstOrDefault(x => x.Id == id);
            if (data != null)
            {
                _context.Aspnetusers.Remove(data);
                _context.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }
        //Egy meglévő felhasználó itt tudja módosítani az email címét
        [HttpPut("ChangeEmail")]
        public async Task<ActionResult<Aspnetuser>> ChangeEmail(UserEmailPutDto userEmailPutDto)
        {

            var existingUser = await _context.Aspnetusers.FirstOrDefaultAsync(x => x.Id == userEmailPutDto.Id);

            if (existingUser != null)
            {
                existingUser.Email = userEmailPutDto.Email;

                _context.Aspnetusers.Update(existingUser);
                await _context.SaveChangesAsync();
                return StatusCode(200, existingUser);
            }
            return StatusCode(404);
        }
        //Itt a felhasználónevét tudja módosítani
        [HttpPut("ChangeUserName")]
        public async Task<ActionResult<Aspnetuser>> ChangeUserName(UserNamePutDto userNamePutDto)
        {

            var existingUser = await _context.Aspnetusers.FirstOrDefaultAsync(x => x.Id == userNamePutDto.Id);

            if (existingUser != null)
            {
                existingUser.UserName = userNamePutDto.UserName;

                _context.Aspnetusers.Update(existingUser);
                await _context.SaveChangesAsync();
                return StatusCode(200, existingUser);
            }
            return StatusCode(404);
        }
        //Itt pedig a profilképét tudja módosítani
        [HttpPut("ChangeProfilePicture")]
        public async Task<ActionResult<Aspnetuser>> ChangeProfilePicture(UserPicturePutDto userPicturePutDto)
        {

            var existingUser = await _context.Aspnetusers.FirstOrDefaultAsync(x=>x.Id==userPicturePutDto.Id);

            if (existingUser != null)
            {
                existingUser.ProfilePictureUrl = userPicturePutDto.ProfilePictureURL;

                _context.Aspnetusers.Update(existingUser);
                await _context.SaveChangesAsync();
                return StatusCode(200, existingUser);
            }
            return StatusCode(404);
        }
    }
}
