package com.spardha.portfolio.config;

import com.spardha.portfolio.entity.*;
import com.spardha.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds the database with Spardha Shukla's real resume content the first
 * time the application starts against an empty schema. Safe to run on
 * every boot — each block is guarded by a count() == 0 check, so it never
 * duplicates rows or overwrites data an admin panel might edit later.
 *
 * Set app.seed.enabled=false (e.g. in production) to skip seeding entirely
 * once the database is populated and managed via the admin panel instead.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final CertificateRepository certificateRepository;
    private final AchievementRepository achievementRepository;

    @Value("${app.seed.enabled:true}")
    private boolean seedEnabled;

    @Override
    public void run(String... args) {
        if (!seedEnabled) {
            log.info("Seeding disabled (app.seed.enabled=false) — skipping.");
            return;
        }
        seedProjects();
        seedSkills();
        seedExperience();
        seedEducation();
        seedCertificates();
        seedAchievements();
    }

    private void seedProjects() {
        if (projectRepository.count() > 0) return;
        log.info("Seeding projects...");

        projectRepository.saveAll(List.of(
            Project.builder()
                .title("AI-Based Smart Attendance System")
                .subtitle("Face Recognition + Anomaly Detection")
                .description("Real-time student identification and automated attendance marking using face recognition. Includes anomaly detection to prevent proxy attendance and an ML model for attendance prediction.")
                .features(List.of(
                    "Real-time face recognition with OpenCV",
                    "Anomaly detection for proxy prevention",
                    "ML-based attendance forecasting (scikit-learn)",
                    "Database-backed attendance records"))
                .tech(List.of("Python", "Flask", "OpenCV", "scikit-learn"))
                .period("Nov '25 — Jan '26")
                .githubUrl("#")
                .liveUrl("#")
                .sortOrder(1)
                .build(),
            Project.builder()
                .title("SmartNutri AI Assistant")
                .subtitle("Personalized Nutrition, Powered by Watson")
                .description("An AI assistant that delivers personalized nutrition insights and diet recommendations through AI-driven analysis, built on IBM Watson and Cloud infrastructure.")
                .features(List.of(
                    "Personalized diet recommendations",
                    "AI-driven nutrition analysis",
                    "IBM Watson integration",
                    "Cloud-hosted inference"))
                .tech(List.of("IBM Watson", "Python", "Cloud"))
                .period("Jun '25 — Aug '25")
                .githubUrl("#")
                .liveUrl("#")
                .sortOrder(2)
                .build(),
            Project.builder()
                .title("Freelancing Web Application")
                .subtitle("MERN-Stack Marketplace Platform")
                .description("A full-featured freelancing platform with secure authentication, RESTful APIs, and a responsive UI — shipped during the SmartBridge internship and adopted widely enough to lift engagement by 30%.")
                .features(List.of(
                    "Secure user authentication",
                    "RESTful API architecture",
                    "Responsive, mobile-first UI",
                    "30% lift in user engagement"))
                .tech(List.of("MongoDB", "Express.js", "React.js", "Node.js"))
                .period("Jan '25 — Mar '25")
                .githubUrl("#")
                .liveUrl("#")
                .sortOrder(3)
                .build()
        ));
    }

    private void seedSkills() {
        if (skillRepository.count() > 0) return;
        log.info("Seeding skills...");

        record S(String name, int level, String category) {}
        List<S> skills = List.of(
            new S("Java", 85, "Programming Languages"),
            new S("Python", 90, "Programming Languages"),
            new S("JavaScript", 85, "Programming Languages"),
            new S("C++", 78, "Programming Languages"),
            new S("Spring Boot", 75, "Backend"),
            new S("REST APIs", 82, "Backend"),
            new S("Flask", 80, "Backend"),
            new S("React.js", 84, "Frontend"),
            new S("HTML / CSS", 90, "Frontend"),
            new S("Tailwind CSS", 78, "Frontend"),
            new S("MySQL", 82, "Database"),
            new S("MongoDB", 78, "Database"),
            new S("IBM Cloud", 76, "Cloud"),
            new S("Machine Learning", 80, "Machine Learning"),
            new S("OpenCV", 75, "Machine Learning"),
            new S("Git & GitHub", 85, "Tools"),
            new S("Figma", 70, "Tools"),
            new S("Power BI / Tableau", 72, "Tools")
        );

        int[] order = {0};
        skillRepository.saveAll(skills.stream()
            .map(s -> Skill.builder()
                .name(s.name())
                .level(s.level())
                .category(s.category())
                .sortOrder(order[0]++)
                .build())
            .toList());
    }

    private void seedExperience() {
        if (experienceRepository.count() > 0) return;
        log.info("Seeding experience...");

        experienceRepository.saveAll(List.of(
            Experience.builder()
                .role("AI & Cloud Intern")
                .org("Edunet Foundation × IBM SkillBuild")
                .period("Jul '25 — Aug '25")
                .location("Remote, India")
                .description("Applied machine learning, API integration, cloud deployment, and data visualization using Agile practices. Built AI-based web applications on IBM Cloud with Python, Flask, and Watson AI services for intelligent automation.")
                .sortOrder(1)
                .build(),
            Experience.builder()
                .role("Full Stack Developer")
                .org("SmartBridge & SmartInternz")
                .period("Jan '25 — Mar '25")
                .location("Remote, India")
                .description("Developed and deployed MERN-based web applications with React, Node.js, Express, and MongoDB. Built a freelancing platform that lifted user engagement by 30% through a responsive UI and REST API integration.")
                .sortOrder(2)
                .build(),
            Experience.builder()
                .role("Young Professional")
                .org("TCS iON Career Edge")
                .period("Extracurricular")
                .location("India")
                .description("Completed a comprehensive employability training program covering soft skills, presentation skills, and professional communication.")
                .sortOrder(3)
                .build()
        ));
    }

    private void seedEducation() {
        if (educationRepository.count() > 0) return;
        log.info("Seeding education...");

        educationRepository.saveAll(List.of(
            Education.builder()
                .degree("B.Tech, Bachelor of Technology")
                .institution("Maharana Pratap Engineering College")
                .period("Aug '23 — Present")
                .location("Kanpur, India")
                .score("CGPA: 8.40")
                .sortOrder(1)
                .build(),
            Education.builder()
                .degree("Intermediate (Science)")
                .institution("S.O.V.S Inter College")
                .period("Apr '22 — Feb '23")
                .location("Kanpur Nagar, India")
                .score("85.00%")
                .sortOrder(2)
                .build(),
            Education.builder()
                .degree("High School (Science)")
                .institution("S.O.V.S Inter College")
                .period("Apr '20 — Mar '21")
                .location("Kanpur Nagar, India")
                .score("89.04%")
                .sortOrder(3)
                .build()
        ));
    }

    private void seedCertificates() {
        if (certificateRepository.count() > 0) return;
        log.info("Seeding certificates...");

        record C(String name, String org, String date) {}
        List<C> certs = List.of(
            new C("Data Visualization", "IBM", "Jan '24"),
            new C("Generative AI", "Microsoft", "Dec '24"),
            new C("Data Visualization", "Tata & Forage", "Mar '25"),
            new C("Cyber Security Analyst", "Tata & Forage", "Mar '25"),
            new C("Solutions Architecture", "AWS & Forage", "Mar '25"),
            new C("Full Stack Developer (MERN)", "SmartBridge & SmartInternz", "Apr '25"),
            new C("AI & Cloud Technologies", "IBM SkillsBuild", "Aug '25"),
            new C("Artificial Intelligence", "IBM", "Jul '25"),
            new C("Journey to Cloud", "IBM", "Jul '25"),
            new C("RAG with LangChain", "IBM", "Jul '25")
        );

        int[] order = {0};
        certificateRepository.saveAll(certs.stream()
            .map(c -> Certificate.builder()
                .name(c.name())
                .org(c.org())
                .date(c.date())
                .sortOrder(order[0]++)
                .build())
            .toList());
    }

    private void seedAchievements() {
        if (achievementRepository.count() > 0) return;
        log.info("Seeding achievements...");

        achievementRepository.saveAll(List.of(
            Achievement.builder()
                .title("Academic Excellence")
                .category("Academic")
                .value("8.40 CGPA")
                .description("Maintained a strong academic record throughout the B.Tech program at Maharana Pratap Engineering College.")
                .sortOrder(1)
                .build(),
            Achievement.builder()
                .title("10 Professional Certifications")
                .category("Certifications")
                .value("10+")
                .description("Earned certifications across AI, cloud, cybersecurity, and full-stack development from IBM, Microsoft, AWS, and Tata & Forage.")
                .sortOrder(2)
                .build(),
            Achievement.builder()
                .title("Dual Internship Experience")
                .category("Professional Development")
                .value("2")
                .description("Completed internships in AI & Cloud (Edunet Foundation × IBM SkillBuild) and Full Stack Development (SmartBridge & SmartInternz).")
                .sortOrder(3)
                .build(),
            Achievement.builder()
                .title("Engagement Growth on Freelancing Platform")
                .category("Project Impact")
                .value("+30%")
                .description("Improved user engagement by 30% on a MERN-stack freelancing platform through a responsive UI and REST API integration.")
                .sortOrder(4)
                .build(),
            Achievement.builder()
                .title("TCS iON Career Edge — Young Professional")
                .category("Professional Development")
                .value("Completed")
                .description("Completed a comprehensive employability training program covering soft skills, presentation, and communication.")
                .sortOrder(5)
                .build()
        ));
    }
}
