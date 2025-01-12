using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace projektApi.Models;

public partial class ProjektContext : DbContext
{
    public ProjektContext()
    {
    }

    public ProjektContext(DbContextOptions<ProjektContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Felhasznalo> Felhasznalos { get; set; }

    public virtual DbSet<Lista> Lista { get; set; }

    public virtual DbSet<Tartalom> Tartaloms { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Felhasznalo>(entity =>
        {
            entity.HasKey(e => e.Guid).HasName("PRIMARY");

            entity.ToTable("felhasznalo");

            entity.HasIndex(e => e.Lejatszasilistak, "Lejatszasilistak");

            entity.Property(e => e.Guid)
                .HasMaxLength(36)
                .HasColumnName("GUID");
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Felhasznalonev).HasMaxLength(50);
            entity.Property(e => e.Jelszo).HasMaxLength(50);
            entity.Property(e => e.Lejatszasilistak).HasMaxLength(36);
            entity.Property(e => e.Szuletesidatum).HasColumnType("date");
            entity.Property(e => e.Teljesnev).HasMaxLength(50);

            entity.HasOne(d => d.LejatszasilistakNavigation).WithMany(p => p.Felhasznalos)
                .HasForeignKey(d => d.Lejatszasilistak)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("felhasznalo_ibfk_1");
        });

        modelBuilder.Entity<Lista>(entity =>
        {
            entity.HasKey(e => e.Guid).HasName("PRIMARY");

            entity.ToTable("lista");

            entity.HasIndex(e => e.ZeneId, "ZeneId");

            entity.Property(e => e.Guid)
                .HasMaxLength(36)
                .HasColumnName("GUID");
            entity.Property(e => e.ZeneId).HasMaxLength(36);

            entity.HasOne(d => d.Zene).WithMany(p => p.Lista)
                .HasForeignKey(d => d.ZeneId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("lista_ibfk_1");
        });

        modelBuilder.Entity<Tartalom>(entity =>
        {
            entity.HasKey(e => e.Guid).HasName("PRIMARY");

            entity.ToTable("tartalom");

            entity.Property(e => e.Guid)
                .HasMaxLength(36)
                .HasColumnName("GUID");
            entity.Property(e => e.Cim).HasMaxLength(50);
            entity.Property(e => e.Eloado).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
