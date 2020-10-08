using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ProAgil.Domain.Identity;

namespace ProAgil.API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class UserController:ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserController( IConfiguration config,
                             UserManager<User> userManager,
                             SignInManager<User> signInManager,
                             ,IMapper mapper  )
        {
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser()
        {
            return Ok(new User())   ;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserDto user)
        {
            
            return Ok(new User())   ;
        }
        
    }
}