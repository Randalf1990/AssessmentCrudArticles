using AssessmentCrudArticles.Models;
using Microsoft.EntityFrameworkCore;

namespace AssessmentCrudArticles.Context
{
    public class AssessmentContext : DbContext
    {
        public AssessmentContext(DbContextOptions<AssessmentContext> options)
            : base(options)
        {
        }

        public DbSet<Article> Articles { get; set; }
    }
}
