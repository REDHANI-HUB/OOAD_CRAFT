package com.ooadcraft.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ooadcraft.dto.*;
import com.ooadcraft.model.UMLDiagram;
import com.ooadcraft.model.User;
import com.ooadcraft.repository.UMLDiagramRepository;
import com.ooadcraft.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UMLService {

    private final UMLDiagramRepository diagramRepository;
    private final UserRepository userRepository;
    private final XPService xpService;
    private final ObjectMapper objectMapper;

    public UMLService(UMLDiagramRepository diagramRepository, UserRepository userRepository, XPService xpService) {
        this.diagramRepository = diagramRepository;
        this.userRepository = userRepository;
        this.xpService = xpService;
        this.objectMapper = new ObjectMapper();
    }

    @Transactional(readOnly = true)
    public List<UMLDiagram> getUserDiagrams(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return diagramRepository.findByUserId(user.getId());
    }

    @Transactional
    public UMLDiagram saveDiagram(String userEmail, String title, String diagramType, String nodesJson, String edgesJson) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        UMLDiagram diagram = new UMLDiagram(user, title, diagramType, nodesJson, edgesJson, true, 100);
        UMLDiagram saved = diagramRepository.save(diagram);

        xpService.awardXP(user, "UML", saved.getId(), 200, "Created UML Diagram: " + title);
        return saved;
    }

    public UMLValidationResponse validateDiagram(String nodesJson, String edgesJson) {
        List<String> warnings = new ArrayList<>();
        int score = 100;

        try {
            JsonNode nodes = objectMapper.readTree(nodesJson != null ? nodesJson : "[]");
            JsonNode edges = objectMapper.readTree(edgesJson != null ? edgesJson : "[]");

            if (nodes.size() == 0) {
                return new UMLValidationResponse(0, false, List.of("Diagram is empty. Add classes or actors to begin."));
            }

            if (nodes.size() > 1 && edges.size() == 0) {
                warnings.add("Multiple classes detected without relationships.");
                score -= 20;
            }

            for (JsonNode node : nodes) {
                String label = node.has("data") && node.get("data").has("label") ? node.get("data").get("label").asText() : "";
                if (label.toLowerCase().contains("manager") || label.toLowerCase().contains("controller")) {
                    if (node.has("data") && node.get("data").has("methods") && node.get("data").get("methods").size() > 5) {
                        warnings.add("Possible SRP violation detected in '" + label + "'. Class has too many responsibilities.");
                        score -= 15;
                    }
                }
            }
        } catch (Exception e) {
            warnings.add("Structural format notice: Ensure all class relationships are connected properly.");
        }

        boolean isValid = score >= 70;
        return new UMLValidationResponse(Math.max(0, score), isValid, warnings);
    }

    public ReqToUMLResponse generateFromRequirement(String requirementText) {
        List<String> actors = List.of("Customer", "System Administrator", "Payment Gateway");
        List<String> useCases = List.of("Browse Menu/Items", "Place Order", "Process Payment", "Track Order Status");
        List<String> candidateClasses = List.of("User", "Order", "OrderItem", "Payment", "NotificationService");
        List<String> relationships = List.of("User 1 -- * Order", "Order 1 -- * OrderItem", "Order 1 -- 1 Payment");

        String classDiagramJson = "{\"nodes\":[{\"id\":\"1\",\"data\":{\"label\":\"User\",\"attributes\":[\"id: Long\",\"name: String\"],\"methods\":[\"placeOrder()\"]}},{\"id\":\"2\",\"data\":{\"label\":\"Order\",\"attributes\":[\"id: Long\",\"status: String\"],\"methods\":[\"calculateTotal()\"]}}],\"edges\":[{\"id\":\"e1-2\",\"source\":\"1\",\"target\":\"2\",\"label\":\"1..*\"}]}";

        return new ReqToUMLResponse(actors, useCases, candidateClasses, relationships, classDiagramJson);
    }
}
