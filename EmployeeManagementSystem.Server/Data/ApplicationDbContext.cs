using Microsoft.EntityFrameworkCore;
using EmployeeManagementSystem.Server.Models;

namespace EmployeeManagementSystem.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

                modelBuilder.Entity<User>().HasData(
                    new User
                {
                    Id = 1,
                    Username = "admin",
                    Password = "admin123"
                }

                );
        }
    }
}
