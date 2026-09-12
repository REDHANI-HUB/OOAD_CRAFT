package com.ooadcraft.controller;

import com.ooadcraft.model.*;
import com.ooadcraft.model.Module;
import com.ooadcraft.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/seed")
public class SeedController {

    @Autowired private ModuleRepository moduleRepository;
    @Autowired private LessonRepository lessonRepository;
    @Autowired private QuizRepository quizRepository;
    @Autowired private QuestionRepository questionRepository;
    @Autowired private DesignChallengeRepository challengeRepository;
    @Autowired private CaseStudyRepository caseStudyRepository;
    @Autowired private DesignPatternRepository patternRepository;
    @Autowired private AchievementRepository achievementRepository;

    @PostMapping
    public ResponseEntity<?> seedDatabase() {
        if (moduleRepository.count() > 0) {
            Map<String, String> res = new HashMap<>();
            res.put("message", "Database already seeded!");
            return ResponseEntity.ok(res);
        }

        // 1. Seed Modules & Lessons & Quizzes
        Module m1 = moduleRepository.save(new Module("Module 1: OOP Fundamentals & Encapsulation", "Master Abstraction, Encapsulation, Inheritance, and Polymorphism.", 1, "BASICS"));
        Lesson l1 = lessonRepository.save(new Lesson(m1, "Core Pillars of Object-Oriented Programming", "Learn how objects model real-world domain entities with state and behavior.", "Object-oriented programming rests on four fundamental pillars: Abstraction, Encapsulation, Inheritance, and Polymorphism.", "https://www.youtube.com/embed/pTB0EiLXUC8", 1, 100));
        Lesson l2 = lessonRepository.save(new Lesson(m1, "Encapsulation & Information Hiding", "Protect internal object invariants using access modifiers and getter/setter abstractions.", "Encapsulation ensures that an object's internal representation is hidden from view outside the object's definition.", "https://www.youtube.com/embed/pTB0EiLXUC8", 2, 120));
        
        Quiz q1 = quizRepository.save(new Quiz(m1, "OOP Fundamentals Quiz", "Test your knowledge of object-oriented principles.", 70, 150));
        questionRepository.save(new Question(q1, "Which OOP principle hides internal implementation details?", "MCQ", "[\"Encapsulation\",\"Polymorphism\",\"Inheritance\",\"Abstraction\"]", 0, "Encapsulation restricts direct access to an object's state and exposes only controlled interfaces."));
        questionRepository.save(new Question(q1, "True or False: Polymorphism allows objects of different classes to respond to the same method invocation.", "TRUE_FALSE", "[\"True\",\"False\"]", 0, "Polymorphism allows dynamic method dispatch across subtype hierarchies."));

        Module m2 = moduleRepository.save(new Module("Module 2: Object-Oriented Analysis & Requirements", "Use Case Diagrams, Domain Modeling, and Identifying Candidate Classes.", 2, "BASICS"));
        Lesson l3 = lessonRepository.save(new Lesson(m2, "Extracting Domain Classes from Requirements", "Identify Nouns and Verbs in problem statements to construct initial domain models.", "In OOAD, nouns in user requirements often map to classes or attributes, while verbs map to operations.", "https://www.youtube.com/embed/pTB0EiLXUC8", 1, 150));

        Quiz q2 = quizRepository.save(new Quiz(m2, "OO Analysis Quiz", "Verify your ability to parse requirements into domain models.", 70, 200));
        questionRepository.save(new Question(q2, "In Object-Oriented Analysis, what do Nouns in requirement specifications usually represent?", "MCQ", "[\"Candidate Classes/Entities\",\"Methods/Behaviors\",\"Interface Contracts\",\"Attributes Only\"]", 0, "Nouns in domain requirements identify candidate objects and classes."));

        Module m3 = moduleRepository.save(new Module("Module 3: Structural & Behavioral UML Diagrams", "Class Diagrams, Sequence Diagrams, Use Cases, and Statecharts.", 3, "MEDIUM"));
        Lesson l4 = lessonRepository.save(new Lesson(m3, "Class Relationships: Aggregation vs Composition", "Distinguish strong lifecycle ownership (Composition) from loose HAS-A associations (Aggregation).", "Composition implies a strong whole-part lifecycle relationship, whereas Aggregation indicates a looser association.", "https://www.youtube.com/embed/pTB0EiLXUC8", 1, 200));

        Quiz q3 = quizRepository.save(new Quiz(m3, "UML Modeling Quiz", "Evaluate class relationships and interaction diagrams.", 75, 250));
        questionRepository.save(new Question(q3, "If deleting a Building object automatically deletes all Room objects inside it, what relationship is this?", "MCQ", "[\"Composition\",\"Aggregation\",\"Dependency\",\"Generalization\"]", 0, "Composition represents strong lifecycle dependency where child parts cannot exist without the parent container."));

        Module m4 = moduleRepository.save(new Module("Module 4: SOLID Design Principles", "Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.", 4, "MEDIUM"));
        Lesson l5 = lessonRepository.save(new Lesson(m4, "The Single Responsibility Principle (SRP)", "A class should have one, and only one, reason to change.", "SRP states that a software module or class should have one and only one reason to change, maximizing cohesion.", "https://www.youtube.com/embed/pTB0EiLXUC8", 1, 250));

        Quiz q4 = quizRepository.save(new Quiz(m4, "SOLID Principles Master Quiz", "Refactor bad code violating SOLID principles.", 80, 300));
        questionRepository.save(new Question(q4, "Which principle states software entities should be open for extension but closed for modification?", "MCQ", "[\"Open-Closed Principle (OCP)\",\"Single Responsibility (SRP)\",\"Liskov Substitution (LSP)\",\"Dependency Inversion (DIP)\"]", 0, "OCP promotes extending behavior via interfaces/inheritance without mutating existing code."));

        Module m5 = moduleRepository.save(new Module("Module 5: Creational, Structural & Behavioral Patterns", "Factory, Singleton, Observer, Strategy, Decorator, Adapter.", 5, "ADVANCED"));
        Lesson l6 = lessonRepository.save(new Lesson(m5, "The Strategy Design Pattern", "Encapsulate interchangeable algorithms into separate classes.", "The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable.", "https://www.youtube.com/embed/pTB0EiLXUC8", 1, 300));

        Module m6 = moduleRepository.save(new Module("Module 6: Enterprise Architecture & Case Studies", "Architecting scalable systems from requirements to code.", 6, "ADVANCED"));
        Lesson l7 = lessonRepository.save(new Lesson(m6, "Architecting a Scalable ATM System", "End-to-end design walkthrough of an automated teller machine.", "Learn how hardware interfaces, transaction logging, and account balances interact in an ATM domain.", "https://www.youtube.com/embed/pTB0EiLXUC8", 1, 350));

        // 2. Seed Design Challenges
        challengeRepository.save(new DesignChallenge("Fix the Monolithic Order System", "Refactor a bloated OrderManager class violating SRP and OCP.", "The current OrderManager handles payment processing, PDF generation, email sending, and database operations.", "BAD_SMELL", "MEDIUM", 300));
        challengeRepository.save(new DesignChallenge("Design an Elastic Payment Gateway", "Apply Strategy Pattern to support PayPal, Stripe, and Crypto dynamically.", "Build a PaymentProcessor that switches payment providers seamlessly at runtime.", "PATTERN", "ADVANCED", 450));

        // 3. Seed Case Studies
        caseStudyRepository.save(new CaseStudy("Automated Teller Machine (ATM)", "Architect a multi-bank ATM network with hardware security module interfaces.", "Banking", "[{\"step\":1,\"title\":\"Use Case & Requirements\"},{\"step\":2,\"title\":\"Domain Class Model\"},{\"step\":3,\"title\":\"Sequence Diagram Execution\"}]", 500));
        caseStudyRepository.save(new CaseStudy("Online Food Delivery System", "Design an UberEats-style platform connecting Customers, Restaurants, and Drivers.", "E-Commerce", "[{\"step\":1,\"title\":\"Identify Actors & Use Cases\"},{\"step\":2,\"title\":\"State Machine for Driver Matching\"}]", 600));

        // 4. Seed Design Patterns
        patternRepository.save(new DesignPattern("CREATIONAL", "Factory Method", "Creating objects directly leads to tight coupling.", "Define an interface for creating an object, but let subclasses decide which class to instantiate.", "public interface Button { void render(); }\npublic class WindowsButton implements Button { public void render() { System.out.println(\"Render Windows Button\"); } }", "class Button:\n    def render(self):\n        pass", "class Button {\npublic:\n    virtual void render() = 0;\n};"));
        patternRepository.save(new DesignPattern("BEHAVIORAL", "Observer Pattern", "Objects need to notify dependent listeners when state changes without tight coupling.", "Define a one-to-many dependency between objects so that when one changes state, all dependents are notified automatically.", "public interface Observer { void update(String msg); }", "class Observer:\n    def update(self, msg): pass", "class Observer { public: virtual void update(string msg) = 0; };"));

        // 5. Seed Achievements
        achievementRepository.save(new Achievement("First Step", "Complete your first OOAD lesson.", "zap", "GENERAL", "LESSON", 1));
        achievementRepository.save(new Achievement("Quiz Master", "Pass 5 quizzes with 80%+ score.", "award", "QUIZ", "QUIZ", 5));
        achievementRepository.save(new Achievement("UML Architect", "Create and validate 3 custom UML diagrams.", "layout", "UML", "UML", 3));
        achievementRepository.save(new Achievement("SOLID Hero", "Reach Level 5 and master SOLID design principles.", "shield", "LEVEL", "LEVEL", 5));

        Map<String, String> res = new HashMap<>();
        res.put("message", "Database successfully seeded with 6 Modules, Lessons, Quizzes, Challenges, Case Studies, Patterns, and Achievements!");
        return ResponseEntity.ok(res);
    }
}
