using MelodyFlowApi.Models.Dtos;
using MelodyFlowApi.Models;
using MelodyFlowApi.Services.IAuthService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MelodyFlowApi.Services
{
    public class AuthService : IAuth
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        private readonly ITokenGenerator tokenGenerator;

        public AuthService(AppDbContext dbContext, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ITokenGenerator tokenGenerator)
        {
            _dbContext = dbContext;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.tokenGenerator = tokenGenerator;
        }
        //Szerepkör hozzárendelés
        public async Task<object> AssignRole(string email, string roleName)
        {
            var user = await _dbContext.applicationUsers.FirstOrDefaultAsync(user => user.NormalizedEmail == email.ToUpper());

            if (user != null)
            {
                if (!roleManager.RoleExistsAsync(roleName).GetAwaiter().GetResult())
                {
                    roleManager.CreateAsync(new IdentityRole(roleName)).GetAwaiter().GetResult();
                }

                await userManager.AddToRoleAsync(user, roleName);

                return new { result = user, message = "Sikeres hozzárendelés." };
            }

            return new { result = "", message = "Sikertelen hozzárendelés." };
        }
        //Bejelntkezés
        public async Task<object> Login(LoginIUserDto loginUserDto)
        {
            var user = await _dbContext.applicationUsers.FirstOrDefaultAsync(user => user.NormalizedUserName == loginUserDto.UserName.ToUpper());

            bool isValid = await userManager.CheckPasswordAsync(user, loginUserDto.Password);

            if (isValid)
            {
                var roles = await userManager.GetRolesAsync(user);
                var jwtToken = tokenGenerator.GenerateToken(user, roles);

                return new { id = user.Id, token = jwtToken };
            }

            return new { result = "", token = "" };

        }
        //Regisztráció
        public async Task<object> Register(CreateUserDto createUserDto)
        {
            var user = new ApplicationUser
            {
                UserName = createUserDto.UserName,
                Email = createUserDto.Email,
                BirthDate = createUserDto.BirthDate,
                PhoneNumber = createUserDto.PhoneNumber
            };

            var res = await userManager.CreateAsync(user, createUserDto.Password);

            if (res.Succeeded)
            {
                var existingUser = await _dbContext.applicationUsers.FirstOrDefaultAsync(user => user.UserName == createUserDto.UserName);

                return new { result = new { user.UserName, user.Email }, message = "Sikeres regisztráció." };
            }

            return new { result = "", message = res.Errors.FirstOrDefault().Description };
        }
    }
}
