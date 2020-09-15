using System.Collections.Generic;
using System.Threading.Tasks;
using MatingApp.API.Controllers.Models;

namespace MatingApp.API.Controllers.Data
{
    public interface IDatingRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();

         Task<IEnumerable<User>> GetUsers();

         Task<User> GetUser(int id);

    }
}