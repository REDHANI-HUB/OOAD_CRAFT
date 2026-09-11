package com.ooadcraft.controller;

import com.ooadcraft.dto.ReqToUMLResponse;
import com.ooadcraft.dto.UMLValidationResponse;
import com.ooadcraft.model.UMLDiagram;
import com.ooadcraft.service.UMLService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/uml")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UMLController {

    @Autowired
    private UMLService umlService;

    @GetMapping
    public ResponseEntity<List<UMLDiagram>> getUserDiagrams() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(umlService.getUserDiagrams(auth.getName()));
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveDiagram(@RequestBody Map<String, String> request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(401).build();
        }
        String title = request.getOrDefault("title", "Untitled Diagram");
        String diagramType = request.getOrDefault("diagramType", "CLASS");
        String nodesJson = request.get("nodesJson");
        String edgesJson = request.get("edgesJson");

        UMLDiagram saved = umlService.saveDiagram(auth.getName(), title, diagramType, nodesJson, edgesJson);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/validate")
    public ResponseEntity<UMLValidationResponse> validateDiagram(@RequestBody Map<String, String> request) {
        String nodesJson = request.get("nodesJson");
        String edgesJson = request.get("edgesJson");
        UMLValidationResponse response = umlService.validateDiagram(nodesJson, edgesJson);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/generate-from-req")
    public ResponseEntity<ReqToUMLResponse> generateFromReq(@RequestBody Map<String, String> request) {
        String requirementText = request.getOrDefault("requirementText", "");
        ReqToUMLResponse response = umlService.generateFromRequirement(requirementText);
        return ResponseEntity.ok(response);
    }
}
