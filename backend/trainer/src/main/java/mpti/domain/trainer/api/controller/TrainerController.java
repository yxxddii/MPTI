package mpti.domain.trainer.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.Value;
import mpti.domain.trainer.api.request.SignupRequest;
import mpti.domain.trainer.dao.TrainerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;

@RestController
@RequestMapping("/api/trainer")
@RequiredArgsConstructor
public class TrainerController {

    private final TrainerService trainerService;

    @GetMapping("/duplication-check")
    public ResponseEntity checkDuplicateId(@RequestBody(required = true) String email) {
        trainerService.checkDuplicateEmail(email);
        return ResponseEntity.ok(email);
    }


}
