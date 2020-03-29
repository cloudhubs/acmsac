package com.example.polls.repository;

import com.example.polls.model.AcmInfo;
import com.example.polls.model.Presentation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AcmInfoRepository extends JpaRepository<AcmInfo, Long> {
  Optional<AcmInfo> findByPaperId(int paperId);
}
