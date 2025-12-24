-- Updated seed data for HMIF ITATS with new schema structure
USE hmif_itats;

-- Insert members first (referenced by other tables)
INSERT INTO members (name, position, department, email, phone, level, image, is_active) VALUES
('R. Abiyyu Ardi Lian Permadi', 'Ketua Umum', 'Kepemimpinan', 'abiyyu@hmif.itats.ac.id', '+6281234567890', 1, '/anggota/abiyyu-kahim.png', TRUE),
('Nur Layli Ramadhani Sufyan', 'Wakil Ketua', 'Kepemimpinan', 'layli@hmif.itats.ac.id', '+6281234567891', 1, '/professional-female-student.png', TRUE),
('Ridho Pangestu', 'Sekretaris Umum', 'Administrasi', 'ridho@hmif.itats.ac.id', '+6281234567892', 2, '/professional-male-secretary.jpg', TRUE),
('Rizka Amalia', 'Bendahara Umum', 'Keuangan', 'rizka@hmif.itats.ac.id', '+6281234567893', 2, '/professional-female-treasurer.jpg', TRUE),
('Firman Ardiansyah', 'Koordinator PSDM', 'Pengembangan SDM', 'firman@hmif.itats.ac.id', '+6281234567894', 3, '/academic-coordinator-student.jpg', TRUE),
('Tarishah Aridhah Zhafirah', 'Koordinator Media Digital dan Humas', 'Hubungan Masyarakat', 'tarishah@hmif.itats.ac.id', '+6281234567895', 3, '/student-affairs-coordinator.jpg', TRUE),
('Amelya Sofia Anggraini', 'Koordinator Litbang', 'Penelitian dan Pengembangan', 'amelya@hmif.itats.ac.id', '+6281234567896', 3, '/public-relations-student.jpg', TRUE);

-- Insert users (password: admin123)
INSERT INTO users (username, email, password_hash, role, member_id, is_active) VALUES
('admin', 'admin@hmif.itats.ac.id', '$2b$12$Blewhbkxjltl3hS55UbyG..Y7ZXCxKuNTt0dcVjxzgnFnt08errOO', 'admin', 1, TRUE);

-- Insert divisions with new structure
INSERT INTO divisions (name, slug, description, gradient_from, gradient_to, sort_order, is_active) VALUES
('Divisi Pengembangan SDM', 'pengembangan-sdm', 'Mengelola kegiatan akademik dan pengembangan intelektual mahasiswa', 'blue-500', 'cyan-500', 1, TRUE),
('Divisi Media Digital & Hubungan Masyarakat', 'media-digital-humas', 'Menjalin komunikasi dan kerjasama dengan pihak eksternal', 'purple-500', 'pink-500', 2, TRUE),
('Divisi Penelitian dan Pengembangan', 'penelitian-pengembangan', 'Fokus pada kemampuan ilmiah dan teknologi (IPTEK), menghasilkan temuan baru, serta meningkatkan keahlian (soft skill dan hard skill) anggota', 'green-500', 'teal-500', 3, TRUE);

-- Insert division members
INSERT INTO division_members (division_id, member_id, role, joined_date) VALUES
(1, 5, 'coordinator', '2024-01-01'), -- Firman Ardiansyah as coordinator of PSDM
(2, 6, 'coordinator', '2024-01-01'), -- Tarishah Aridhah Zhafirah as coordinator of Media Digital & Humas
(3, 7, 'coordinator', '2024-01-01'); -- Amelya Sofia Anggraini as coordinator of Litbang

-- Insert posts with proper structure
INSERT INTO posts (title, slug, excerpt, content, date, author_id, author_name, category, priority, tags, image, is_active, published_at) VALUES
('Pemilihan Ketua Himpunan Periode 2024/2025',
 'pemilihan-ketua-himpunan-2024-2025',
 'Pendaftaran calon ketua himpunan telah dibuka. Segera daftarkan diri Anda untuk menjadi bagian dari perubahan.',
 '<h2>Pemilihan Ketua Himpunan Periode 2024/2025</h2><p>Himpunan Mahasiswa Teknik Informatika dengan bangga mengumumkan pembukaan pendaftaran calon ketua himpunan untuk periode 2024/2025.</p><h3>Persyaratan Calon:</h3><ul><li>Mahasiswa aktif Teknik Informatika minimal semester 3</li><li>IPK minimal 3.00</li><li>Tidak sedang menjalani sanksi akademik</li><li>Memiliki visi dan misi yang jelas</li></ul><h3>Timeline:</h3><ul><li>Pendaftaran: 15 Januari - 25 Januari 2025</li><li>Verifikasi berkas: 26 Januari - 28 Januari 2025</li><li>Kampanye: 29 Januari - 5 Februari 2025</li><li>Pemilihan: 6 Februari 2025</li></ul><p>Untuk informasi lebih lanjut, silakan hubungi sekretariat HIMTI.</p>',
 '2025-01-15',
 1,
 'Admin HIMTI',
 'pengumuman',
 'tinggi',
 '["Pemilihan", "Ketua Himpunan", "Periode Baru"]',
 '/berita/fake.jpg',
 TRUE,
 '2025-01-15 08:00:00'),

('Workshop "AI & Machine Learning for Beginners"',
 'workshop-ai-machine-learning-beginners',
 'Bergabunglah dalam workshop eksklusif tentang kecerdasan buatan dan pembelajaran mesin yang akan diselenggarakan bulan depan.',
 '<h2>Workshop "AI & Machine Learning for Beginners"</h2><p>HIMTI dengan bangga mempersembahkan workshop tentang Artificial Intelligence dan Machine Learning yang dirancang khusus untuk pemula.</p><h3>Detail Acara:</h3><ul><li>Tanggal: 20 Februari 2025</li><li>Waktu: 09.00 - 16.00 WIB</li><li>Tempat: Lab Komputer Gedung F</li><li>Pembicara: Dr. Ahmad Fauzi, M.Kom (Dosen AI Universitas)</li></ul><h3>Materi yang akan dibahas:</h3><ul><li>Pengenalan AI dan ML</li><li>Python untuk Data Science</li><li>Implementasi algoritma sederhana</li><li>Hands-on project</li></ul><p>Pendaftaran dibuka hingga 18 Februari 2025. Kuota terbatas hanya 30 peserta!</p>',
 '2025-01-12',
 1,
 'Divisi Akademik',
 'berita',
 'sedang',
 '["Workshop", "AI", "Machine Learning", "Teknologi"]',
 '/berita/dummy.png',
 TRUE,
 '2025-01-12 10:00:00');

-- Insert activities
INSERT INTO activities (title, slug, category, date, participants_count, participants_description, description, status, location, image, is_active) VALUES
('Open Recruitment', 'open-recruitment', 'INTERNAL', '2024-01-01', 14, '14 peserta', 'Penerimaan anggota baru HMIF ITATS', 'completed', 'Ruang Seminar ITATS', '/kegiatan/oprec_24.jpg', TRUE),
('Bakti Sosial 2025', 'bakti-sosial-2025', 'SOSIAL', '2025-04-01', 80, '80 peserta', 'Pelaksanaan bakti sosial dan santunan kepada panti asuhan', 'completed', 'Panti Asuhan Sejahtera', '/dummy.png', TRUE),
('Webinar Kecerdasan Buatan', 'webinar-kecerdasan-buatan', 'AKADEMIK', '2024-05-01', 65, '65 peserta', 'Pelatihan intensif desain antarmuka dan pengalaman pengguna', 'completed', 'Zoom Meeting', '/dummy.png', TRUE),
('Penyambutan Wisudawan 72', 'penyambutan-wisudawan-72', 'SOSIAL', '2025-05-01', 45, '45 Mahasiswa', 'Pelaksanaan penyambutan wisudawan ke-72 Teknik Informatika', 'completed', 'Auditorium ITATS', '/hmif-wisuda72.jpg', TRUE),
('Gemini Tournament Mobile Legend', 'gemini-tournament-mobile-legend', 'KOMPETISI', '2024-06-01', 14, '14 Tim', 'Turnamen Mobile Legend antar angkatan dan jurusan', 'completed', 'Lab Komputer ITATS', '/kegiatan/ml.jpg', TRUE),
('Gemini Tournament Futsal', 'gemini-tournament-futsal', 'KOMPETISI', '2024-06-01', 11, '11 Tim', 'Turnamen Futsal antar angkatan dan jurusan', 'completed', 'Lapangan Futsal ITATS', '/kegiatan/futsal_23.jpg', TRUE);

-- Insert programs
INSERT INTO programs (title, slug, description, start_date, end_date, status, progress, department, participants_count, budget_amount, budget_display, leader_id, leader_name, team, location, is_active) VALUES
('Promosi Himpunan Mahasiswa Teknik Informatika 2025',
 'promosi-himpunan-mahasiswa-teknik-informatika-2025',
 'Promosi dan pemberian wawasan tentang HMIF ITATS kepada mahasiswa baru Teknik Informatika ITATS.',
 '2025-10-01', '2025-10-01',
 'completed', 70,
 'Humas', 99,
 0, 'Rp -',
 1, 'R. Abiyyu Ardi Lian Permadi',
 '[{"name": "Ahmad Maulana Ismaindra", "role": "Dokumentasi"}, {"name": "Tarishah Aridhah Zhafirah", "role": "Publikasi"}]',
 'Graha ITATS',
 TRUE),

('Open Recruitment',
 'open-recruitment',
 'Penerimaan anggota baru HMIF ITATS.',
 '2025-10-10', '2025-10-25',
 'upcoming', 0,
 'Keanggotaan', 150,
 100000, 'Rp 100.000',
 2, 'Nur Layli Ramadhani Sufyan',
 '[{"name": "Bagus Setiawan", "role": "Sekretaris"}, {"name": "Nur Aini", "role": "Koordinator Registrasi"}]',
 'Ruang Seminar ITATS',
 TRUE);
