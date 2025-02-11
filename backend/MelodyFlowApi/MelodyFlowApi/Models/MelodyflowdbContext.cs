using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MelodyFlowApi.Models;

public partial class MelodyflowdbContext : DbContext
{
    public MelodyflowdbContext()
    {
    }

    public MelodyflowdbContext(DbContextOptions<MelodyflowdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Aspnetrole> Aspnetroles { get; set; }

    public virtual DbSet<Aspnetroleclaim> Aspnetroleclaims { get; set; }

    public virtual DbSet<Aspnetuser> Aspnetusers { get; set; }

    public virtual DbSet<Aspnetuserclaim> Aspnetuserclaims { get; set; }

    public virtual DbSet<Aspnetuserlogin> Aspnetuserlogins { get; set; }

    public virtual DbSet<Aspnetusertoken> Aspnetusertokens { get; set; }

    public virtual DbSet<Efmigrationshistory> Efmigrationshistories { get; set; }

    public virtual DbSet<Music> Musics { get; set; }

    public virtual DbSet<Playlist> Playlists { get; set; }

    public virtual DbSet<Playlistmusic> Playlistmusics { get; set; }

    public virtual DbSet<Userplaylist> Userplaylists { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("server=localhost;database=melodyflowdb;user=root;password=;sslmode=none;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Aspnetrole>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("aspnetroles");

            entity.HasIndex(e => e.NormalizedName, "RoleNameIndex").IsUnique();

            entity.Property(e => e.ConcurrencyStamp).HasDefaultValueSql("'NULL'");
            entity.Property(e => e.Name)
                .HasMaxLength(256)
                .HasDefaultValueSql("'NULL'");
            entity.Property(e => e.NormalizedName)
                .HasMaxLength(256)
                .HasDefaultValueSql("'NULL'");
        });

        modelBuilder.Entity<Aspnetroleclaim>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("aspnetroleclaims");

            entity.HasIndex(e => e.RoleId, "IX_AspNetRoleClaims_RoleId");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.ClaimType).HasDefaultValueSql("'NULL'");
            entity.Property(e => e.ClaimValue).HasDefaultValueSql("'NULL'");

            entity.HasOne(d => d.Role).WithMany(p => p.Aspnetroleclaims)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK_AspNetRoleClaims_AspNetRoles_RoleId");
        });

        modelBuilder.Entity<Aspnetuser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("aspnetusers");

            entity.HasIndex(e => e.NormalizedEmail, "EmailIndex");

            entity.HasIndex(e => e.Id, "Id");

            entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex").IsUnique();

            entity.Property(e => e.AccessFailedCount).HasColumnType("int(11)");
            entity.Property(e => e.BirthDate).HasMaxLength(6);
            entity.Property(e => e.ConcurrencyStamp).HasDefaultValueSql("'NULL'");
            entity.Property(e => e.Email)
                .HasMaxLength(256)
                .HasDefaultValueSql("'NULL'");
            entity.Property(e => e.Fullname).HasDefaultValueSql("'NULL'");
            entity.Property(e => e.LockoutEnd)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("datetime");
            entity.Property(e => e.NormalizedEmail)
                .HasMaxLength(256)
                .HasDefaultValueSql("'NULL'");
            entity.Property(e => e.NormalizedUserName)
                .HasMaxLength(256)
                .HasDefaultValueSql("'NULL'");
            entity.Property(e => e.PasswordHash).HasDefaultValueSql("'NULL'");
            entity.Property(e => e.PhoneNumber).HasDefaultValueSql("'NULL'");
            entity.Property(e => e.ProfilePictureUrl)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("ProfilePictureURL");
            entity.Property(e => e.SecurityStamp).HasDefaultValueSql("'NULL'");
            entity.Property(e => e.UserName)
                .HasMaxLength(256)
                .HasDefaultValueSql("'NULL'");

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "Aspnetuserrole",
                    r => r.HasOne<Aspnetrole>().WithMany()
                        .HasForeignKey("RoleId")
                        .HasConstraintName("FK_AspNetUserRoles_AspNetRoles_RoleId"),
                    l => l.HasOne<Aspnetuser>().WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_AspNetUserRoles_AspNetUsers_UserId"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId").HasName("PRIMARY");
                        j.ToTable("aspnetuserroles");
                        j.HasIndex(new[] { "RoleId" }, "IX_AspNetUserRoles_RoleId");
                    });
        });

        modelBuilder.Entity<Aspnetuserclaim>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("aspnetuserclaims");

            entity.HasIndex(e => e.UserId, "IX_AspNetUserClaims_UserId");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.ClaimType).HasDefaultValueSql("'NULL'");
            entity.Property(e => e.ClaimValue).HasDefaultValueSql("'NULL'");

            entity.HasOne(d => d.User).WithMany(p => p.Aspnetuserclaims)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_AspNetUserClaims_AspNetUsers_UserId");
        });

        modelBuilder.Entity<Aspnetuserlogin>(entity =>
        {
            entity.HasKey(e => new { e.LoginProvider, e.ProviderKey }).HasName("PRIMARY");

            entity.ToTable("aspnetuserlogins");

            entity.HasIndex(e => e.UserId, "IX_AspNetUserLogins_UserId");

            entity.Property(e => e.ProviderDisplayName).HasDefaultValueSql("'NULL'");

            entity.HasOne(d => d.User).WithMany(p => p.Aspnetuserlogins)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_AspNetUserLogins_AspNetUsers_UserId");
        });

        modelBuilder.Entity<Aspnetusertoken>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name }).HasName("PRIMARY");

            entity.ToTable("aspnetusertokens");

            entity.Property(e => e.Value).HasDefaultValueSql("'NULL'");

            entity.HasOne(d => d.User).WithMany(p => p.Aspnetusertokens)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_AspNetUserTokens_AspNetUsers_UserId");
        });

        modelBuilder.Entity<Efmigrationshistory>(entity =>
        {
            entity.HasKey(e => e.MigrationId).HasName("PRIMARY");

            entity.ToTable("__efmigrationshistory");

            entity.Property(e => e.MigrationId).HasMaxLength(150);
            entity.Property(e => e.ProductVersion).HasMaxLength(32);
        });

        modelBuilder.Entity<Music>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("music");

            entity.Property(e => e.Id).HasMaxLength(36);
            entity.Property(e => e.Artist)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'");
            entity.Property(e => e.ImageUrl)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("Image_URL");
            entity.Property(e => e.MusicUrl).HasColumnName("Music_URL");
            entity.Property(e => e.Title)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'");
        });

        modelBuilder.Entity<Playlist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("playlist");

            entity.HasIndex(e => e.Id, "Id");

            entity.Property(e => e.Id).HasMaxLength(36);
            entity.Property(e => e.ImageUrl).HasColumnName("Image_URL");
            entity.Property(e => e.PlaylistName)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'");
        });

        modelBuilder.Entity<Playlistmusic>(entity =>
        {
            entity.HasKey(e => new { e.PlaylistId, e.MusicId }).HasName("PRIMARY");

            entity.ToTable("playlistmusic");

            entity.HasIndex(e => new { e.PlaylistId, e.MusicId }, "PlaylistId");

            entity.Property(e => e.PlaylistId).HasMaxLength(36);
            entity.Property(e => e.MusicId).HasMaxLength(36);
        });

        modelBuilder.Entity<Userplaylist>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.PlaylistId }).HasName("PRIMARY");

            entity.ToTable("userplaylist");

            entity.HasIndex(e => new { e.UserId, e.PlaylistId }, "UserId");

            entity.Property(e => e.PlaylistId).HasMaxLength(36);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
