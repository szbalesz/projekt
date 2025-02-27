using MelodyFlowApi.Models;
using MelodyFlowApi.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Policy;

namespace MelodyFlowApi.Controllers
{
    [Route("api/")]
    [ApiController]
    public class MusicController : ControllerBase
    {
        private readonly MelodyflowdbContext _context;
        private readonly string _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "music");
        public MusicController(MelodyflowdbContext context)
        {
            _context = context;
        }
        //Kilistázzuk az összes zenét ami megtalálható az adatbázisban
        [HttpGet("GetAllMusic")]
        public async Task<ActionResult<Music>> Get()
        {
            return Ok(await _context.Musics.ToListAsync());
        }
        //Kilistázzuk a zenét cím/előadó/betű alapján akár többet is ha hasonló a cím vagy nem pontosan van beírva
        [HttpGet("GetMusicByName")]
        public async Task<ActionResult<Music>> GetByName(string betu)
        {
            return Ok(await _context.Musics.Where(f => (f.Title.ToLower().Contains(betu.ToLower()) || f.Artist.ToLower().Contains(betu.ToLower()))).ToListAsync());
        }
        //Fel tudunk tölteni zenét az uploadmusicdto segítségével
        [Authorize]
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
                    MusicUrl = fileUrl,
                    UploaderId = uploadMusicDto.UploaderId
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
        //Kilistázzuk a zenéket az alapján hogy ki töltötte fel
        [HttpGet("music/uploader/{id}")]
        public async Task<ActionResult<Music>> GetMusicByUploader(string id)
        {
            return Ok(await _context.Musics.Where(f=>f.UploaderId==id).ToListAsync());
        }
        //Kilistázzuk a zenéket az egyedi azonosítójuk alapján
        [HttpGet("music/{id}")]
        public async Task<ActionResult<Music>> GetMusicById(string id)
        {
            return Ok(await _context.Musics.Where(f => f.Id == id).ToListAsync());
        }
        //Zenét tudunk töröli szintén az egyedi azonosítója alapján
        [Authorize]
        [HttpDelete("music/{id}")]
        public ActionResult DeleteMusic(string id)
        {
            var data = _context.Musics.FirstOrDefault(x => x.Id == id);
            if (data != null)
            {
                var filePath = Path.Combine(_uploadPath, Path.GetFileName(data.MusicUrl));

                if (System.IO.File.Exists(filePath))
                {
                    try
                    {
                        System.IO.File.Delete(filePath);
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(500, $"Hiba történt a fájl törlésénél: {ex.Message}");
                    }
                }
                _context.Musics.Remove(data);
                _context.SaveChanges();
                return Ok();
            }
            return BadRequest("A keresett zene nem található.");
        }

        //Zene adatainak szerkesztése
        [Authorize]
        [HttpPut("music/{id}")]
        public async Task<ActionResult<Music>> EditMusic(string id, EditMusicDto editMusicDto)
        {

            var existingMusic = await _context.Musics.FirstOrDefaultAsync(x => x.Id == id);

            if (existingMusic != null)
            {
                existingMusic.Artist=editMusicDto.Artist;
                existingMusic.Title=editMusicDto.Title;
                existingMusic.ImageUrl=editMusicDto.ImageUrl;
                _context.Musics.Update(existingMusic);
                await _context.SaveChangesAsync();
                return StatusCode(200, existingMusic);
            }
            return StatusCode(404);
        }
    }
}
