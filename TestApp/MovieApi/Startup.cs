using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MovieApi.adapters;
using MovieApi.adapters.interfaces;
using MovieApi.Models.AppSettings;
using MovieApi.services;
using MovieApi.services.interfaces;
using System;
using System.Net.Http.Headers;

namespace MovieApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddSession(options => {
                options.IdleTimeout = TimeSpan.FromMinutes(30);
            });

            services.Configure<AppSettingsModel>(Configuration.GetSection("AppSettings"));
            services.Configure<FireBaseSettingsModel>(Configuration.GetSection("FirebaseSettings"));
            services.Configure<TheMoviedbSettingsModel>(Configuration.GetSection("TheMoviedbSettings"));


            services.AddHttpClient<IUserService, UserService>(c =>
            {
                c.BaseAddress = new Uri(Configuration.GetSection("AppConfiguration:DefaultCredentials:DET:dataEnvironment").Value);
                c.Timeout = TimeSpan.FromMilliseconds(60000);
                c.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            });

            services.AddHttpClient<IMovieService, MovieService>(c =>
            {
                c.BaseAddress = new Uri(Configuration.GetSection("AppConfiguration:DefaultCredentials:DAT:providerEnvironment").Value);
                c.Timeout = TimeSpan.FromMilliseconds(60000);
                c.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            });

            //Services
            //services.AddTransient<IUserService, UserService>();
            //services.AddTransient<IMovieService, MovieService>();
            //Adapters
            services.AddTransient<IUserAdapter, UserAdapter>();
            services.AddTransient<IMovieAdapter, MovieAdapter>();


            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                .SetIsOriginAllowed(origin => true) // allow any origin
                .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                );
            });
            services.AddControllersWithViews();
            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
            //app.UseSwaggerUI(c =>
            //{
            //    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            //});
            app.UseDeveloperExceptionPage();
            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();
            app.UseSession();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
