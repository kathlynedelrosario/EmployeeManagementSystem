using Microsoft.EntityFrameworkCore;
namespace EmployeeManagementSystem.Server.Models

{
    public class Employee
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Position { get; set; } = string.Empty;

        public string Department { get; set; } = string.Empty;

        [Precision(18, 2)]
        public decimal Salary { get; set; }

        public DateTime DateHired { get; set; }

        public bool IsArchived { get; set; } = false;
    }
}