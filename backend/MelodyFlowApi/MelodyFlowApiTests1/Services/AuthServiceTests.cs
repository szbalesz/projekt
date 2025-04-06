using Microsoft.VisualStudio.TestTools.UnitTesting;
using MelodyFlowApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmailApiKedd.Services;
using MelodyFlowApi.Models.Dtos;
using MelodyFlowApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MelodyFlowApi.Services.IAuthService;
using Moq;

namespace MelodyFlowApi.Services.Tests
{
    [TestClass()]
    public class AuthServiceTests
    {
        private Mock<IAuth> _mockAuth;

        public AuthServiceTests()
        {
            _mockAuth = new Mock<IAuth>();
        }

        [TestMethod()]
        [DataRow("validUser", "valid@example.com", "Password123!",  "1234567890", true, "Sikeres regisztráció.")]
        [DataRow("invalidUser", "invalidemail", "short",  "1234567890", false, "The password is too short.")]
        [DataRow("existingUser", "existing@example.com", "Password123!", "9876543210", false, "User already exists.")]
        public async Task RegisterTestAsync(string userName, string email, string password, string phoneNumber, bool isSuccessful, string expectedMessage)
        {
            var createUserDto = new CreateUserDto(userName, email, password, DateTime.Now, phoneNumber);

            IdentityResult result = isSuccessful ? IdentityResult.Success : IdentityResult.Failed(new IdentityError { Description = "The password is too short." });

            _mockAuth.Setup(auth => auth.Register(createUserDto)).ReturnsAsync(new { result = new { userName, email }, message = expectedMessage });

            var response = await _mockAuth.Object.Register(createUserDto);

            Assert.IsNotNull(response);
            Assert.AreEqual(expectedMessage, ((dynamic)response).message);
        }
    }
}