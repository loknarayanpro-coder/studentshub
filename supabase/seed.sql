-- ====================================================================
-- AU Student Hub - Seed Data for Departments, Regulations, Subjects & Resources
-- ====================================================================

-- 1. Departments
insert into departments (id, code, name, description, icon) values
('cse', 'CSE', 'Computer Science and Engineering', 'Core computing, AI, systems, algorithms and software engineering.', 'Cpu'),
('it', 'IT', 'Information Technology', 'Software systems, network management, web technologies and data.', 'Globe'),
('ece', 'ECE', 'Electronics and Communication Engineering', 'Circuits, signal processing, VLSI, embedded systems and communications.', 'Radio'),
('eee', 'EEE', 'Electrical and Electronics Engineering', 'Power systems, machines, control engineering and green energy.', 'Zap'),
('mech', 'MECH', 'Mechanical Engineering', 'Thermodynamics, CAD/CAM, fluid mechanics and automotive engineering.', 'Wrench'),
('civil', 'CIVIL', 'Civil Engineering', 'Structural design, construction, surveying, soil mechanics and environmental.', 'Building')
on conflict (id) do nothing;

-- 2. Regulations
insert into regulations (id, year, name, is_active, description) values
('2021', 2021, 'Regulation 2021 (Choice Based Credit System)', true, 'Currently active for 2nd, 3rd, and 4th year undergraduate engineering batches.'),
('2025', 2025, 'Regulation 2025 (Next-Gen AI & Industry Integrated)', true, 'New curriculum introduced with AI specialization, hands-on capstone and early internship credits.')
on conflict (id) do nothing;

-- 3. Sample Subjects (Regulation 2021 - CSE)
insert into subjects (id, code, name, department_id, semester, regulation, credits, description, syllabus_overview) values
('11111111-1111-1111-1111-111111111101', 'CS3301', 'Data Structures', 'cse', 3, '2021', 3, 'Linear and non-linear data structures, trees, graphs, sorting, searching and algorithmic analysis.', 'Unit 1: Linear structures (Lists, Stacks, Queues); Unit 2: Trees & BST; Unit 3: Graphs & Shortest Paths; Unit 4: Hashing & Heaps; Unit 5: Sorting, Searching & Complexity.'),
('11111111-1111-1111-1111-111111111102', 'CS3391', 'Object Oriented Programming', 'cse', 3, '2021', 3, 'Java paradigms, OOP principles, inheritance, polymorphism, multithreading and exception handling.', 'Unit 1: OOP Basics; Unit 2: Inheritance & Interfaces; Unit 3: Exception Handling & Multithreading; Unit 4: Generic Collections; Unit 5: Event-Driven Programming.'),
('11111111-1111-1111-1111-111111111103', 'CS3491', 'Artificial Intelligence and Machine Learning', 'cse', 4, '2021', 4, 'Search algorithms, knowledge representation, supervised & unsupervised machine learning, neural networks.', 'Unit 1: Problem Solving Agents; Unit 2: Probabilistic Reasoning; Unit 3: Supervised Learning; Unit 4: Unsupervised Learning; Unit 5: Deep Learning Basics.'),
('11111111-1111-1111-1111-111111111104', 'CS3591', 'Computer Networks', 'cse', 5, '2021', 4, 'Network architecture, OSI & TCP/IP layers, routing algorithms, transport protocols and congestion control.', 'Unit 1: Introduction & Physical Layer; Unit 2: Data Link Layer & MAC; Unit 3: Network Layer & Routing; Unit 4: Transport Layer & TCP; Unit 5: Application Layer & Security.'),
('11111111-1111-1111-1111-111111111105', 'CS3501', 'Compiler Design', 'cse', 5, '2021', 4, 'Lexical analysis, syntax analysis, code generation, intermediate code and optimization techniques.', 'Unit 1: Lexical Analysis & Lex; Unit 2: Syntax Analysis & Yacc; Unit 3: Syntax Directed Translation; Unit 4: Run-time Environments; Unit 5: Code Optimization & Generation.')
on conflict do nothing;

-- 4. Units for Computer Networks (CS3591)
insert into units (id, subject_id, unit_number, title, description, topics) values
('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111104', 1, 'Introduction & Physical Layer', 'Network architectures, topologies, transmission media, circuit and packet switching.', '{"OSI 7-Layer Model", "TCP/IP Suite", "Transmission Media", "Switching Techniques", "Physical Layer Impairments"}'),
('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111104', 2, 'Data Link Layer & Medium Access', 'Framing, error detection & correction, flow control and multi-access protocols.', '{"CRC & Hamming Code", "Stop-and-Wait", "Sliding Window Protocols", "CSMA/CD & CSMA/CA", "Ethernet Architecture"}'),
('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111104', 3, 'Network Layer & Routing', 'IPv4, IPv6 addressing, subnets, routing algorithms and NAT.', '{"IPv4 vs IPv6 Header", "Subnetting & CIDR", "Dijkstra Link State Routing", "Distance Vector Routing", "BGP & OSPF"}'),
('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111104', 4, 'Transport Layer', 'TCP connection establishment, 3-way handshake, UDP, flow control, congestion control algorithms.', '{"TCP vs UDP", "Three-way Handshake", "TCP Congestion Control (Tahoe/Reno)", "Leaky Bucket & Token Bucket", "Socket Programming"}'),
('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111104', 5, 'Application Layer & Network Security', 'DNS, HTTP/1.1 vs HTTP/2, SMTP, cryptography fundamentals and firewalls.', '{"DNS Resolution Process", "HTTP / HTTPS Protocol", "SMTP & POP3", "Symmetric vs Asymmetric Encryption", "Firewalls & VPNs"}')
on conflict do nothing;

-- 5. Sample Resources for Computer Networks
insert into resources (id, title, description, subject_id, unit_id, resource_type, s3_key, file_name, file_size, file_size_bytes, is_verified, is_official, status, downloads_count, views_count) values
('33333333-3333-3333-3333-333333333301', 'Complete Computer Networks Unit 1-5 Lecture Notes', 'Comprehensive faculty lecture notes covering the entire Regulation 2021 syllabus with neat architecture diagrams and solved numerical problems.', '11111111-1111-1111-1111-111111111104', null, 'notes', 'resources/notes/cse/cs3591_complete_lecture_notes.pdf', 'CS3591_Complete_Lecture_Notes.pdf', '5.8 MB', 6081740, true, true, 'published', 1420, 3850),
('33333333-3333-3333-3333-333333333302', 'Unit 3: Network Layer & Subnetting Handout', 'Detailed guide on IPv4 classless addressing, CIDR calculation steps and routing protocol comparisons.', '11111111-1111-1111-1111-111111111104', '22222222-2222-2222-2222-222222222203', 'notes', 'resources/notes/cse/cs3591_unit3_subnetting.pdf', 'CS3591_Unit3_Subnetting_Guide.pdf', '2.4 MB', 2516582, true, false, 'published', 890, 2140),
('33333333-3333-3333-3333-333333333303', 'Anna University Nov/Dec 2024 Question Paper', 'Official question paper from Anna University November/December 2024 examinations for CS3591.', '11111111-1111-1111-1111-111111111104', null, 'question_paper', 'resources/question-papers/cse/cs3591_nov_dec_2024.pdf', 'CS3591_Nov_Dec_2024.pdf', '1.1 MB', 1153433, true, true, 'published', 2640, 5290),
('33333333-3333-3333-3333-333333333304', 'Anna University April/May 2024 Question Paper', 'Official question paper from Anna University April/May 2024 semester examinations for CS3591.', '11111111-1111-1111-1111-111111111104', null, 'question_paper', 'resources/question-papers/cse/cs3591_apr_may_2024.pdf', 'CS3591_Apr_May_2024.pdf', '1.3 MB', 1363148, true, true, 'published', 1980, 4420)
on conflict do nothing;

-- 6. Important Questions with Historical Records
insert into important_questions (id, subject_id, unit_id, question_text, marks, category, appearance_years, answer_notes, is_verified) values
('44444444-4444-4444-4444-444444444401', '11111111-1111-1111-1111-111111111104', '22222222-2222-2222-2222-222222222201', 'Explain the OSI 7-Layer reference model in detail with neat diagram and functionalities of each layer.', 13, 'Frequently Asked', '{"2022 Nov/Dec", "2023 Apr/May", "2024 Nov/Dec"}', 'Include diagram showing 7 layers (Application to Physical), data encapsulation at each layer (PDU names: Bits, Frames, Packets, Segments, Data), and at least 3 distinct responsibilities per layer.', true),
('44444444-4444-4444-4444-444444444402', '11111111-1111-1111-1111-111111111104', '22222222-2222-2222-2222-222222222202', 'Describe the Cyclic Redundancy Check (CRC) error detection mechanism with an illustrative numerical example.', 13, 'Important', '{"2023 Nov/Dec", "2024 Apr/May"}', 'Show generator polynomial, binary division steps, transmitted message calculation and error detection verification at receiver.', true),
('44444444-4444-4444-4444-444444444403', '11111111-1111-1111-1111-111111111104', '22222222-2222-2222-2222-222222222203', 'Illustrate Dijkstra Algorithm to find the shortest path from a single source router with step-by-step routing table.', 15, 'Exam Focus', '{"2024 Nov/Dec"}', 'Construct an arbitrary 5-node graph, state initialization, greedy step execution and final minimum cost table.', true)
on conflict do nothing;

-- 7. Verified Opportunities (Internships & Jobs)
insert into opportunities (id, title, company_name, description, type, work_mode, location, stipend_or_salary, duration, eligibility, skills_required, graduation_years, deadline, apply_url, is_verified, status) values
('55555555-5555-5555-5555-555555555501', 'Frontend Developer Intern', 'Zoho Corporation', 'Work on high-impact SaaS web interfaces, responsive dashboard designs, and performance optimization.', 'internship', 'hybrid', 'Chennai, Tamil Nadu', '₹25,000 / month', '6 Months', '{"CSE", "IT", "ECE"}', '{"React", "TypeScript", "Tailwind CSS", "REST APIs"}', '{2026, 2027}', '2026-11-15 23:59:59+00', 'https://careers.zohocorp.com', true, 'published'),
('55555555-5555-5555-5555-555555555502', 'Cloud & DevOps Intern', 'Freshworks', 'Assist in provisioning Kubernetes clusters, automated CI/CD pipelines, and microservices monitoring.', 'internship', 'remote', 'Remote (India)', '₹30,000 / month', '3 Months', '{"CSE", "IT"}', '{"Docker", "Kubernetes", "AWS", "Linux"}', '{2026, 2027}', '2026-10-30 23:59:59+00', 'https://www.freshworks.com/company/careers', true, 'published'),
('55555555-5555-5555-5555-555555555503', 'Associate Software Engineer', 'Tata Consultancy Services', 'Campus recruitment opportunity for fresh engineering graduates across core development and systems.', 'job', 'on-site', 'Siruseri, Chennai', '₹4.5 - ₹7.0 LPA', 'Full-time', '{"CSE", "IT", "ECE", "EEE"}', '{"Java", "Python", "SQL", "Problem Solving"}', '{2026, 2027}', '2026-12-01 23:59:59+00', 'https://www.tcs.com/careers', true, 'published')
on conflict do nothing;
