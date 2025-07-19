using FMMIS.DTos.Account;
using FMMIS.Models;
using FMMIS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FMMIS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly JWTService _jwtService;
        private readonly SignInManager<User> _signInManager;
            private readonly UserManager<User> _userManager;
        public AccountController(JWTService jwtService, SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _jwtService = jwtService;
            _signInManager = signInManager;
            _userManager = userManager;
        }
        [Authorize]
        [HttpGet("refresh-user-token")]
        public async Task<ActionResult<UserDto>> RefreshUserToken()
        {
            var user = await _userManager.FindByNameAsync(User.FindFirst(ClaimTypes.Email)?.Value);
            return CreateApplicationUser(user);
        }

        [HttpPost("logIn")]
        public async Task<ActionResult<UserDto>> LogIn(LogInDto model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null) return Unauthorized("Invalid User name or password.");
            if (user.EmailConfirmed == false) return Unauthorized("Please confirm your email first.");
            
            var result = await _signInManager.CheckPasswordSignInAsync(user,model.Password, false);
            if (!result.Succeeded) return Unauthorized("Invalid UserName Or Password");
            return CreateApplicationUser(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTo model)
        {
            if(await CheckEmailExists(model.Email))
            {
                return BadRequest($"an existing account is usong {model.Email}, email address. Pleaase try an other email.");
            }
            var userToAdd = new User
            {
                FirstName = model.FirstName.ToLower(),
                LastName = model.LastName.ToLower(),
                UserName = model.Email.ToLower(),
                Email = model.Email.ToLower(),
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(userToAdd, model.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);
            {
                return Ok("User has been registered successfuly!");
            }
        }

        #region private helper method       
        private UserDto CreateApplicationUser(User user)
        {
            return new UserDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                JWT = _jwtService.CreateJWT(user),
            };
        }

        private async Task<bool> CheckEmailExists(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email);
        }
        #endregion
    }
}
