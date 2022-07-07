using AssessmentCrudArticles.Models;
using AssessmentCrudArticles.Repositories;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;

namespace AssessmentCrudArticles
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "http://localhost:44426/";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AssessmentContext>(opt =>
            {
                opt.UseInMemoryDatabase("ArticlesDB");
            });

            services.AddControllers();
            services.AddHttpClient();
            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.SetIsOriginAllowed(isOriginAllowed: _ => true).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
                });
            });

            //services.AddCors(options =>
            //{
            //    options.AddDefaultPolicy(
            //        builder =>
            //        {
            //            builder.AllowAnyOrigin()
            //                                .AllowAnyHeader()
            //                                .AllowAnyMethod();
            //        });
            //});
            //services.AddScoped<IProductsDomainService, ProductsDomainService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, AssessmentContext? context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //var context = app.ApplicationServices.GetService<AssessmentContext>();
            AddTestData(context);

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor |
                   ForwardedHeaders.XForwardedProto
            });

            app.UseCors(MyAllowSpecificOrigins);

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private static void AddTestData(AssessmentContext context)
        {
            var listTestArticles = new List<Article>();

            for (int i = 1; i < 5; i++)
            {
                var article = new Article
                {
                    Id = new Guid(),
                    Title = $"Test Article {i}",
                    Author = $"Test Author {i}",
                    PublicationDate = DateTime.Now,
                    Body = $"Article body {i}"
                };
                listTestArticles.Add(article);
            }
            
            context.Articles.AddRange(listTestArticles);

            context.SaveChanges();
        }
    }
}
