using System.ComponentModel.DataAnnotations;

namespace AssessmentCrudArticles.Models
{
    public class Article
    {
        public Guid Id { get; set; }

        [MaxLength(50)]
        public string Title { get; set; }

        [MaxLength(50)]
        public string Author { get; set; }

        public DateTime PublicationDate { get; set; }

        [MaxLength(1000)]
        public string Body { get; set; }
    }
}
