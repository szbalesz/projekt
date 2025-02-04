using MelodyFlowApi.Models;

namespace MelodyFlowApi.Services.IAuthService
{
    public interface ITokenGenerator
    {
        string GenerateToken(ApplicationUser applicationUser, IEnumerable<string> role);
    }
}
