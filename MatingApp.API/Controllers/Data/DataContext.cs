using MatingApp.API.Controllers.Models;
using Microsoft.EntityFrameworkCore;

namespace MatingApp.API.Controllers.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options){}
        
        public  DbSet<Value> Values { get; set; }

        public DbSet<User> User { get; set; }
        public DbSet<Photo> Photos{get; set;}
        
    }
}