using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using MatingApp.API.Controllers.Data;
using MatingApp.API.Controllers.Models;
using MatingApp.API.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace MatingApp.API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {

            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest("Username Already Exists");

            var usertoCreate = new User
            {
                Username = userForRegisterDto.Username

            };
            var cretedUser = await _repo.Register(usertoCreate, userForRegisterDto.Password);

            return StatusCode(201);


        }
        [HttpPost("login")]

        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            
            var userFromrepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);
            if (userFromrepo == null)
                return Unauthorized();
                //required for webtoken
                //

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromrepo.ID.ToString()),
                new Claim(ClaimTypes.Name, userFromrepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds

            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}