-- Seed data for HMIF ITATS Admin System

USE hmif_itats;

-- Insert posts (pengumuman & berita)
INSERT INTO posts (title, excerpt, content, date, author, category, priority, tags, image) VALUES
('Pemilihan Ketua Himpunan Periode 2024/2025', 'Pendaftaran calon ketua himpunan telah dibuka. Segera daftarkan diri Anda untuk menjadi bagian dari perubahan.', '<h2>Pemilihan Ketua Himpunan Periode 2024/2025</h2><p>Himpunan Mahasiswa Teknik Informatika dengan bangga mengumumkan pembukaan pendaftaran calon ketua himpunan untuk periode 2024/2025.</p><h3>Persyaratan Calon:</h3><ul><li>Mahasiswa aktif Teknik Informatika minimal semester 3</li><li>IPK minimal 3.00</li><li>Tidak sedang menjalani sanksi akademik</li><li>Memiliki visi dan misi yang jelas</li></ul><h3>Timeline:</h3><ul><li>Pendaftaran: 15 Januari - 25 Januari 2025</li><li>Verifikasi berkas: 26 Januari - 28 Januari 2025</li><li>Kampanye: 29 Januari - 5 Februari 2025</li><li>Pemilihan: 6 Februari 2025</li></ul><p>Untuk informasi lebih lanjut, silakan hubungi sekretariat HIMTI.</p>', '2025-01-15', 'Sekretaris HIMTI', 'pengumuman', 'tinggi', '["Pemilihan", "Ketua Himpunan", "Periode Baru"]', '/berita/fake.jpg'),
('Workshop "AI & Machine Learning for Beginners"', 'Bergabunglah dalam workshop eksklusif tentang kecerdasan buatan dan pembelajaran mesin yang akan diselenggarakan bulan depan.', '<h2>Workshop "AI & Machine Learning for Beginners"</h2><p>HIMTI dengan bangga mempersembahkan workshop tentang Artificial Intelligence dan Machine Learning yang dirancang khusus untuk pemula.</p><h3>Detail Acara:</h3><ul><li>Tanggal: 20 Februari 2025</li><li>Waktu: 09.00 - 16.00 WIB</li><li>Tempat: Lab Komputer Gedung F</li><li>Pembicara: Dr. Ahmad Fauzi, M.Kom (Dosen AI Universitas)</li></ul><h3>Materi yang akan dibahas:</h3><ul><li>Pengenalan AI dan ML</li><li>Python untuk Data Science</li><li>Implementasi algoritma sederhana</li><li>Hands-on project</li></ul><p>Pendaftaran dibuka hingga 18 Februari 2025. Kuota terbatas hanya 30 peserta!</p>', '2025-01-12', 'Divisi Akademik', 'berita', 'sedang', '["Workshop", "AI", "Machine Learning", "Teknologi"]', '/berita/dummy.png');

-- Insert activities (kegiatan)
INSERT INTO activities (title, category, date, participants, description, status, image) VALUES
('Open Recruitmen', 'INTERNAL', '2024-01-01', '14 peserta', 'Penerimaan anggota baru HMIF ITATS', 'Selesai', '/kegiatan/oprec_24.jpg'),
('Bakti Sosial 2025', 'SOSIAL', '2025-04-01', '80 peserta', 'Pelaksanaan bakti sosial dan santunan kepada panti asuhan', 'Selesai', '/dummy.png'),
('Webinar Kecerdasan Buatan', 'AKADEMIK', '2024-05-01', '65 peserta', 'Pelatihan intensif desain antarmuka dan pengalaman pengguna', 'Selesai', '/dummy.png'),
('Penyambutan Wisudawan 72', 'SOSIAL', '2025-05-01', '45 Mahasiswa', 'Pelaksanaan penyambutan wisudawan ke-72 Teknik Informatika', 'Selesai', '/hmif-wisuda72.jpg'),
('Gemini Tournament Mobile Legend', 'KOMPETISI', '2024-06-01', '14 Tim', 'Turnamen Mobile Legend antar angkatan dan jurusan', 'Selesai', '/kegiatan/ml.jpg'),
('Gemini Tournament Futsal', 'KOMPETISI', '2024-06-01', '11 Tim', 'Turnamen Futsal antar angkatan dan jurusan', 'Selesai', '/kegiatan/futsal_23.jpg');

-- Insert programs (program kerja)
INSERT INTO programs (title, description, start_date, end_date, status, progress, department, participants, budget, leader, team, location, photos, detailed_description) VALUES
('Promosi Himpunan Mahasiswa Teknik Informatika 2025', 'Promosi dan pemberian wawasan tentang HMIF ITATS kepada mahasiswa baru Teknik Informatika ITATS.', '2025-10-01', '2025-10-01', 'completed', 70, 'Humas', 99, 'Rp -', 'R. Abiyyu Ardi Lian Permadi', '[{"name": "Ahmad Maulana Ismaindra", "role": "Dokumentasi"}, {"name": "Tarishah Aridhah Zhafirah", "role": "Publikasi"}]', 'Graha ITATS', '["/poster_pomosi.png"]', 'Kegiatan ini bertujuan memperkenalkan HMIF ITATS kepada mahasiswa baru Teknik Informatika ITATS, meliputi pengenalan program kerja, struktur organisasi, dan manfaat bergabung di himpunan.'),
('Open Recruitment', 'Penerimaan anggota baru HMIF ITATS.', '2025-10-10', '2025-10-25', 'upcoming', 0, 'Keanggotaan', 150, 'Rp 100.000', 'Ayu Lestari', '[{"name": "Bagus Setiawan", "role": "Sekretaris"}, {"name": "Nur Aini", "role": "Koordinator Registrasi"}]', 'Ruang Seminar ITATS', '["/open-recruitment-session.jpg"]', 'Open recruitment dilaksanakan untuk merekrut anggota baru HMIF ITATS dengan seleksi administrasi, wawancara, dan orientasi pengenalan organisasi.');

-- Insert members (anggota organisasi)
INSERT INTO members (name, position, department, level, image) VALUES
('R. Abiyyu Ardi Lian Permadi', 'Ketua Umum', 'Kepemimpinan', 1, '/anggota/abiyyu-kahim.png'),
('Nur Layli Ramadhani Sufyan', 'Wakil Ketua', 'Kepemimpinan', 1, '/professional-female-student.png'),
('Ridho Pangestu', 'Sekretaris Umum', 'Administrasi', 2, '/professional-male-secretary.jpg'),
('Rizka Amalia', 'Bendahara Umum', 'Keuangan', 2, '/professional-female-treasurer.jpg'),
('Firman Ardiansyah', 'Koordinator PSDM', 'Pengembangan SDM', 3, '/academic-coordinator-student.jpg'),
('Tarishah Aridhah Zhafirah', 'Koordinator Media Digital dan Humas', 'Hubungan Masyarakat', 3, '/student-affairs-coordinator.jpg'),
('Amelya Sofia Anggraini', 'Koordinator Litbang', 'Penelitian dan Pengembangan', 3, '/public-relations-student.jpg');

-- Insert divisions
INSERT INTO divisions (name, description, color) VALUES
('Divisi Pengembangan SDM', 'Mengelola kegiatan akademik dan pengembangan intelektual mahasiswa', 'from-blue-500 to-cyan-500'),
('Divisi Media Digital & Hubungan Masyarakat', 'Menjalin komunikasi dan kerjasama dengan pihak eksternal', 'from-purple-500 to-pink-500'),
('Divisi Penelitian dan Pengembangan', 'Fokus pada kemampuan ilmiah dan teknologi (IPTEK), menghasilkan temuan baru, serta meningkatkan keahlian (soft skill dan hard skill) anggota', 'from-green-500 to-teal-500');

-- Note: division_members will be populated through the admin interface
-- by linking existing members to divisions

-- Insert default admin user (password: admin123) - linked to Ketua Umum member
INSERT INTO users (username, email, password_hash, role, member_id) VALUES
('admin', 'admin@hmif.itats.ac.id', '$2b$12$Blewhbkxjltl3hS55UbyG..Y7ZXCxKuNTt0dcVjxzgnFnt08errOO', 'admin', 1);
