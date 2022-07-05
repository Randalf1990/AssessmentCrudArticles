using AssessmentCrudArticles.Models;
using Microsoft.EntityFrameworkCore;

namespace AssessmentCrudArticles.Repositories
{
    public class AssessmentContext : DbContext
    {
        public AssessmentContext(DbContextOptions<AssessmentContext> options)
            : base(options)
        {
        }

        public DbSet<Article> Users { get; set; }
    }
}
