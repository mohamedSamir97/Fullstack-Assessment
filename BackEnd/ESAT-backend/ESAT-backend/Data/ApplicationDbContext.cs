using ESAT_backend.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace ESAT_backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<CUSTOMER_HDR> CUSTOMER_HDR { get; set; }
        public DbSet<CUSTOMER_DTL> CUSTOMER_DTL { get; set; }
    }
}
