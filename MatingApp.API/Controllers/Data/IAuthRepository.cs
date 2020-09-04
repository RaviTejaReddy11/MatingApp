using System.Threading.Tasks;
using MatingApp.API.Controllers.Models;

namespace MatingApp.API.Controllers.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user,string password);
         Task<User> Login(string username, string password);
         Task<bool> UserExists(string username);
    }
}