package com.ooadcraft.config;

import com.ooadcraft.model.*;
import com.ooadcraft.model.Module;
import com.ooadcraft.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired private ModuleRepository moduleRepository;
    @Autowired private LessonRepository lessonRepository;
    @Autowired private QuizRepository quizRepository;
    @Autowired private QuestionRepository questionRepository;
    @Autowired private DesignChallengeRepository challengeRepository;
    @Autowired private CaseStudyRepository caseStudyRepository;
    @Autowired private DesignPatternRepository patternRepository;
    @Autowired private AchievementRepository achievementRepository;

    @Override
    public void run(String... args) throws Exception {
        if (moduleRepository.count() > 0) {
            return;
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
        challengeRepository.save(new DesignChallenge("Refactor Tight Coupling in Notification Engine", "Use Dependency Inversion (DIP) to decouple NotificationService from SMTPClient.", "NotificationService directly instantiates SmtpClient, making it impossible to unit test or support Push/SMS notifications.", "DIP_REFACTOR", "MEDIUM", 350));

        // 3. Seed 10 Case Studies
        caseStudyRepository.save(new CaseStudy("Automated Teller Machine (ATM)", "Architect a multi-bank ATM network with hardware security module interfaces.", "Banking", "[{\"step\":1,\"title\":\"Use Case & Requirements\"},{\"step\":2,\"title\":\"Domain Class Model\"},{\"step\":3,\"title\":\"Sequence Diagram Execution\"}]", 500));
        caseStudyRepository.save(new CaseStudy("Online Food Delivery System", "Design an UberEats-style platform connecting Customers, Restaurants, and Drivers.", "E-Commerce", "[{\"step\":1,\"title\":\"Identify Actors & Use Cases\"},{\"step\":2,\"title\":\"State Machine for Driver Matching\"},{\"step\":3,\"title\":\"Order Lifecycle Class Model\"}]", 600));
        caseStudyRepository.save(new CaseStudy("Digital Library Management System", "Model books, borrowing limits, fine calculations, and reservation queues.", "Education", "[{\"step\":1,\"title\":\"Identify Domain Entities\"},{\"step\":2,\"title\":\"Fine Calculation Strategy\"},{\"step\":3,\"title\":\"Reservation State Machine\"}]", 450));
        caseStudyRepository.save(new CaseStudy("Hotel Reservation System", "Architect room booking, inventory availability, pricing strategies, and billing.", "Hospitality", "[{\"step\":1,\"title\":\"Room Inventory Model\"},{\"step\":2,\"title\":\"Seasonal Pricing Strategy\"},{\"step\":3,\"title\":\"Booking Sequence Diagram\"}]", 500));
        caseStudyRepository.save(new CaseStudy("Railway Ticket Reservation System", "Design coach layouts, seat allocation algorithms, and train schedule engines.", "Transportation", "[{\"step\":1,\"title\":\"Train & Station Domain Model\"},{\"step\":2,\"title\":\"Quota Seat Allocation Algorithm\"},{\"step\":3,\"title\":\"Cancellation Sequence Diagram\"}]", 550));
        caseStudyRepository.save(new CaseStudy("Ride Sharing Platform (Uber/Lyft)", "Architect real-time driver dispatch, geospatial location updates, and trip billing.", "Transportation", "[{\"step\":1,\"title\":\"Driver & Rider Matching Model\"},{\"step\":2,\"title\":\"Fare Calculation Strategy\"},{\"step\":3,\"title\":\"Trip Execution State Diagram\"}]", 650));
        caseStudyRepository.save(new CaseStudy("E-Commerce Shopping Cart & Checkout", "Design cart session management, inventory locking, discount engines, and checkout.", "E-Commerce", "[{\"step\":1,\"title\":\"Cart & Inventory Domain Model\"},{\"step\":2,\"title\":\"Discount Coupon Strategy Pattern\"},{\"step\":3,\"title\":\"Checkout Pipeline Sequence Diagram\"}]", 500));
        caseStudyRepository.save(new CaseStudy("Smart Parking Lot System", "Model parking spot types (Compact, Large, EV), ticketing gates, and payment kiosks.", "IoT & Infrastructure", "[{\"step\":1,\"title\":\"Parking Floor & Spot Hierarchy\"},{\"step\":2,\"title\":\"Hourly Fee Calculation Strategy\"},{\"step\":3,\"title\":\"Entry/Exit Gate State Diagram\"}]", 450));
        caseStudyRepository.save(new CaseStudy("Movie Ticket Booking System (BookMyShow)", "Design theater screens, seat layouts, showtime scheduling, and concurrent booking locks.", "Entertainment", "[{\"step\":1,\"title\":\"Cinema & Seat Booking Domain Model\"},{\"step\":2,\"title\":\"Concurrent Seat Lock Mechanism\"},{\"step\":3,\"title\":\"Payment Confirmation Flow\"}]", 600));
        caseStudyRepository.save(new CaseStudy("Hospital Management System", "Architect doctor scheduling, patient electronic health records, prescription workflows, and billing.", "Healthcare", "[{\"step\":1,\"title\":\"Patient & Doctor Domain Class Model\"},{\"step\":2,\"title\":\"Appointment Scheduling Engine\"},{\"step\":3,\"title\":\"Prescription & Lab Integration Flow\"}]", 550));

        // 4. Seed Design Patterns
        patternRepository.save(new DesignPattern("CREATIONAL", "Factory Method", "Creating objects directly leads to tight coupling.", "Define an interface for creating an object, but let subclasses decide which class to instantiate.", "public interface Button { void render(); }\npublic class WindowsButton implements Button { public void render() { System.out.println(\"Render Windows Button\"); } }", "class Button:\n    def render(self):\n        pass", "class Button {\npublic:\n    virtual void render() = 0;\n};"));
        patternRepository.save(new DesignPattern("CREATIONAL", "Singleton Pattern", "Ensures a class has only one instance and provides a global point of access to it.", "Private constructor combined with a static instance accessor.", "public class DatabaseConnection {\n  private static DatabaseConnection instance;\n  private DatabaseConnection() {}\n  public static synchronized DatabaseConnection getInstance() {\n    if (instance == null) instance = new DatabaseConnection();\n    return instance;\n  }\n}", "class DatabaseConnection:\n    _instance = None\n    def __new__(cls):\n        if not cls._instance:\n            cls._instance = super().__new__(cls)\n        return cls._instance", "class Singleton {\nprivate:\n    static Singleton* instance;\n    Singleton() {}\npublic:\n    static Singleton* getInstance() {\n        if (!instance) instance = new Singleton();\n        return instance;\n    }\n};"));
        patternRepository.save(new DesignPattern("BEHAVIORAL", "Observer Pattern", "Objects need to notify dependent listeners when state changes without tight coupling.", "Define a one-to-many dependency between objects so that when one changes state, all dependents are notified automatically.", "public interface Observer { void update(String msg); }", "class Observer:\n    def update(self, msg): pass", "class Observer { public: virtual void update(string msg) = 0; };"));
        patternRepository.save(new DesignPattern("BEHAVIORAL", "Strategy Pattern", "Select algorithms dynamically at runtime based on context.", "Define a family of algorithms, encapsulate each one, and make them interchangeable.", "public interface PaymentStrategy { void pay(int amount); }", "class PaymentStrategy:\n    def pay(self, amount): pass", "class PaymentStrategy { public: virtual void pay(int amount) = 0; };"));
        patternRepository.save(new DesignPattern("STRUCTURAL", "Adapter Pattern", "Convert the interface of a class into another interface clients expect.", "Wrap an existing incompatible class with a new adapter class matching the target interface.", "public class LegacyPrinterAdapter implements Printer { private LegacyPrinter legacy; public void print() { legacy.oldPrint(); } }", "class LegacyAdapter(Printer):\n    def __init__(self, legacy):\n        self.legacy = legacy\n    def print(self):\n        self.legacy.old_print()", "class Adapter : public Target {\nprivate:\n    Adaptee* adaptee;\npublic:\n    void request() override { adaptee->specificRequest(); }\n};"));
        patternRepository.save(new DesignPattern("STRUCTURAL", "Decorator Pattern", "Attach additional responsibilities to an object dynamically.", "Decorators provide a flexible alternative to subclassing for extending functionality.", "public abstract class CoffeeDecorator implements Coffee { protected Coffee coffee; }", "class CoffeeDecorator(Coffee):\n    def __init__(self, coffee):\n        self.coffee = coffee", "class Decorator : public Component {\nprotected:\n    Component* component;\n};"));

        // 5. Seed Achievements
        achievementRepository.save(new Achievement("First Step", "Complete your first OOAD lesson.", "zap", "GENERAL", "LESSON", 1));
        achievementRepository.save(new Achievement("Quiz Master", "Pass 5 quizzes with 80%+ score.", "award", "QUIZ", "QUIZ", 5));
        achievementRepository.save(new Achievement("UML Architect", "Create and validate 3 custom UML diagrams.", "layout", "UML", "UML", 3));
        achievementRepository.save(new Achievement("SOLID Hero", "Reach Level 5 and master SOLID design principles.", "shield", "LEVEL", "LEVEL", 5));
    }
}
