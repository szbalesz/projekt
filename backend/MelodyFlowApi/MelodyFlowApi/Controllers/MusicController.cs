using MelodyFlowApi.Models;
using MelodyFlowApi.Models.Dtos;
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
        private readonly string _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "music");
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
        [HttpPost("UploadMusic")]
        public async Task<IActionResult> UploadFile([FromForm] UploadMusicDto uploadMusicDto)
        {
            if (uploadMusicDto.MusicFile == null || uploadMusicDto.MusicFile.Length == 0)
                return BadRequest("Nincs fájl feltöltve.");

            try
            {
                if (!Directory.Exists(_uploadPath))
                    Directory.CreateDirectory(_uploadPath);
                var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(uploadMusicDto.MusicFile.FileName)}";
                var filePath = Path.Combine(_uploadPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await uploadMusicDto.MusicFile.CopyToAsync(stream);
                }

                var fileUrl = $"/music/{fileName}";

                var newMusic = new Music
                {
                    Id = Guid.NewGuid().ToString(),
                    Artist = uploadMusicDto.Artist,
                    Title = uploadMusicDto.Title,
                    ImageUrl = uploadMusicDto.ImageUrl,
                    MusicUrl = fileUrl
                };

                await _context.Musics.AddAsync(newMusic);
                await _context.SaveChangesAsync();

                return StatusCode(201, newMusic);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Hiba történt: {ex.Message}");
            }

        }
        [HttpGet("GetMusicByUploader")]
        public async Task<ActionResult<Music>> GetMusicByUploader(string id)
        {
            return Ok(await _context.Musics.Where(f=>f.UploaderId==id).ToListAsync());
        }
        [HttpGet("GetMusicById")]
        public async Task<ActionResult<Music>> GetMusicById(string id)
        {
            return Ok(await _context.Musics.Where(f => f.Id == id).ToListAsync());
        }
    }
}
