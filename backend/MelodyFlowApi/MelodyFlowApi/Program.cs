using MelodyFlowApi.Services.IAuthService;
using MelodyFlowApi.Services;
using MelodyFlowApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace MelodyFlowApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<AppDbContext>();
            builder.Services.AddDbContext<MelodyflowdbContext>();
            builder.Services.AddScoped<IAuth, AuthService>();
            builder.Services.AddScoped<ITokenGenerator, TokenGenerator>();
            builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("AuthSettings:JwtOptions"));

            builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<AppDbContext>()
               .AddDefaultTokenProviders();

            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                                      policy =>
                                      {
                                          policy.WithOrigins("http://localhost:3000")
                                         .AllowAnyHeader()
                                         .AllowAnyMethod()
                                         .AllowCredentials();
                                      });
            });
            var settingsSection = builder.Configuration.GetSection("AuthSettings:JwtOptions");

            var secret = settingsSection.GetValue<string>("Secret");
            var issuer = settingsSection.GetValue<string>("Issuer");
            var auidience = settingsSection.GetValue<string>("Audience");

            var key = Encoding.ASCII.GetBytes(secret);

            builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = issuer,
                    ValidAudience = auidience,
                    ValidateAudience = true
                };
            });
            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.UseCors("_myAllowSpecificOrigins");

            app.MapControllers();

            app.Run();
        }
    }
}
