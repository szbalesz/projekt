using Microsoft.AspNetCore.Mvc;

namespace MelodyFlowApi.Models.Dtos
{
    public record CreateUserDto(string UserName, string Email, string Password, DateTime BirthDate, string PhoneNumber);

    public record LoginIUserDto(string UserName, string Password);

    public record AssignUserDto(string Email, string RoleName);
    public record UserEmailPutDto(string Email);
    public record UserNamePutDto(string UserName);
    public record UserPicturePutDto(string ProfilePictureURL);

    public record UploadMusicDto
    {
        [FromForm]
        public string Artist { get; set; }

        [FromForm]
        public string Title { get; set; }

        [FromForm]
        public string ImageUrl { get; set; }

        [FromForm]
        public IFormFile MusicFile { get; set; }
        [FromForm]
        public string UploaderId { get; set; }
    }
    public record CreatePlaylistDto(string playlistName,string imageUrl,string CreatorId);
}
