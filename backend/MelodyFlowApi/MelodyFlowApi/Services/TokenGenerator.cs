using MelodyFlowApi.Models;
using MelodyFlowApi.Services.IAuthService;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MelodyFlowApi.Services
{
    public class TokenGenerator : ITokenGenerator
    {
        private readonly JwtOptions jwtOptions;

        public TokenGenerator(IOptions<JwtOptions> jwtOptions)
        {
            this.jwtOptions = jwtOptions.Value;
        }
        //Legenerál egy jwt tokent ami tartalmazza a felhasználó egyes adatait amivel hozzáfér több lekérdezéshez
        public string GenerateToken(ApplicationUser applicationUser, IEnumerable<string> role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(jwtOptions.Secret);

            var claimList = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, applicationUser.Id),
                new Claim(JwtRegisteredClaimNames.Name,applicationUser.Email.ToString()),
                new Claim(JwtRegisteredClaimNames.Name,applicationUser.UserName.ToString())
            };

            claimList.AddRange(role.Select(role => new Claim(ClaimTypes.Role, role)));

            var tokenDescription = new SecurityTokenDescriptor
            {
                Audience = jwtOptions.Audience,
                Issuer = jwtOptions.Issuer,
                Subject = new ClaimsIdentity(claimList),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescription);

            return tokenHandler.WriteToken(token);
        }
    }
}
