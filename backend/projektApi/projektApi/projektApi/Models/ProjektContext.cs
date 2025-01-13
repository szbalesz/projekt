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

    public virtual DbSet<LejatszasiLista> LejátszasiLista { get; set; }

    public virtual DbSet<Zene> Zenes { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Felhasznalo>(entity =>
        {
            entity.HasKey(e => e.Guid).HasName("PRIMARY");

            entity.ToTable("felhasznalo");

            entity.Property(e => e.Guid)
                .HasMaxLength(36)
                .HasColumnName("GUID");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'");
            entity.Property(e => e.Felhasznalonev).HasMaxLength(50);
            entity.Property(e => e.Jelszo).HasMaxLength(50);
            entity.Property(e => e.Profilkep).HasDefaultValueSql("'NULL'");
            entity.Property(e => e.Szuletesdatum)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date");
            entity.Property(e => e.Teljesnev)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'");
        });

        modelBuilder.Entity<LejatszasiLista>(entity =>
        {
            entity.HasKey(e => e.Guid).HasName("PRIMARY");

            entity.ToTable("lejátszasi_lista");

            entity.HasIndex(e => e.FelhasznaloId, "FelhasznaloID");

            entity.Property(e => e.Guid)
                .HasMaxLength(36)
                .HasColumnName("GUID");
            entity.Property(e => e.FelhasznaloId)
                .HasMaxLength(36)
                .HasColumnName("FelhasznaloID");
            entity.Property(e => e.ListaNev)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'");

            entity.HasOne(d => d.Felhasznalo).WithMany(p => p.LejátszasiLista)
                .HasForeignKey(d => d.FelhasznaloId)
                .HasConstraintName("lejátszasi_lista_ibfk_1");

            entity.HasMany(d => d.Zenes).WithMany(p => p.Lista)
                .UsingEntity<Dictionary<string, object>>(
                    "ListaZene",
                    r => r.HasOne<Zene>().WithMany()
                        .HasForeignKey("ZeneId")
                        .HasConstraintName("lista_zene_ibfk_2"),
                    l => l.HasOne<LejatszasiLista>().WithMany()
                        .HasForeignKey("ListaId")
                        .HasConstraintName("lista_zene_ibfk_1"),
                    j =>
                    {
                        j.HasKey("ListaId", "ZeneId").HasName("PRIMARY");
                        j.ToTable("lista_zene");
                        j.HasIndex(new[] { "ZeneId" }, "ZeneID");
                        j.IndexerProperty<string>("ListaId")
                            .HasMaxLength(36)
                            .HasColumnName("ListaID");
                        j.IndexerProperty<string>("ZeneId")
                            .HasMaxLength(36)
                            .HasColumnName("ZeneID");
                    });
        });

        modelBuilder.Entity<Zene>(entity =>
        {
            entity.HasKey(e => e.Guid).HasName("PRIMARY");

            entity.ToTable("zene");

            entity.Property(e => e.Guid)
                .HasMaxLength(36)
                .HasColumnName("GUID");
            entity.Property(e => e.Cim)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'");
            entity.Property(e => e.Eloado)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'");
            entity.Property(e => e.Kep).HasDefaultValueSql("'NULL'");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
