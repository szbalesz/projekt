using System;
using System.Threading.Tasks;
using MelodyFlowApi.Models;
using Microsoft.AspNetCore.Identity;

public class RoleService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public RoleService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }
    public async Task<bool> AddRoleAsync(string userId, string roleName)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return false;
        }

        // Ha az szerepkör nem létezik, hozzuk létre
        if (!await _roleManager.RoleExistsAsync(roleName))
        {
            return false;
        }

        // Töröljük a szerepkört a felhasználóhoz
        var result = await _userManager.AddToRoleAsync(user, roleName);
        return result.Succeeded;
    }
    public async Task<bool> RemoveRoleAsync(string userId, string roleName)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            Console.WriteLine("Felhasználó nem található.");
            return false;
        }

        // Ha az szerepkör nem létezik, hozzuk létre
        if (!await _roleManager.RoleExistsAsync(roleName))
        {
            await _roleManager.DeleteAsync(new IdentityRole(roleName));
        }

        // Hozzáadjuk a szerepkört a felhasználóhoz
        var result = await _userManager.RemoveFromRoleAsync(user, roleName);
        return result.Succeeded;
    }
}
