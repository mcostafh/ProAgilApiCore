using ProAgil.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ProAgil.Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace ProAgil.Repository
{
    public class ProAgilContext :  IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int> >
    {
        public ProAgilContext( DbContextOptions<ProAgilContext> options ) : base(options) {}
        public DbSet<Evento> Eventos { get;set;}
        public DbSet<Lote> Lotes { get;set;}
        public DbSet<Palestrante> Palestrantes { get;set;}
        public DbSet<PalestranteEvento> PalestrantesEventos { get;set;}
        public DbSet<RedeSocial> RedesSociais { get;set;}
        
        protected override void OnModelCreating(ModelBuilder ModelBuilder){

            base.OnModelCreating( ModelBuilder);

            // Relacionamento N para N
            ModelBuilder.Entity<UserRole>( userRole => {
                userRole.HasKey( ur => new{ur.UserId, ur.RoleId});

                userRole.HasOne( ur => ur.Role)
                .WithMany( r => r.UserRoles)
                .HasForeignKey( ur => ur.RoleId)
                .IsRequired();

                userRole.HasOne( ur => ur.User)
                .WithMany( r => r.UserRoles)
                .HasForeignKey( ur => ur.UserId)
                .IsRequired();



            });

            ModelBuilder.Entity<PalestranteEvento>() 
            .HasKey( PE => new { PE.EventoId , PE.PalestranteId} );

        }


        
        
    }
}