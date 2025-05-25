package com.ciro.phonestore.FirmwareManagement.Repository;



import com.ciro.phonestore.FirmwareManagement.Entity.Firmware;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FirmwareRepository extends JpaRepository<Firmware, Long> {

    List<Firmware> findByBrand(String brand);

    List<Firmware> findByBrandAndModel(String brand, String model);

    @Query("SELECT DISTINCT f.brand FROM Firmware f")
    List<String> findAllBrands();

    @Query("SELECT DISTINCT f.model FROM Firmware f WHERE f.brand = ?1")
    List<String> findModelsByBrand(String brand);
}
