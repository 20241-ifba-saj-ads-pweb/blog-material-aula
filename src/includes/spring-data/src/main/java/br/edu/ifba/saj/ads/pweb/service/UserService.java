package br.edu.ifba.saj.ads.pweb.service;

import br.edu.ifba.saj.ads.pweb.model.User;
import br.edu.ifba.saj.ads.pweb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User addUser(User user) {
        User savedUser = userRepository.save(user);
        return savedUser;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User updateUser(User user) {
        User userFromDb = userRepository.findById(user.getId()).orElse(null);        
        if (userFromDb != null) {
            userFromDb.setName(user.getName());
            userFromDb.setEmail(user.getEmail());
            return userRepository.save(userFromDb);    
        }
        return null;
    }

    public void deleteUser(int id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        }
    }
}

