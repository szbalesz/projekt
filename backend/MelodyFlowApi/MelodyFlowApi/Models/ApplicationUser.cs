using Microsoft.AspNetCore.Identity;

namespace MelodyFlowApi.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? Fullname { get; set; }
        public DateTime BirthDate { get; set; }

        public string? ProfilePictureURL {  get; set; }
    }
}
