package org.lamisplus.modules.lims.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.lims.domain.dto.LABSampleDTO;
import org.lamisplus.modules.lims.service.LimsSampleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/lims")
public class LimsSampleController {
    private final LimsSampleService limsSampleService;

    @PostMapping("/manifest-samples")
    public LABSampleDTO SaveManifest(@RequestBody LABSampleDTO manifestDTO){
        return limsSampleService.Save(manifestDTO);
    }

    @PutMapping("/manifest-samples")
    public LABSampleDTO UpdateManifest(@RequestBody LABSampleDTO manifestDTO){
        return limsSampleService.Update(manifestDTO);
    }

    @DeleteMapping("/manifest-samples/{id}")
    public String DeleteManifest(@PathVariable int id){
        return limsSampleService.Delete(id);
    }

    @GetMapping("/manifest-samples/{id}")
    public LABSampleDTO GetAllLabOrders(@PathVariable int id){
        return limsSampleService.findById(id);
    }

    @GetMapping("/manifest-samples/manifests/{id}")
    public List<LABSampleDTO> GetSamplesByManifestId(@PathVariable int id) {
        return limsSampleService.findbyManifestRecordId(id);
    }

    @GetMapping("/collected-samples/")
    public List<LABSampleDTO> GetAllCollectedSamples() {
        return limsSampleService.getAllPendingSamples();
    }
}
