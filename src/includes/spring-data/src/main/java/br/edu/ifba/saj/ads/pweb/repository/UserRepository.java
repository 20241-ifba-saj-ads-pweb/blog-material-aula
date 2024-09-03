package br.edu.ifba.saj.ads.pweb.repository;

import br.edu.ifba.saj.ads.pweb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}