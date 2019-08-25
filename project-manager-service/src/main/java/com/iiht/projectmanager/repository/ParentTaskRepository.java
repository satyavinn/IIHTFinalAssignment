package com.iiht.projectmanager.repository;

import com.iiht.projectmanager.entity.ParentTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentTaskRepository extends JpaRepository<ParentTask, Long> {

}
