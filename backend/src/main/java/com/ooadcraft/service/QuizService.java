package com.ooadcraft.service;

import com.ooadcraft.dto.QuizSubmitRequest;
import com.ooadcraft.dto.QuizSubmitResponse;
import com.ooadcraft.model.*;
import com.ooadcraft.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final QuizAttemptRepository attemptRepository;
    private final UserRepository userRepository;
    private final XPService xpService;

    public QuizService(QuizRepository quizRepository,
                       QuestionRepository questionRepository,
                       QuizAttemptRepository attemptRepository,
                       UserRepository userRepository,
                       XPService xpService) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.attemptRepository = attemptRepository;
        this.userRepository = userRepository;
        this.xpService = xpService;
    }

    @Transactional(readOnly = true)
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Quiz not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public Quiz getQuizByModuleId(Long moduleId) {
        List<Quiz> list = quizRepository.findAllByModuleId(moduleId);
        if (list == null || list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }

    @Transactional
    public QuizSubmitResponse submitQuiz(Long quizId, String userEmail, QuizSubmitRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new IllegalArgumentException("Quiz not found"));

        List<Question> questions = questionRepository.findByQuizId(quizId);
        if (questions.isEmpty()) {
            return new QuizSubmitResponse(100.0, true, 0, 0, 0, Map.of());
        }

        Map<Long, Integer> userAnswers = request.getAnswers() != null ? request.getAnswers() : Map.of();
        int correctCount = 0;
        Map<Long, String> explanations = new HashMap<>();

        for (Question q : questions) {
            Integer selected = userAnswers.get(q.getId());
            if (selected != null && selected == q.getCorrectOptionIndex()) {
                correctCount++;
            }
            explanations.put(q.getId(), q.getExplanation());
        }

        double score = Math.round(((double) correctCount / questions.size()) * 100.0);
        boolean passed = score >= quiz.getPassPercentage();

        int xpEarned = 0;
        if (passed) {
            xpEarned = quiz.getXpReward();
            if (score >= 100.0) xpEarned += 100; // Perfect score bonus
            else if (score >= 80.0) xpEarned += 50;  // High score bonus

            xpService.awardXP(user, "QUIZ", quiz.getId(), xpEarned, "Passed Quiz: " + quiz.getTitle());
        }

        attemptRepository.save(new QuizAttempt(user, quiz, score, questions.size(), correctCount, request.getTimeTakenSeconds(), xpEarned));

        return new QuizSubmitResponse(score, passed, questions.size(), correctCount, xpEarned, explanations);
    }

    @Transactional
    public Quiz createQuiz(Quiz quiz) {
        Quiz saved = quizRepository.save(quiz);
        if (quiz.getQuestions() != null) {
            for (Question q : quiz.getQuestions()) {
                q.setQuiz(saved);
                questionRepository.save(q);
            }
        }
        return saved;
    }
}
