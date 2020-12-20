using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MovieApi.adapters;
using MovieApi.adapters.interfaces;
using MovieApi.Models.AppSettings;
using MovieApi.services;
using MovieApi.services.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

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

            services.Configure<AppSettingsModel>(Configuration.GetSection("AppSettings"));
            services.Configure<FireBaseSettingsModel>(Configuration.GetSection("FirebaseSettings"));


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
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
